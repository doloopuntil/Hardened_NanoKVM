# Linux 5.10.265 Phase 3 Batch 1: Restricted dmesg

Status date: 2026-08-24.

Status: build and exact reproducibility pass; recovery-device boot is pending.
This is a recovery-SD candidate, not a raw update.

## Scope

This batch changes exactly one final kernel option:

```diff
-# CONFIG_SECURITY_DMESG_RESTRICT is not set
+CONFIG_SECURITY_DMESG_RESTRICT=y
```

`CONFIG_SECURITY`, LSM selection, user namespaces, hardened usercopy, slab
hardening, init-on-alloc/free, strict RWX, `/dev/mem`, and debugfs are unchanged.
The option is independent of `CONFIG_SECURITY` in Linux 5.10 and only changes
the default value of `kernel.dmesg_restrict`.

The consumer audit found that the Rust backend and device diagnostics read
`dmesg` as root, so their access must remain available. Debugfs cannot yet be
disabled: `libkvm` and `libkvm_mmf` read the CVITEK ION carveout summary from
`/sys/kernel/debug/ion/cvi_carveout_heap_dump/summary`.

Tracked fragment:

`support/sg2002/kernel/5.10.265/configs/phase3-01-dmesg-restrict.config`

Fragment SHA-256:
`7fd8708f6dd8a27e3b6ca913eb1f7f5dc885d0568a5daade8ea551d006402a86`.

## Source Durability

The accepted source no longer exists only in an ignored build directory.
`scripts/rehydrate-vendor-kernel-5.10.265-merge.sh` reconstructs the pinned
vendor tree `a5854bd362b88c59d34bd4db9ff9ea876c6aebd4`, verifies the exact
31-conflict inventory, applies nine tracked resolution patches, and requires
final source tree `d53dfbde34f1de6b4565e686009b688c04b8913d`.

An independent fresh rehydration produced source commit
`83c188ecdc1556b14573705e9c0a32cd5853d865` with that exact tree. The commit
ID may differ across rehydrations; the required source tree is invariant.

## Build And Reproducibility Evidence

Both complete runs were built from outer project commit
`ebdaa1cae40b75aa9cc4f0987dedb4e0d700abf0`:

- `build/latestbuildroot/kernel-5.10.265-phase3-repro-a`;
- `build/latestbuildroot/kernel-5.10.265-phase3-repro-b`.

Exact A/B matches:

- kernel config, Image, vmlinux, symbols, three DTBs and 24 in-tree modules;
- 30 external and three source-built media modules;
- 57-module runtime staging and its metadata;
- Buildroot ext4 and tar rootfs;
- candidate FIT;
- complete SD image, compressed image and extracted payloads.

Additional checks pass: config delta is exactly one option, clock-init audit is
`1/1`, depmod errors are zero, module counts are `24/30/3/57`, and both xz
streams validate.

Reproducibility report:

`build/latestbuildroot/kernel-5.10.265-phase3-repro-report/summary.md`

## Accepted Local Artifacts

| Artifact | SHA-256 |
| --- | --- |
| final kernel `.config` | `8a6670b40bf9a5239a3549995d538f1d22b173c9b46c719ae0025801529db8d6` |
| kernel `Image` | `0934bda2ba4131db55e118c63975cace276f1a4dd7eb52e800d25b05f875e85f` |
| `vmlinux` | `80eea6f46e5d8740292ee47babcbed891289934481caaeaba96f7328203f2e74` |
| board DTB | `29b5ef4166f4c9883b30d766d97e3ec5d6c409a6b72891cd9ed1fbe4f0c47f73` |
| Buildroot ext4 | `5c49037e2b2899da08b2b36f585906f868d8ecb7ef170ba6ad3018f8966c6ac9` |
| Buildroot tar | `30b94b380a77f8df6c83c09909325771a96cd5a133cedc2d70c14a1e8d7cd8e0` |
| candidate FIT | `b13511e3e89821ba0562ef79543b49195055cf7204ada5febe0c2f9efa2f9b03` |
| full SD image | `74ebf15a1293023ed0db13c182b02ba8a432676b81c69a9e8863e8a89abf0af7` |
| compressed SD image | `cfd6ec4c1a7e70b28b5d91ea1fd3be4214b5bb9e807e36e8ebfbe867c69a6303` |

Image to write to re-identified sacrificial recovery media:

`build/latestbuildroot/kernel-5.10.265-phase3-repro-a/recovery/assembly/images/hardened-sg2002-port.img.xz`

Compressed size: 33,789,284 bytes. Uncompressed size: 1,627,390,464 bytes.

## Required Device Gate

1. Write the documented xz image to the recovery SD card and safely eject it.
2. Boot only the recovery test NanoKVM; do not create or install a raw update.
3. Record its router-assigned address.
4. Run `scripts/verify-kernel-dmesg-restriction-device.sh` over authorized root
   SSH and also verify HTTP/API reachability.
5. Complete ten software reboot cycles. Re-run the verifier after the final
   boot and confirm no new kernel, MMC, USB or filesystem alert.
6. Required result:
   - `kernel.dmesg_restrict=1`;
   - root `dmesg` succeeds;
   - an explicitly dropped `nobody` context receives a permission error;
   - 57 modules are packaged and critical media modules are loaded;
   - root, boot and data mounts, Ethernet, SSH and HTTP/API work;
   - no kernel alert line is present.

The user previously waived repeating the physical HDMI/HID/button matrix on
the recovery unit. Exact recovery boot and the dmesg privilege boundary are
not waived.

No subsequent Phase 3 hardening batch starts until this candidate passes or is
rolled back on recovery media.
