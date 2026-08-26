# Linux 5.10.265 Phase 3 Batch 4: Init On Allocation

Status date: 2026-08-26.

Status: configuration proof, source risk audit, accepted batch-3 baseline and
two clean full batch-4 pipelines are complete. The pipelines are byte-exact
through the compressed recovery image. No batch-4 artifact has been installed;
device acceptance and rollback remain open. This batch enables
init-on-allocation only; init-on-free remains a separate later decision.

## Scope

The cumulative fragment retains accepted batches 1 through 3 and adds only
heap zeroing on allocation:

```diff
 CONFIG_SECURITY_DMESG_RESTRICT=y
 # CONFIG_USER_NS is not set
 CONFIG_SLAB_FREELIST_RANDOM=y
 # CONFIG_SLAB_FREELIST_HARDENED is not set
-# CONFIG_INIT_ON_ALLOC_DEFAULT_ON is not set
+CONFIG_INIT_ON_ALLOC_DEFAULT_ON=y
 # CONFIG_INIT_ON_FREE_DEFAULT_ON is not set
```

Tracked fragment:

`support/sg2002/kernel/5.10.265/configs/phase3-04-init-on-alloc.config`

Fragment SHA-256:
`13c9fede1fdc4cfe59d1b6f2f90d4ae28d0b7e32876c9145b9999bb09816f750`.

A fresh merge/olddefconfig proof used the same pinned Xuantie cross-toolchain
as the accepted kernel. The generated diff contains exactly the one line above:

`build/latestbuildroot/kernel-5.10.265-phase3-init-on-alloc-config-proof/config.diff`

| Config | SHA-256 |
| --- | --- |
| accepted batch 3 | `43ff885267b771646b2e02b6b05e72bbc1d07c1c68070849464c053d38480e2c` |
| proposed batch 4 | `845714bfa1ab3d03ef356eb9896ad0198460aa9cd2a6d0cdb0021a5d639a9a6d` |

A host-GCC proof was deliberately rejected because compiler-capability symbols
created an unrelated cascade. Only the exact cross-toolchain proof is valid.

## Source And Compatibility Audit

Linux 5.10.265 implements this option through the `init_on_alloc` static key.
It zeroes page-allocator and slab objects on allocation. Slab caches with a
constructor, `SLAB_TYPESAFE_BY_RCU`, or `SLAB_POISON` keep their established
semantics; explicit `__GFP_ZERO` remains compatible. The kernel command-line
escape hatch is `init_on_alloc=0`, but acceptance must use the compiled default
without that override.

The reviewed SG2002 external source has no `__GFP_SKIP_ZERO` use. The two
retained third-party explicit slab-cache sites use no custom constructor:

- AIC `rwnx_sw_txhdr` uses `KMEM_CACHE(..., 0)`;
- RTL8733BS mesh path cache uses `kmem_cache_create(..., NULL)`.

Within the SG2002 `interdrv/v2` source snapshot, the bounded allocation scan
found 51 `kzalloc`/`devm_kzalloc` sites, 19 `kmalloc`/`devm_kmalloc` sites, one
DMA allocation site, 32 `vmalloc` sites and nine `vzalloc` sites. Zeroing is
therefore already an expected invariant for most driver state, but the
remaining media, DMA and atomic hot paths still require physical runtime and
performance evidence. Source inspection does not prove proprietary userspace
or firmware timing compatibility.

## Build And Reproducibility Evidence

Two clean full candidate pipelines were built from outer project commit
`f97d12dfb7ee0bf54c58650f861dc2cddd1b3ffe`. The strict comparison proves exact
identity for the kernel Image, vmlinux, config, symbols, three DTBs, 24 in-tree
modules, 30 external modules, three media modules, staged runtime payload,
Buildroot ext4 and tar rootfs, FIT, full SD image, compressed image and extracted
payloads.

The retained comparison report is:

`build/latestbuildroot/repro-reports/kernel-5.10.265-phase3-init-on-alloc/summary.md`

Its SHA-256 is
`2618bc706db095b3b29f2a30ec616aeab16654cdf3abbf75c11476c36f4de602`.
The duplicate B pipeline was removed only after this proof; selected pipeline A
and the report remain retained.

