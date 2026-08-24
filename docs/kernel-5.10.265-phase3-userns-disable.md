# Linux 5.10.265 Phase 3 Batch 2: User Namespaces Disabled

Status date: 2026-08-24.

Status: consumer audit, build and exact reproducibility pass. Recovery-device
acceptance is pending. This is a recovery-SD lab candidate, not a raw update or
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

## Pending Recovery-Device Acceptance

The image must be written to the recovery card and booted before this batch can
be accepted. Do not install it first through the web raw updater.

The initial gate uses
`scripts/verify-kernel-userns-disabled-device.sh` through the existing guarded
host runner. It must prove:

- Linux `5.10.265-tag-`, system `0.3.0-raw.11`, app `2.0.41`;
- the running config has `CONFIG_USER_NS=n`, keeps network namespaces and keeps
  the accepted dmesg restriction;
- user-namespace proc interfaces and user-namespace helper programs are absent;
- root dmesg works while a dropped `nobody` context is denied;
- all 57 modules, critical media modules, writable mounts and Ethernet pass;
- kernel alerts are zero and uptime/load/available temperature samples are
  recorded.

After the initial gate, the same verifier must pass after ten software reboot
cycles with distinct boot IDs and an observed offline interval. The prior
batch-1 recovery image remains the rollback medium until the batch-2 boot and
rewrite/rollback boundary are accepted. Physical HDMI/HID/button repetition is
waived by the user for this recovery device, but exact boot, config, API/SSH,
module, storage, network, dmesg and reboot/log gates are not waived.
