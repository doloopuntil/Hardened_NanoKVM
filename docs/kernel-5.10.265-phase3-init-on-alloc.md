# Linux 5.10.265 Phase 3 Batch 4: Init On Allocation

Status date: 2026-08-26.

Status: configuration proof, source risk audit, accepted batch-3 baseline and
two clean full batch-4 pipelines are complete. The pipelines are byte-exact
through the compressed recovery image. The guarded FIT probe, exact identity,
performance, functional runtime, ten-reboot and batch-3 rollback gates pass.
The complete final RC12 selected A recovery image and two post-expansion boots
also pass exact device verification. Batch 4 is accepted and the RC12 kernel
scope is frozen. This batch enables init-on-allocation only; init-on-free
remains a separate later decision.

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

## Device Acceptance Evidence

The guarded FIT-only probe ran on recoverable test device `10.0.87.45`. Before
the switch, the accepted batch-3 FIT, config, 57-module aggregate, provenance,
rootfs identity and zero-alert state were reverified. The candidate FIT
`a296fd70af3a965d105512b67254db9d7d08998b14632bfea194e2208e02b9aa`
was installed only after an exact batch-3 backup was written and rehashed.

The first candidate boot had boot ID
`74e34698-51ee-4dd5-ae22-063a37f7a496`. It matched config
`845714bfa1ab3d03ef356eb9896ad0198460aa9cd2a6d0cdb0021a5d639a9a6d`
and reported exactly:

`mem auto-init: stack:off, heap alloc:on, heap free:off`

The 57-module aggregate, provenance, rootfs commit `06c8106`, selected
userspace hashes, mount/network state and zero kernel-alert condition all
matched the reviewed image.

Candidate performance results:

| Run | Minimum | Median | Maximum | Total | Temperature delta | Alerts |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| A | 660 ms | 680 ms | 720 ms | 4,760 ms | +0.350 C | 0 |
| B | 700 ms | 700 ms | 770 ms | 4,980 ms | +0.350 C | 0 |

The candidate mean-of-medians is 690 ms, 2.99 percent above the 670 ms
baseline and below the fixed 770.5 ms limit. Both individual medians and both
temperature deltas also pass their predeclared limits.

The functional runtime gate passed with the native `kvm_system` and Rust server
alive, Ethernet carrier/address present, USB gadget bound with three HID,
mass-storage and RNDIS functions, required media device nodes and modules
present, a verified `/data` write/read, and zero kernel alerts. Browser login,
desktop rendering, health and the MJPEG HTTP protocol passed. No frame was
expected during this run because the device reported `HDMI active=false`,
`VIFPS=0` and `now_fps=0`; the user had explicitly deferred the separate
physical HDMI/Wi-Fi/HID matrix. This is recorded as a physical-matrix waiver,
not as positive frame or Wi-Fi evidence.

Ten consecutive software reboots produced ten distinct new boot IDs. Every
boot passed the exact candidate config, banner, module, provenance, rootfs and
zero-alert verifier. The saved batch-3 FIT was then restored and booted as boot
ID `df0154e9-b8c1-4131-a63d-e81fd8d6dfe5`; config reverted to
`43ff885267b771646b2e02b6b05e72bbc1d07c1c68070849464c053d38480e2c`,
heap allocation initialization reverted to off, and the full exact verifier
again passed with zero alerts. The test device is left on accepted batch 3.

