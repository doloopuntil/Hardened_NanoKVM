# Linux 5.10.265 Phase 3 Batch 3: SLUB Freelist Hardening

Status date: 2026-08-24.

Status: accepted-batch-2 performance baseline, bounded Kconfig proof, two clean
candidate builds and exact reproducibility pass. Recovery-device acceptance is
pending. This is a recovery-SD development batch, not a raw update or release
artifact.

## Scope

This cumulative fragment retains the two accepted earlier batches and adds
exactly two SLUB hardening options:

```diff
 CONFIG_SECURITY_DMESG_RESTRICT=y
 # CONFIG_USER_NS is not set
-# CONFIG_SLAB_FREELIST_RANDOM is not set
-# CONFIG_SLAB_FREELIST_HARDENED is not set
+CONFIG_SLAB_FREELIST_RANDOM=y
+CONFIG_SLAB_FREELIST_HARDENED=y
```

Tracked fragment:

`support/sg2002/kernel/5.10.265/configs/phase3-03-slab-freelist.config`

Fragment SHA-256:
`44ded040c6a41973572a17206b938834d470a8b9f3e055faabf50fbef72099ef`.

The exact Linux 5.10.265 Kconfig requires `SLAB || SLUB`; this target already
uses `CONFIG_SLUB=y`. A fresh olddefconfig/merge/olddefconfig proof produced
final config SHA-256
`388f5ad008bd3193317f8a1ac20648462f430c889c142366dbf0af2c59792ccb`.
The cumulative diff contains only the four lines shown by the two accepted
batches and this batch. `CONFIG_SLAB_MERGE_DEFAULT=y` remains unchanged and
`CONFIG_SHUFFLE_PAGE_ALLOCATOR` remains disabled; there is no hidden Kconfig
cascade. The proof includes the vendor defconfig newline guard used by the full
builder and is byte-identical to both completed build configs.

Freelist randomisation changes object order when new slab pages are populated.
Freelist hardening obfuscates stored SLUB freelist pointers with per-cache
random state and detects a direct double-free pattern. It changes allocator hot
paths and therefore requires performance and vendor-driver runtime evidence.

## Accepted Batch-2 Baseline

`scripts/benchmark-kernel-slab-device.sh` performs one warm-up followed by
seven identical iterations. Each iteration creates 2,048 empty files in a
private `/tmp` tmpfs directory, walks their metadata, verifies their count and
removes the directory. It records centisecond-derived duration, temperature,
load, slab memory and kernel-alert counts. The trap always removes its private
directory; no persistent partition is written.

Two baseline runs on the accepted batch-2 image at `10.0.87.48` used running
config SHA-256
`e8e82ff139f0bd1e46d1467505b2b4a3b1bc59d2af54fa52c983e3da3320ae63`:

| Run | Minimum | Median | Maximum | Total | Temperature |
| --- | ---: | ---: | ---: | ---: | --- |
| A | 670 ms | 680 ms | 750 ms | 4,820 ms | 45.843 C to 46.542 C |
| B | 650 ms | 650 ms | 740 ms | 4,660 ms | 46.542 C to 47.242 C |

Both runs reported zero kernel alerts before and after the workload. Evidence:

- run A report:
  `build/latestbuildroot/device-tests/phase3-slab-baseline-10.0.87.48-a2/report.txt`,
  SHA-256 `24625622cf97996feba16c8906ed0b8458d969c406669782812b4be524205fe9`;
- run B report:
  `build/latestbuildroot/device-tests/phase3-slab-baseline-10.0.87.48-b/report.txt`,
  SHA-256 `35f4044e1fc08852f128b0b2cadeb3cbddf6b4f01bbbdf077eebf7169ebca156`.

## Build And Reproducibility Evidence

Both complete clean runs were built from outer project commit
`97407be90066c0159b23a8603024eaa154c64dff`:

- `build/latestbuildroot/kernel-5.10.265-phase3-slab-repro-a`;
- `build/latestbuildroot/kernel-5.10.265-phase3-slab-repro-b`.

Both use source tree `d53dfbde34f1de6b4565e686009b688c04b8913d`
and fragment SHA-256
`44ded040c6a41973572a17206b938834d470a8b9f3e055faabf50fbef72099ef`.
The config diff contains exactly the four cumulative options described above.

Exact A/B matches:

- kernel config, Image, vmlinux, symbols, three DTBs and 24 in-tree modules;
- 30 external and three source-built media modules;
- 57-module runtime staging and metadata;
- Buildroot ext4 and tar rootfs;
- candidate FIT;
- complete SD image, compressed image and extracted payloads.

Clock-init audit is `1/1`, depmod errors are zero, module counts are
`24/30/3/57`, both xz streams validate, and the source tree remains unmodified.

Reproducibility report:

`build/latestbuildroot/kernel-5.10.265-phase3-slab-repro-report/summary.md`

Report SHA-256:
`d3ef4d12bd94de55e0c2ff2ecacf4ad5560b69479247bc8a17057c49baea3daf`.

| Artifact | SHA-256 |
| --- | --- |
| final kernel `.config` | `388f5ad008bd3193317f8a1ac20648462f430c889c142366dbf0af2c59792ccb` |
| kernel `Image` | `c901af9c77d13dd788d5276d56c124643cbf397e197363bd40adf5234a0b4780` |
| `vmlinux` | `d28d057a4bd3c533c560c9d79676e19abda0e1e9d5982180a9ec3afcb2f8f083` |
| board DTB | `29b5ef4166f4c9883b30d766d97e3ec5d6c409a6b72891cd9ed1fbe4f0c47f73` |
| Buildroot ext4 | `45cf283da11dbbc96f1f209271a83d46761b75c637acf368566a0a4dcb0e25e1` |
| Buildroot tar | `be85841985c605125da06ab99254abf4094b6ab14ff8d64f0103a4e20d3939a8` |
| candidate FIT | `55773c88bd8a71ca4430d7e5f8655b509416d39b306d04779cb073696d580400` |
| full SD image | `706586441b91969a5dac69a4c9986eeacfa82f54a66d7c4f117acfb2c2b96c39` |
| compressed SD image | `7294ac12a5d9719c03abf03c1d1516752ae2ac136ed76399c2185e8637c887c9` |

Image to write to re-identified sacrificial recovery media:

`build/latestbuildroot/kernel-5.10.265-phase3-slab-repro-a/recovery/assembly/images/hardened-sg2002-port.img.xz`

Compressed size: 33,774,280 bytes. Uncompressed size: 1,627,390,464 bytes.
This is recovery media only; do not install it first through the web raw
updater.

## Candidate Performance Gate

The criterion is fixed before candidate construction:

- use the same script, file count, warm-up and seven iterations twice;
- candidate mean-of-medians must be no more than 15 percent above the baseline
  mean-of-medians of 665 ms, therefore no more than 764.75 ms;
- neither candidate median may exceed 900 ms;
- each run's temperature increase must remain within 3 C;
- kernel-alert count must remain zero before and after every run;
- any functional device failure rejects the batch regardless of benchmark
  timing.

These are lab attribution limits, not general hardware performance claims.
Load-average and allocator-cache noise are retained in each report and must be
reviewed alongside timing.

## Remaining Gates

1. Boot the exact recovery image and verify running config/module/provenance
   identity, HTTP/SSH, mounts, network, dmesg and kernel logs.
2. Run the two candidate benchmarks and compare them with the fixed baseline.
3. Complete ten reboot cycles, physical rollback to accepted batch 2 and final
   batch-3 restoration before acceptance.
