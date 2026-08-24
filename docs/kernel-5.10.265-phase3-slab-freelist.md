# Linux 5.10.265 Phase 3 Batch 3: SLUB Freelist Hardening

Status date: 2026-08-24.

Status: accepted-batch-2 performance baseline and bounded Kconfig proof pass.
Clean candidate builds and recovery-device acceptance are pending. This is a
recovery-SD development batch, not a raw update or release artifact.

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
`6ad5c1cdb834ce096898b46995e0e0892c8421a394c4141bcd39b29c08309a73`.
The cumulative diff contains only the four lines shown by the two accepted
batches and this batch. `CONFIG_SLAB_MERGE_DEFAULT=y` remains unchanged and
`CONFIG_SHUFFLE_PAGE_ALLOCATOR` remains disabled; there is no hidden Kconfig
cascade.

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

1. Build two independent clean full pipelines from one committed outer tree.
2. Prove exact A/B identity through kernel, modules, rootfs, FIT and recovery
   image and confirm the config diff remains bounded.
3. Boot the exact recovery image and verify running config/module/provenance
   identity, HTTP/SSH, mounts, network, dmesg and kernel logs.
4. Run the two candidate benchmarks and compare them with the fixed baseline.
5. Complete ten reboot cycles, physical rollback to accepted batch 2 and final
   batch-3 restoration before acceptance.