| Evidence | SHA-256 |
| --- | --- |
| preflight report | `6a2aac1923cdff7969c6ee4b258916bc76fe0972bbd4fb101f2acdf8d1a0ae77` |
| candidate install report | `5afa7091d09ee5abd48c27fc8da1091df1e3a204897f38c22a7e8b2b7748a766` |
| initial exact candidate report | `b6a6c8884bf570ba84943cf4767ee0b3804a6df91868c7b91f5c51072b047744` |
| candidate benchmark A | `7ed78e5ba84fda3012e2dda054091a7d4ee3a501075d1a62ca90a0697361c20a` |
| candidate benchmark B | `db5a961862622ce28d661e85f382fa34e30578da18ce58289023f4f38ec99ad5` |
| functional runtime report | `51edf08cc32103eda0c4ff7fa5a1a8fc98b4bcf6173ddda915cb489b238f6ba2` |
| browser diagnostic report | `db47f525f9e7e7409ba94b113b2c1dfb1d0254ec11dafae17ceea25d7e8acfe3` |
| capture-state report | `22139558e3ba547dc30a746545e8936521cae9f545b176153de8c45770fa7030` |
| ten-reboot report | `701621e8abd1a86dabdb3f016e0ccb316696bcfd9c05276a568a28c521a54442` |
| rollback install report | `187a65a60ae55775640a374f5a6ad24054c2522f6d94722768c72960adb3894c` |
| rollback boot report | `b0f8e041afa22bd123d1d36944d4604968afa4160a27883a34b892626750606e` |

## Final RC12 Reproducibility Candidate

After the kernel-only gates passed, two new clean end-to-end pipelines built
the final release versions from commit
`34cb2cb4bba5e61731ba35f40f428c05a54c4120`: app `2.0.41`, system
`0.3.0-raw.12`, Buildroot `2026.05.1` and kernel `5.10.265-tag-`.

The pipelines are byte-exact for the kernel, all 57 modules, runtime staging,
both Buildroot rootfs formats, FIT, full partitioned image, compressed image and
extracted payloads. The retained strict report is:

`build/latestbuildroot/repro-reports/kernel-5.10.265-rc12-release/summary.md`

Its SHA-256 is
`c8094a36ebc1cd011608db901e96b59209181a62a51c0c3cc7df66a4d10073e2`.
Pipeline B was deleted only after this exact proof; selected A and the report
remain retained.

| Selected RC12 A artifact | SHA-256 |
| --- | --- |
| kernel config | `845714bfa1ab3d03ef356eb9896ad0198460aa9cd2a6d0cdb0021a5d639a9a6d` |
| kernel Image | `e1ce391f36161e8dd466fd99214b7f55fdb0e128d613f1d45c9a8e7b6cd9789e` |
| vmlinux | `81204650095fab65355387941761f101c44a14515c1ed13b33d7164741d5bd9c` |
| Module.symvers | `8b07a7d16d77964c2882f4bdd4c90aa18545759369709862e1abd1f98b1a536d` |
| boot FIT / boot.sd | `a296fd70af3a965d105512b67254db9d7d08998b14632bfea194e2208e02b9aa` |
| Buildroot rootfs.ext2 | `a5254238d690cd963b2b0f663977211634c424d78fb5e30fa095d815ab5d7701` |
| Buildroot rootfs.tar | `1145a4900cc22594fab6deaedf6a17ef714666872f19de83b5548fde258d90a2` |
| full SD image | `3d5e199c314de0f5f195aa26fe61aa26788566076b86bff749fe013fef960ad3` |
| compressed SD image | `23df0435fb81d762fcc55483e7159cb7022e150dd03935d42f480671e1d3e546` |

The compressed 33,779,072-byte image to write to a recovery card is:

`build/latestbuildroot/kernel-5.10.265-rc12-release-a/recovery/assembly/images/hardened-sg2002-port.img.xz`

Direct extraction from the selected rootfs proves system `0.3.0-raw.12`, app
`2.0.41`, kernel metadata `5.10.265-tag-`, the selected security-maintenance
label and Buildroot commit marker `34cb2cb`.

## Final RC12 Physical Acceptance

The exact selected A image was written to a SanDisk High Endurance 64 GB card
and booted on the test NanoKVM at `10.0.87.49`. The initial boot ID was
`e1dae03e-aeac-4a5c-af43-11986557b554`. First-boot storage expansion produced
the accepted 16 MiB p1, 7.61 GiB p2 and remaining-card p3 layout; `/`, `/boot`
and `/data` were mounted read-write.

