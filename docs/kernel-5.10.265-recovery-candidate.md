# SG2002 Linux 5.10.265 Recovery Candidate

Status date: 2026-08-23.

This is an unpublished recovery-SD candidate. It is not a raw update and must
not be installed first through the web updater.

## Source, Regression And Fix

- signed upstream stable tag: `v5.10.265`;
- signing fingerprint:
  `647F 2865 4894 E3BD 4571 99BE 38DB BDC8 6092 693E`;
- signed stable parent:
  `2a3da1f4966798b0b48ce302944ad356b2c98b5d`;
- exact vendor tree reconstructed on official `v5.10.4` before the merge;
- provisional merge commit: `8f420f24ebaec78462732c409ffb70ac1bc77c24`;
- historical fixed candidate source commit:
  `479872f533fbcec3220fa0924b360e6d33e742c7`;
- fixed source tree:
  `d53dfbde34f1de6b4565e686009b688c04b8913d`;
- kernel release contract: `5.10.265-tag-`.

The canonical durable identity is the source tree, not the historical local
commit ID. The tracked rehydration recipe and nine-patch series independently
recreate tree `d53dfbde34f1de6b4565e686009b688c04b8913d`; regenerated commit IDs may
differ because the original nested build repository was not publication state.

The first merged candidate built successfully but stopped before console and
initramfs. Hardware boundary testing established that the vendor merge on
`v5.10.5` booted while `v5.10.20` did not. Stable commit
`c47d249af1bd17a28f8f871f9be51918e5ad9741` (`riscv: Fix kernel time_init()`,
first released in `v5.10.11`) added `of_clk_init(NULL)`, but vendor commit
`b50c7f99cfe68e754cc5ad403848fbfe8d0eb2ee` had already added the same call.
The clean merge therefore contained two clock-provider initializations without
a textual conflict. On CV181x this re-registered the same early clock provider
before console initialization and caused the silent boot stop.

The fixed `arch/riscv/kernel/time.c` is now identical to official `v5.10.265`
for this logic and contains exactly one include and one call. The outer build
guard in commit `5d0f7bfba61225eca8e2c37788b3ac99058c5900` rejects any future candidate
unless `riscv-time-init-audit.txt` reports:

```text
of_clk_include_count=1
of_clk_init_count=1
```

The remaining conflict resolution preserves CVITEK RISC-V, vector 0.7,
compat, DWC2, configfs HID, Ethernet, I2C, framebuffer and module requirements
while retaining stable fixes in overlapping paths. Follow-up build fixes cover
native/compat vDSO linkage, the post-5.10.4 `close_fd()` API and type-safe
external-module `MIN`/`MAX` contracts without disabling `-Werror`.

## Verified Build Gates

- clean kernel Image/vmlinux build: pass;
- RISC-V early-clock guard: include `1`, call `1`;
- CVITEK DTBs: `3/3`;
- in-tree modules: `24/24`;
- external vendor modules: `30/30`;
- source-built media modules: `3/3`;
- packaged runtime modules: `57/57`;
- module vermagic failures: `0`;
- depmod unknown-symbol/version/ELF failures: `0`;
- complete raw.11 Buildroot rootfs validator: pass;
- rootfs modules match reviewed staging: `57/57`;
- FIT Image/ramdisk/DTB extraction checks: pass;
- full SD rootfs, `boot.sd`, and `fip.bin` extraction checks: pass;
- two independent clean pipelines: exact for kernel, modules, runtime,
  ext4/tar rootfs, FIT, full SD image and compressed image;
- runtime metadata, modes, ownership and symlink targets: exact between A/B;
- both compressed images expand byte-for-byte to their corresponding `.img`.

Reproducibility evidence:

`build/latestbuildroot/kernel-5.10.265-fixed-repro-report/summary.md`

Both complete runs record outer project commit
`5d0f7bfba61225eca8e2c37788b3ac99058c5900`, kernel source commit
`479872f533fbcec3220fa0924b360e6d33e742c7`, and source tree
`d53dfbde34f1de6b4565e686009b688c04b8913d`.

