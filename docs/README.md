# Hardened NanoKVM Documentation

The current published release is app `2.0.42 RC12` with Preview system
`0.3.0-raw.12`, Buildroot `2026.05.1`, and Linux `5.10.265-tag-`.
The stable system channel remains `0.2.23-raw.1`.

RC12 release source is maintained on
[`security/kernel-5.10.265`](https://github.com/woffko/Hardened_NanoKVM/tree/security/kernel-5.10.265).
The default branch carries the public documentation index but is not the RC12
source baseline.

## Install And Recovery

- [RC12 combined release notes](releases/rc12-2.0.42-raw.12.md)
- [Manual app 2.0.42 key-transition notes](releases/2.0.42-key-transition.md)
- [SD-card flashing guide](sd-card-flashing.md)
- [System-update channels and bundle format](system-update-github-releases.md)
- [Visible release and channel archive](release-archive.md)

Existing installations must install the manual app `2.0.42` bridge through
authenticated Offline Update before enabling Preview and installing raw.12.
A freshly written RC12 SD image already contains app `2.0.42` and the
production trust set.

## Security And Acceptance

- [Production-key transition engineering record](key-transition-2026q3.md)
- [RC12 physical gates and evidence hashes](rc12-final-physical-gates.md)
- [Native C/C++ audit](native-code-audit.md)
- [Current security-risk inventory](security-risk-inventory.md)

The RC12 full image passed initial partition expansion, authenticated
browser/runtime checks, two post-expansion reboots, a pristine raw.10 recovery
boot, and final return to the accepted RC12 card. Retained vendor components
with `NOASSERTION` licensing metadata remain an explicitly documented
limitation rather than a resolved claim.

Detailed Buildroot and SG2002 kernel-port records live with the release source
on the
[`security/kernel-5.10.265` documentation tree](https://github.com/woffko/Hardened_NanoKVM/tree/security/kernel-5.10.265/docs).

## Development

- [Developer handoff](handoff.md)
- [Rust backend status and build path](rust-backend.md)
- [Build and deployment notes](build-notes.md)
- [System-update implementation plan](system-update-plan.md)
- [Vendor SDK build path](vendor-sdk-build.md)
