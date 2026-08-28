# RC12 Final Physical Gates

Status date: 2026-08-28.

These gates cover the two outcomes that cannot be inferred from builds or an
in-place raw update:

1. the exact published app `2.0.40` / raw.10 bridge transition;
2. boot, expansion and recovery behavior of the superseding RC12 full SD image.

Use a recoverable NanoKVM and verified removable media. Do not overwrite the
only recovery copy. The previously waived HDMI/Wi-Fi/HID physical matrix is not
part of these gates and must not be claimed as newly tested.

## Gate A: Exact Raw.10 Bridge Source State

Status: **PASS** on recoverable test hardware (2026-08-28).

The published RC11 image booted as the exact app `2.0.40` / raw.10 source
state. Authenticated Offline Update installed the selected bridge archive and
preserved raw.10, kernel `5.10.4-tag-`, the Ethernet MAC, SSH host identity,
account and backup app. Immediate checks proved the exact legacy and production
public-key fingerprints, the three-ID policy, historical and production
signature verification, both runtime processes and zero kernel alerts. A real
reboot produced a distinct boot ID; the strict SSH postflight and authenticated
browser login then passed again with app `2.0.42` and the Rust backend.

The ignored local evidence files have these SHA-256 values:

- SSH preflight: `a9d644be35b6983352570d0fc40a6128315d0e0c4feb516caa3615f7c38f9176`;
- bridge upload: `9162b58fac237a55abfbfe7110ef2ae17b1af963fb90f3c9f569a629f93e2e5a`;
- immediate postflight: `718a113bd8f20c580ebe82359106c0384dcbcca888b97881f4f984d2e1f14d15`;
- signature matrix: `f6482d1f6684d878cf0a4b22d2c5ad6942864b9b64d815c2db00d83a2eefb320`;
- reboot request: `b1342c3627686ebf74280e3df6e93f6adc6df1cab539146bfc6d11e849d00eef`;
- strict post-reboot state: `f820e2b8a897df8a373f7dd98e1857799d6661550a19c838cf9e312ecb595b28`;
- authenticated post-reboot browser check:
  `4a0359de7f98d8d545ac5377fa318b74f5563df2fdef241e11ca3a5f688dbd3b`.

The procedure below is retained for reproducibility.

Write this downloaded published RC11 image with a trusted image writer:

`build/key-transition-2.0.42-bootstrap/raw10-gate/Hardened_NanoKVM_2.0.40_RC11_System_0.3.0-raw.10_Buildroot-2026.05.1.img.xz`

Expected compressed SHA-256:

`96e44ee8eb482ba2609348164b8c80ac1b94a1c1152db328331fba799d5e0632`

Before writing, run `sha256sum` and `xz -t`. Safely eject the card, boot the
test NanoKVM, and record its DHCP address and MAC. The read-only preflight must
prove:

- app `2.0.40`;
- system `0.3.0-raw.10`;
- kernel `5.10.4-tag-`;
- legacy update key only and no update-key policy;
- working authenticated web and SSH access;
- zero kernel alerts.

Install this exact bridge through authenticated Offline Update:

`build/key-transition-2.0.42-bootstrap/app-a/out/hardened-nanokvm-kvmapp-2.0.42.tar.gz`

Expected SHA-256:

`aa0cd78c1b2e9951f216826c44b4b7ff2fb211fc1980540366f8f5b1f7e0dd20`

Immediate postflight must prove app `2.0.42`, backup app `2.0.40`, unchanged
raw.10/kernel/SSH identity, exact legacy and production public-key
fingerprints, the three-ID policy, both runtime processes and zero kernel
alerts. Repeat the production/legacy signature matrix, reboot once, and repeat
the exact and browser-account checks.

## Gate B: Superseding RC12 Full Image

Write selected pipeline A:

`build/latestbuildroot/kernel-5.10.265-rc12-bridge-a/recovery/assembly/images/hardened-sg2002-port.img.xz`

Expected compressed size: `33789320` bytes.

Expected compressed SHA-256:

`a6069020dd92c024793cbb84500887a766f07263f8a6241b9462e6e0ca95dae0`

The uncompressed selected image SHA-256 is:

`2b4cf8c4f9f4507a212441957a24dc33e01cf8b3283c1488a3f564f882af2ee1`

Safely eject, boot, and record DHCP address/MAC. Wait for first-boot expansion.
The initial verifier must prove app `2.0.42`, raw.12, kernel `5.10.265-tag-`,
rootfs commit `9567b5f`, selected FIT/config/modules/provenance/package hashes,
dual trust, expanded p2/p3, writable `/`, `/boot`, `/data`, both runtime
processes and zero kernel alerts. Run the browser/runtime software gates and
two post-expansion reboots, recording distinct boot IDs and a final exact
report.

## Gate C: Recovery Round Trip

After Gate B, boot the verified raw.10 recovery card again. With two cards this
is a card swap; with one card it requires rewriting the raw.10 image. Prove the
device returns to the exact app `2.0.40` / raw.10 state. Then return to the RC12
candidate card (or rewrite selected A), boot it, and run one final exact
RC12/browser check. This is the physical recovery/rollback evidence for the
new full image.

## Gate D: Off-Host Encrypted Backup

Copy one encrypted PKCS#8 backup to storage that is not on this Windows/WSL
host. Do not copy the unencrypted production key. Re-hash the off-host copy and
require one of these already restore-verified ciphertext SHA-256 values:

- `889f5ca50f56b75231cf12821c62bcbcd5a5b39a325d60a7ff2c6b8e1c53c561`;
- `eaeba2ae41bdeb036670015c342fe0455e86fbcdb2f83ba8779f2656b6f22135`.

## Required Report Back

Return only non-secret evidence:

```text
RAW10_BOOT_IP=
RAW10_BOOT_MAC=
RAW10_BRIDGE=PASS|FAIL
RC12_BOOT_IP=
RC12_BOOT_MAC=
RC12_INITIAL=PASS|FAIL
RC12_REBOOT_1=PASS|FAIL
RC12_REBOOT_2=PASS|FAIL
RECOVERY_RAW10=PASS|FAIL
RC12_FINAL_RETURN=PASS|FAIL
OFFHOST_BACKUP_SHA256=
```

Never include credentials, passphrases, private-key material or the off-host
storage location in the report.
