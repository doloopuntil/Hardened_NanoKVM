# Linux 5.10.265 Phase 3 Batch 1: Restricted dmesg

Status date: 2026-08-24.

Status: build, exact reproducibility and recovery-device acceptance pass. This
remains a recovery-SD lab candidate, not a raw update or release artifact.

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
- `build/latestbuildroot/kernel-5.10.265-phase3-repro-b` (completed and verified;
  build tree removed on 2026-08-25 after the independent report was retained).

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

## Device Acceptance

The exact run-A image was written to recovery media and booted on the test
NanoKVM at router-assigned address `10.0.87.47`.

Initial gate:

- Linux `5.10.265-tag-`, system `0.3.0-raw.11`, app `2.0.41`;
- HTTP health and root SSH: pass;
- `kernel.dmesg_restrict=1`;
- root `dmesg`: pass;
- explicitly dropped `nobody` context: permission denied;
- packaged modules: `57`; critical media modules loaded;
- root, boot and data mounts read-write; Ethernet present;
- kernel alert lines: `0`.

The device then completed ten software reboot cycles. Every cycle observed the
device offline, returned with a distinct kernel `boot_id`, passed HTTP/SSH and
re-ran the complete dmesg/module/mount/log verifier. The final cycle still
reported `DMESG_RESTRICT=1`, unprivileged dmesg denied, `MODULES=57`, and
`DMESG_ALERTS=0`.

Evidence:

- initial report:
  `build/latestbuildroot/device-tests/phase3-dmesg-10.0.87.47-initial-v2/report.txt`,
  SHA-256 `93dc93fe38423442185b59a60687aa3993cedb5351165ff9be845a316862b516`;
- reboot report:
  `build/latestbuildroot/device-tests/phase3-dmesg-10.0.87.47-reboots-10/report.txt`,
  SHA-256 `446bc63099b931ef66b20b595d72e81f56c283449fe474f2df29666cbe1b3be4`;
- final cycle report SHA-256:
  `628b688835d556b18ee85de65f5d25a4d3b56e51528f5a2fee2898702cd0ac64`;
- accepted ED25519 host-key fingerprint:
  `SHA256:RxHM/IaSx9m10zBMkVIAjqnl4EtHdPbzui/qhCT5HCo`.

The user waived repeating the physical HDMI/HID/button matrix on the recovery
unit. Exact recovery boot, the dmesg privilege boundary and reboot/log gates
were not waived and all passed.

Batch 1 is accepted. Batch 2 may begin with a read-only user-namespace consumer
audit; any resulting config change remains a separate recovery candidate.
