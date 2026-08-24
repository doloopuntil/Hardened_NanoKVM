# Linux 5.10.265 Phase 3 Batch 2: User Namespaces Disabled

Status date: 2026-08-24.

Status: consumer audit, build, exact reproducibility, recovery-device runtime,
ten-reboot acceptance, physical rollback and batch-2 restoration pass. Batch 2
is accepted. It remains a recovery-SD lab candidate, not a raw update or
release artifact.

## Scope

This cumulative batch retains the accepted batch-1 dmesg restriction and
changes one additional option relative to that accepted configuration:

```diff
 CONFIG_SECURITY_DMESG_RESTRICT=y
-CONFIG_USER_NS=y
+# CONFIG_USER_NS is not set
```

Relative to the original vendor configuration, the complete generated config
diff contains exactly those two changes. `CONFIG_NAMESPACES=y` and
`CONFIG_NET_NS=y` remain enabled. `CONFIG_SECURITY`, LSM selection,
`HARDENED_USERCOPY`, slab hardening, init-on-alloc/free, strict RWX, `/dev/mem`
and debugfs are unchanged.

Tracked fragment:

`support/sg2002/kernel/5.10.265/configs/phase3-02-userns-disable.config`

Fragment SHA-256:
`63248a9571e549c76513004f1d7493c726d3148ef16e3ae74ca65d1b158f2c15`.

## Consumer Audit

Before changing the config, the accepted batch-1 runtime at `10.0.87.47` was
audited read-only:

- all 71 observable processes used the initial user namespace;
- no process used a non-initial user namespace;
- none of `unshare`, `nsenter`, `newuidmap`, `newgidmap`, `bwrap` or
  `bubblewrap` was installed;
- the initial UID and GID maps covered the full ID range.

The live audit report is:

`build/latestbuildroot/device-tests/phase3-userns-10.0.87.47-audit/report.txt`

Report SHA-256:
`4fb8b8d2ffa05a7f2edcfc8619b4aa69d536a24794dac74960a8043dee445190`.

A fresh lexical audit of the tracked application, Rust backend, web code,
Buildroot integration, SG2002 support and scripts found no `CLONE_NEWUSER`, ID
map writer or user-namespace helper consumer outside the audit/config tooling.
The assembled run-A rootfs contains none of the helpers listed above.

The `max_user_namespaces` sysctl is not itself proof that user namespaces are
available: Linux 5.10's generic ucount sysctl table may retain that entry even
when `CONFIG_USER_NS=n`. Runtime acceptance therefore checks the exact running
config and absence of the user-namespace proc interfaces.

## Build And Reproducibility Evidence

Both complete clean runs were built from outer project commit
`473baf95a0cb60f46b1ed0b21d7215b590c1ab7f`:

- `build/latestbuildroot/kernel-5.10.265-phase3-userns-repro-a`;
- `build/latestbuildroot/kernel-5.10.265-phase3-userns-repro-b`.

Both use source commit `83c188ecdc1556b14573705e9c0a32cd5853d865`,
whose required source tree is
`d53dfbde34f1de6b4565e686009b688c04b8913d`.

Exact A/B matches:

- kernel config, Image, vmlinux, symbols, three DTBs and 24 in-tree modules;
- 30 external and three source-built media modules;
- 57-module runtime staging and metadata;
- Buildroot ext4 and tar rootfs;
- candidate FIT;
- complete SD image, compressed image and extracted payloads.

Additional checks pass: the config delta contains exactly the two cumulative
options above, clock-init audit is `1/1`, depmod errors are zero, module counts
are `24/30/3/57`, both xz streams validate, and the source tree is unmodified.

Reproducibility report:

`build/latestbuildroot/kernel-5.10.265-phase3-userns-repro-report/summary.md`

## Local Candidate Artifacts

| Artifact | SHA-256 |
| --- | --- |
| final kernel `.config` | `e8e82ff139f0bd1e46d1467505b2b4a3b1bc59d2af54fa52c983e3da3320ae63` |
| kernel `Image` | `db7465f4a12d41e62859977d3eb06bd5de667ff65071a736b9d37bbc58fec62c` |
| `vmlinux` | `cbeb6757a307e995bb7387d76d2cc574cf095fd1c12fedbcdcbc53eaa770f7a2` |
| board DTB | `29b5ef4166f4c9883b30d766d97e3ec5d6c409a6b72891cd9ed1fbe4f0c47f73` |
| Buildroot ext4 | `722a4d29629b17d5407f94d7a7f041ccab2493239e7b5b491b1c29a92edc61b5` |
| Buildroot tar | `ad032ff41df67935709a7be31c8efb725bc1a0afbb409d88d169440307dc6629` |
| candidate FIT | `389a3b2d1c53a4251ed736a7c0dd67c1b3729ce30dcde2ed40e7995f2af16763` |
| full SD image | `a1178fa759304165ff6dd0156380f69d21ccb178ab2b6fbc08800eb7bb750d74` |
| compressed SD image | `b48376723aa30358809eb32600dfe85b0660b31a67b2a5ff7f0ab23afc4320bc` |

Image to write to re-identified sacrificial recovery media:

