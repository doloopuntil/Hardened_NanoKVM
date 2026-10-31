---
status: current
applies-to: system 0.4.0 / app 2.1.0
last-checked: 2026-10-31
---

# Testing

## Rust server

```sh
cargo test --manifest-path server-rust/Cargo.toml
cargo clippy --manifest-path server-rust/Cargo.toml --all-targets -- -D warnings
cargo fmt --manifest-path server-rust/Cargo.toml --check
```

The tests run on the host; they do not need the device or the RISC-V toolchain.
Tests that touch real devices or commands skip themselves when the tool is
missing (the remote-download test needs `/usr/bin/curl`).

On macOS, `api::storage::tests::accepts_image_inside_storage_root` fails: the
storage code returns the canonical path (`/private/var/...`) while the test
expects the temporary directory's `/var/...` path. It passes on Linux.

Clippy is clean; `-D warnings` makes any new warning an error locally (CI does not run clippy).

## Web UI

```sh
corepack pnpm --dir web test
corepack pnpm --dir web lint
corepack pnpm --dir web build
```

`translations.test.ts` guards every language file against the English one and
the copy rules. See [Web UI](web.md).

To check a page without a device, build the UI and serve `web/dist` from a small
local server that answers the `/api/...` calls the page makes; MSW's mocked mode
(`pnpm mocked`) is an alternative in a normal browser.

### Layout check across languages (to set up)

Playwright is not a dependency of the repository yet. Install it
(`corepack pnpm --dir web add -D playwright`, then `npx playwright install chromium`) and add a
script that serves `web/dist` with mocked `/api/...` answers, opens Settings in the touch layout
(375px wide, touch and mobile on) for each of the 26 languages and each of the 14 pages, and flags:

- a label that overlaps its control, or any element that runs past the screen edge;
- a word of the five main navigation labels that breaks in the middle;
- a label that wraps to a second line only as information: the rules allow it beside a
  switch and a badge may drop under its text, so it is not a failure, and the count will not
  go to zero.

English must report no clash and no broken navigation label. A first run, done by hand with
Playwright on 2026-10-30, found 0 clashes in 2,548 rows and 5 broken navigation labels, which are
fixed; it also counted 61 wrapped labels, which are fine and stay at that number. The mock has to answer the firewall and certificate endpoints fully, or those pages
crash and are not measured. Rerun it after a change to a label or to the text of a control.

## Shell scripts

Init scripts run under BusyBox `ash`. At least check the syntax:

```sh
sh -n kvmapp/system/init.d/<script>
```

For logic that builds firewall rules or parses config files, source the function
with stubbed commands (`iptables() { echo "$*"; }`) and compare the output for a
few inputs.

Three scripts already do this for the init scripts and need no device; run them
with `bash` from the repository root:

```sh
bash scripts/test-hardware-macs.sh
bash scripts/test-hid-only-mode.sh
bash scripts/test-s30eth-static-dns.sh
```

## The image workflow

For a change to `.github/workflows/system-image.yml` or a script it calls:

1. Parse the YAML: `ruby -ryaml -e 'YAML.load_file(".github/workflows/system-image.yml")'`.
2. Extract each step's `run:` block and check it with `bash -n`.
3. If anything other than comments changed, dispatch a real run
   ([CI image build](ci-image-build.md)) and wait for it before calling the
   change done. Much of the pipeline depends on environment variables passed from
   workflow steps to scripts, so a change that reads correctly can still fail.

## On a device

After deploying, run the smoke checks in
[Build and deploy the server](cross-build.md#smoke-checks). Changes to native
code, USB gadget scripts, the firewall or system updates need a device test; keep
a recovery card at hand.
