# SG2002 Linux 5.10.265 Recovery Candidate

Status date: 2026-08-23.

This is an unpublished recovery-SD candidate. It is not a raw update and must
not be installed first through the web updater.

## Source and merge

- signed upstream stable tag: `v5.10.265`;
- signing fingerprint:
  `647F 2865 4894 E3BD 4571 99BE 38DB BDC8 6092 693E`;
- exact vendor tree reconstructed on official `v5.10.4` before the merge;
- provisional merge commit: `8f420f24ebaec78462732c409ffb70ac1bc77c24`;
- reviewed candidate source commit:
  `24606ae3f756a64abccfe1db79c0c97c8e642505`;
- source tree:
  `26af02a5de4cf66e8adfa1332e9a8537d333fd87`;
- kernel release contract: `5.10.265-tag-`.

The conflict resolution preserved CVITEK RISC-V, vector 0.7, compat, DWC2,
configfs HID, Ethernet, I2C, framebuffer and module requirements while
retaining the stable fixes in the overlapping paths. Follow-up build fixes
covered native/compat vDSO linkage and the post-5.10.4 `close_fd()` API.

Candidate-only external-module patches resolve the new `MIN`/`MAX` namespace
and type-safe comparison contracts without disabling `-Werror` or changing the
byte-exact 5.10.4 baseline mode.

## Verified local gates

- clean kernel Image/vmlinux build: pass;
- CVITEK DTBs: `3/3`;
- in-tree modules: `24/24`;
- external vendor modules: `30/30`;
- source-built media modules: `3/3`;
- packaged runtime modules: `57/57`;
- module vermagic failures: `0`;
- depmod unknown-symbol/version/ELF failures: `0`;
- complete raw.11 Buildroot rootfs validator: pass;
- rootfs modules byte-identical to reviewed staging: `57/57`;
- FIT Image/ramdisk/DTB extraction checks: pass;
- full SD rootfs, `boot.sd`, and `fip.bin` extraction checks: pass;
- two independent clean pipelines: exact for kernel, modules, runtime,
  ext4/tar rootfs, FIT, full SD image and compressed image.

Reproducibility evidence:

`build/latestbuildroot/kernel-5.10.265-repro-report-accepted-v2/summary.md`

## Final artifacts

The accepted local side is run A:

| Artifact | SHA-256 |
| --- | --- |
| kernel `Image` | `7a198f07934a5f7bcd7027a7c894c0d6c1c4f92d4e21e3c0623a728d17351746` |
| `vmlinux` | `1dde86e38adf3c172bdc4ea64a212f40157cbc0de37dc66e27e07c431d4afaee` |
| board DTB | `29b5ef4166f4c9883b30d766d97e3ec5d6c409a6b72891cd9ed1fbe4f0c47f73` |
| Buildroot ext4 | `ba2be4260bc9a4ebb692e9714f3bac2358564789f0ff1372e4e31a286c817e5b` |
| Buildroot tar | `1630467b0cfff6c89595127bc52f93a28229d6bfb05efcd771a7115460ac16f4` |
| candidate `boot.sd` FIT | `a2d06a53ac1f287e3aed379ba9f6043c5c5f5f7aadea378fbb6b54f717507468` |
| full SD image | `b65d882ad64718f96f9113c64cdcd084eacd2c7c98663b57bc3156414fa9dfad` |
| compressed SD image | `7c43134764360161df2df731ad2647551cc42745f9760482cdabd2eac5bb3a9a` |

Image to write:

`build/latestbuildroot/kernel-5.10.265-repro-a/recovery-final/assembly/images/hardened-sg2002-port.img.xz`

The image is about 1.6 GiB uncompressed and 33 MiB compressed. The target data
partition is expanded by the existing first-boot flow.

## Required physical gate

1. Identify the sacrificial/recovery SD device again. Never infer it from size
   alone and never overwrite the accepted recovery card without confirming the
   device path.
2. Write the compressed image to that card and safely eject it.
3. Boot only the secondary NanoKVM from the card. Do not create a raw update.
4. Find the router-assigned address; a new locally administered MAC/address is
   expected on a clean boot.
5. Complete first-account setup, then verify:
   - `uname -r` is exactly `5.10.265-tag-`;
   - app `2.0.41` and system `0.3.0-raw.11`;
   - UI metadata reports kernel `5.10.265-tag-`;
   - all required modules load with no unknown symbols;
   - SSH, HTTP/API, network, root/data partitions and reboot work;
   - no new oops, panic, BUG, hung task, RCU, USB, MMC or filesystem alerts.
6. The user explicitly waived repeating the secondary-device physical
   HDMI/HID/button matrix. The existing main-device raw.11 matrix remains the
   peripheral baseline; automated media/H.264 checks should still be run when
   an HDMI source is available.

## Remaining security work

Stable 5.10.265 removes the large 5.10.4 patch gap, but configuration hardening
is intentionally separate until the recovery candidate boots. The candidate
still has user namespaces, `/dev/mem`, and debugfs enabled, while Security/LSM,
restricted dmesg, hardened usercopy, slab freelist hardening, init-on-alloc/free,
strict kernel/module RWX and module signatures remain disabled.

Production signing-key custody and redistribution rights for retained vendor
firmware/runtime inputs remain release blockers.