## Final Reproducible Artifacts

The accepted local side is fixed run A:

| Artifact | SHA-256 |
| --- | --- |
| kernel `Image` | `cd30704939f4b1391419715b5d7664b78ebb48f4798c9e440dd7423f8bf287e7` |
| `vmlinux` | `827bf638f9c3f0c0a7b8f300cdcd4634d06e566d26476f1c9fa26af404cf60d5` |
| board DTB | `29b5ef4166f4c9883b30d766d97e3ec5d6c409a6b72891cd9ed1fbe4f0c47f73` |
| Buildroot ext4 | `5b234d3e2943f3b3da69a8e3c2535008481b949cb6d297f76b09d62ac4f8ebcf` |
| Buildroot tar | `cbb6922fd7b35c52ea52c91113e1505775d16a4a2dc194f6bf2f8c2c1fb4a115` |
| candidate `boot.sd` FIT | `ef228a2bfa8141cee0ef966e2115580bebacc1e006a25d0ea8a20fb0ac3dc5bc` |
| full SD image | `e26cc9f8a41cb51ce9a29512205a08d972bcfce6f784046a9048c68e1d4740b4` |
| compressed SD image | `223d1231a4eca31000098cd6601473cbe300c8c605122b6ddd755941168df761` |

Image to write if an exact-container repeat is wanted:

`build/latestbuildroot/kernel-5.10.265-fixed-repro-a/recovery/assembly/images/hardened-sg2002-port.img.xz`

The image is 1,627,390,464 bytes uncompressed and 33,776,068 bytes compressed.
The target data partition is expanded by the existing first-boot flow.

## Device Acceptance

The fixed kernel boot gate passed on the secondary NanoKVM at `10.0.87.48`.
The hardware-tested recovery image is:

`build/latestbuildroot/kernel-5.10.265-time-init-fix/recovery/assembly/images/hardened-sg2002-port.img.xz`

with SHA-256
`8d9b9e4e5e38c3309c8a8b0f3597747f53431dcabb314ca5fae7c0b4e425ccb5`.

Recorded device evidence:

- `uname -r`: `5.10.265-tag-`;
- kernel build: `#1 PREEMPT 2026-08-23T19:42:16+03:00`;
- system `0.3.0-raw.11`, app `2.0.41`, Buildroot `2026.05.1`;
- all 57 packaged modules present and 24 runtime modules loaded, including the
  required SG2002 media stack;
- root ext4, boot vfat and data exfat mounted read-write;
- Ethernet, DHCP address, SSH and HTTP/API: pass;
- no matched panic, oops, BUG, hung-task, RCU, unknown-symbol, vermagic, MMC,
  USB or ext4 alert;
- the user waived repeating the physical HDMI/HID/button matrix on this unit.

The hardware-tested kernel `Image`, `vmlinux`, board DTB and complete FIT are
byte-identical to fixed run A. The exact fixed-run-A SD container was not
separately written after the clean A/B proof. Its rootfs difference from the
hardware-tested assembly was audited: inventory is unchanged; 49 retained
vendor sample/test ELFs have identical executable/data section contents and
differ only in file padding; seven vendor modules have identical executable
text and differ in recorded kernel build-time strings; 26 system ELFs reflect
Buildroot's empty-RUNPATH padding for a different-length absolute output path;
and three text files update Buildroot/kernel provenance. This is sufficient for
the kernel boot gate, but an exact-container flash remains an optional final
media check rather than claimed evidence.

## Remaining Security Work

Stable 5.10.265 removes the large 5.10.4 stable-patch gap, but configuration
hardening remains a separate phase. The candidate still has user namespaces,
`/dev/mem`, and debugfs enabled, while Security/LSM, restricted dmesg,
hardened usercopy, slab freelist hardening, init-on-alloc/free, strict
kernel/module RWX and module signatures remain disabled.

Configuration changes must be introduced in bounded batches with rollback and
device evidence. A raw-update candidate, production signing-key custody and
redistribution rights for retained vendor firmware/runtime inputs remain
separate release gates.