The initial exact verifier passed the RC12 system metadata, FIT, kernel config,
heap-init banner, 57-module aggregate, provenance, Buildroot commit and selected
userspace hashes with zero kernel alerts. Functional runtime then passed with
the native `kvm_system` and Rust server alive, Ethernet active, USB gadget bound
with HID/RNDIS/mass-storage functions, media nodes/modules present and a
verified `/data` write/read.

Browser authentication, desktop rendering, health and two MJPEG `200`
multipart responses passed. No video frame was claimed: hwmon and VI state
proved the physical HDMI input was inactive (`active=false`, `VIDevFPS=0`,
`VIFPS=0`, `now_fps=0`), consistent with the user-waived physical video matrix.

Two post-expansion software reboots produced boot IDs
`6677fac9-ae90-4519-b632-bed0704eedc1` and
`e968faa0-ffe3-4047-981f-6853e22659b7`. Each boot retained the exact partition
layout and passed RC12 identity with zero alerts. The final functional runtime
gate also passed after the second reboot. The device is left running accepted
RC12.

| Final physical evidence | SHA-256 |
| --- | --- |
| initial full-image report | `4c9d4e03c60b95a06cb5beca6ea631e20bdfc5207213d2100ab13006c03d86e6` |
| initial functional runtime | `4bac0868ae95fd92ed5026e30606a755d20c9bcefbee4ec7daa5d814dbbea68b` |
| browser diagnostic | `83e830214e7201bbd96a5a642835923020f244ecfce9be0803c764050d1399e8` |
| HDMI/capture state | `486bbd5ff533c04c23e74359858136411db60994ba483224dada6c32f0139b6f` |
| two-reboot exact report | `d0100e76e52018688b9d5b974ee2d994126ac966b889bde28024dc818de2f383` |
| post-reboot functional runtime | `dea0ea5c6a201072a0ec3135cc1888624854ab6dce2085381d5226c4110d1864` |

## Superseding Bridge RC12 Artifacts

The app `2.0.41` rootfs/full-image hashes above are retained as kernel and
device evidence but are superseded for publication by the production-key
bridge. Two new clean pipelines from build commit `9567b5f` package corrected
app `2.0.42` and are exact through the same kernel/module/runtime/rootfs/FIT,
full-image and extracted-payload scope. Kernel config/Image/vmlinux/symbols and
FIT remain byte-identical to the accepted kernel scope.

| Selected bridge RC12 artifact | SHA-256 |
| --- | --- |
| Buildroot rootfs.ext2 | `b840bd08f2c708b45b527d005719b6d5dc6a7b1ba66922b8e161b570a950c760` |
| full SD image | `2b4cf8c4f9f4507a212441957a24dc33e01cf8b3283c1488a3f564f882af2ee1` |
| compressed SD image | `a6069020dd92c024793cbb84500887a766f07263f8a6241b9462e6e0ca95dae0` |
| strict A/B report | `d201611d70a4922cc08a1d456bd14c2c2307d35104a6ae90ac42f00283d758c2` |

The production-key-signed raw.12 archive
(`cf6bbef5599197f4b5ed926f22bed12352f2fdc275eb8f32fc8344d3ed7eae96`)
was installed on
`.133` from the accepted bridge/raw.11 state. Exact identity, hardening,
configuration restoration, boot-good, an additional reboot, browser login, the
13-step regression suite with five more reboots and a final exact freeze all
pass with zero kernel alerts. The new full SD image still requires its separate
physical recovery-card acceptance and is not inferred from the raw update.

## Remaining Gates

No kernel gate remains in the RC12 scope. Init-on-free, `HARDENED_USERCOPY`,
strict kernel/module RWX, module signing and `/dev/mem`/debugfs removal remain
future independent batches and must not be folded into RC12.