| Selected A artifact | SHA-256 |
| --- | --- |
| kernel config | `845714bfa1ab3d03ef356eb9896ad0198460aa9cd2a6d0cdb0021a5d639a9a6d` |
| kernel Image | `e1ce391f36161e8dd466fd99214b7f55fdb0e128d613f1d45c9a8e7b6cd9789e` |
| vmlinux | `81204650095fab65355387941761f101c44a14515c1ed13b33d7164741d5bd9c` |
| Module.symvers | `8b07a7d16d77964c2882f4bdd4c90aa18545759369709862e1abd1f98b1a536d` |
| boot FIT / boot.sd | `a296fd70af3a965d105512b67254db9d7d08998b14632bfea194e2208e02b9aa` |
| Buildroot rootfs.ext2 | `ca586a4afa1b00a6606a674fc8195aad7dd2cd065a80c2288c531b13326f7f36` |
| Buildroot rootfs.tar | `363276f7f07a9da2a61d8aec17f3b1f5b5d0f49255bcb7b75f8cc40c80ff64e7` |
| full SD image | `e4df3145ff2eec567d993c53ab6536b80cdda930b23eb0eebd91754abdd26a0f` |
| compressed SD image | `c0a1e76ab79d8b854687c1ff813ef31009a0b3a3cc5417f97a984edcdd78fa9b` |

All 57 loadable modules and the external-source provenance are byte-identical
to accepted batch 3. The rootfs contract is unchanged, so a guarded FIT-only
device probe can attribute any change to this kernel candidate. Final
acceptance still requires a boot of the complete selected recovery image.

## Accepted Batch-3 Baseline

Two fresh baseline runs used the accepted final selected image at
`10.0.87.45`, boot ID `a25cfec8-a4dc-46e6-8b6e-734777841791`, with config
SHA-256 `43ff885267b771646b2e02b6b05e72bbc1d07c1c68070849464c053d38480e2c`.
Each run used one 512-file warm-up and seven 2,048-file tmpfs/VFS iterations.

| Run | Minimum | Median | Maximum | Total | Temperature delta | Alerts |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| A | 660 ms | 670 ms | 750 ms | 4,760 ms | +0.349 C | 0 |
| B | 650 ms | 670 ms | 730 ms | 4,720 ms | +0.699 C | 0 |

Evidence:

- run A:
  `build/latestbuildroot/device-tests/phase3-init-on-alloc-baseline-10.0.87.45-a/report.txt`,
  SHA-256 `78f25c7d82ca44144a0301b26a01743f6c00d1b8dfa18962c13e35af0d647763`;
- run B:
  `build/latestbuildroot/device-tests/phase3-init-on-alloc-baseline-10.0.87.45-b/report.txt`,
  SHA-256 `afcaa49166f9365b774adee18c9f11edccfd09516d4278a2dea824d2dd2d5323`.

## Predeclared Candidate Limits

The accepted baseline mean-of-medians is 670 ms. Before candidate
construction, the batch-4 limits are fixed as follows:

- use the same warm-up, file count and seven iterations twice;
- candidate mean-of-medians must be no more than 15 percent above baseline,
  therefore no more than 770.5 ms;
- neither candidate median may exceed 900 ms;
- each run's temperature increase must remain within 3 C;
- kernel-alert count must remain zero before and after every run;
- any functional media, DMA, network, storage or USB regression rejects the
  batch regardless of benchmark timing.

These are bounded lab attribution limits, not general performance claims.

## Remaining Gates

1. Boot the selected candidate through the guarded recoverable-media procedure
   and verify the dmesg banner reports heap
   allocation initialization on and heap free initialization off.
2. Run exact identity, both predeclared performance runs, media/video, Wi-Fi,
   Ethernet, storage, USB and kernel-log gates.
3. Complete reboot cycles and physical rollback to accepted batch 3.
4. Boot and accept the complete selected A recovery image, then freeze the
   kernel scope for the next RC.
5. Decide on init-on-free only as a new batch after batch 4 is accepted.