`build/latestbuildroot/kernel-5.10.265-phase3-userns-repro-a/recovery/assembly/images/hardened-sg2002-port.img.xz`

Compressed size: 33,780,832 bytes. Uncompressed size: 1,627,390,464 bytes.

## Recovery-Device Evidence

The exact run-A image was written to recovery media and booted on the test
NanoKVM at its new router-assigned address `10.0.87.41`. It was not installed
through the web raw updater.

Initial and strengthened post-soak gates prove:

- Linux `5.10.265-tag-`, system `0.3.0-raw.11`, app `2.0.41`;
- running config SHA-256
  `e8e82ff139f0bd1e46d1467505b2b4a3b1bc59d2af54fa52c983e3da3320ae63`;
- `CONFIG_USER_NS=n`, network namespaces retained, user-namespace proc
  interfaces `0`, and namespace helper programs `0`;
- `kernel.dmesg_restrict=1`, root dmesg allowed and dropped-`nobody` dmesg
  denied;
- all 57 modules and critical media modules present, with deterministic module
  set SHA-256
  `bcc0f878699001f5e06249598ad6744d157d26cd89cb345e769eeff38cdcc961`;
- kernel provenance SHA-256
  `5158d92465e17ebdea692f3e2569a7efefc829881f4f01e9503627e76b730886`;
- root, boot and data mounts writable, Ethernet and HTTP/SSH healthy, and
  kernel alert count `0`.

Ten software reboot cycles then passed. All ten observed an offline interval,
all eleven recorded boot IDs were unique, and the complete config/dmesg/module/
mount/network/log verifier passed after every boot. Cycle temperatures ranged
from 40.949 C through 41.998 C. The strengthened final identity check recorded
45.843 C and HTTP health returned again after the final reboot.

Evidence:

- initial report:
  `build/latestbuildroot/device-tests/phase3-userns-disabled-10.0.87.41-initial/report.txt`,
  SHA-256 `4b6e44e6d3ef3e74eef940db3d09cef5a3dadb5970f1bed720e07c956c7e6499`;
- reboot report:
  `build/latestbuildroot/device-tests/phase3-userns-disabled-10.0.87.41-reboots-10/report.txt`,
  SHA-256 `ae94f70733d6f8d1564c3ba903c2e2e0eca7517698df24e867f3c7bbed0793e1`;
- final reboot-cycle report SHA-256:
  `29bcabab1462f8cd5c77ccb5f5a48dc811dfadfa307b7a0a59f377ce5b2897a4`;
- strengthened post-soak report:
  `build/latestbuildroot/device-tests/phase3-userns-disabled-10.0.87.41-final-v2/report.txt`,
  SHA-256 `a8bab0680df3d9c084aa452c0c59fd9a006dd55a468632319b4c6af1d7132ceb`;
- accepted ED25519 host-key fingerprint:
  `SHA256:4nn8ukwRiC2urzBqG8VJhM/jx6jqz3MLZMbPdBmvoW8`.

Physical HDMI/HID/button repetition is waived by the user for this recovery
device. Exact boot, config identity, API/SSH, module, storage, network, dmesg
and reboot/log gates were not waived and pass.

## Rollback And Restoration Evidence

The known-good batch-1 recovery image was booted at its new DHCP address
`10.0.87.56`. The strengthened batch-1 verifier proved:

- running batch-1 config SHA-256
  `8a6670b40bf9a5239a3549995d538f1d22b173c9b46c719ae0025801529db8d6`;
- Linux `5.10.265-tag-`, `CONFIG_USER_NS=y` and
  `CONFIG_SECURITY_DMESG_RESTRICT=y`;
- the same reviewed 57-module aggregate and kernel provenance hashes;
- root/unprivileged dmesg boundary, writable mounts, Ethernet, HTTP/SSH and
  zero kernel alerts.

Rollback report:

`build/latestbuildroot/device-tests/phase3-userns-disabled-rollback-batch1-10.0.87.56/report.txt`

Report SHA-256:
`1497cddae42f2e3340809d1eb4604f6e48d9661fcbcc75f0af7800246446e46e`.

Rollback ED25519 fingerprint:
`SHA256:5Kst9LJW5pn5IvYKI6P3KLBPhg1JZfL/4Vme+pHvTn0`.

The physical rollback boot passes. The exact batch-2 image was then restored
and booted at `10.0.87.48`. Its strengthened verifier again matched the reviewed
config, 57-module aggregate and provenance hashes; `CONFIG_USER_NS=n`, the
dmesg boundary, mounts, Ethernet, HTTP/SSH and zero-alert gates all passed.

Restoration report:

`build/latestbuildroot/device-tests/phase3-userns-disabled-10.0.87.48-restored-final/report.txt`

Report SHA-256:
`c5514e8b5b888a4724705497e15557caaed272112ab2f381087ad621751ee746`.

Restored ED25519 fingerprint:
`SHA256:0px0D2doKXIUSwC1WElRTMWRVeZxlIyqadYyLx5NYQ4`.

The final restoration sample recorded 52.835 C after module hashing and a
133.55-second uptime. Batch 2 is accepted. Batch 3 may begin as a separate
slab-freelist hardening candidate with its own config diff, reproducibility,
performance, recovery, reboot and rollback evidence.
