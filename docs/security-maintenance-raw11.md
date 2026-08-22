# Buildroot Userspace Security Maintenance: raw.11

Status date: 2026-08-22. Active branch: `security/raw11-userspace`.

This is the execution plan and evidence ledger for app `2.0.41` and system
`0.3.0-raw.11`. It does not declare the vendor kernel secure and does not
authorize publication or installation. Kernel `5.10.265` remains the separate
high-risk track in [`vendor-kernel-5.10-security-plan.md`](vendor-kernel-5.10-security-plan.md).

## Release Contract

- Publish app `2.0.41` before raw.11.
- System metadata format 2 must declare `required_app_version: 2.0.41`.
- Both metadata and the signed bundle manifest must agree on that minimum.
- An older backend must not install raw.11, and app `2.0.41` must recheck the
  minimum immediately before installing a staged update.
- raw.11 remains preview-only until clean-build, reproducibility, recoverable
  media, device, rollback, and signing gates pass.
- Do not create a production private key as part of the build. Release signing
  requires an independently provisioned key and an explicit publication step.
- Key rotation is two-stage: app `2.0.41` first installs the new public key;
  raw.11 metadata is signed by that key and the signed system payload may then
  install `/etc/kvm/update-key-policy` containing only the production key ID.
  Once that policy exists, the legacy dev key is rejected even if its public
  key file remains for rollback compatibility.

The format-2 implementation and tests are committed as `d5f480f`.

## Userspace Finding Disposition

| Finding | raw.11 action | Evidence state |
| --- | --- | --- |
| OpenSSH 10.3p1 | Backport the official Buildroot 2026.08-rc1 recipe for 10.5p1. | Official tarball SHA-256 verified; extract/patch/full build pass and rootfs contains 10.5p1. Runtime SSH tests remain. |
| util-linux CVE-2026-13595 | Do not add a duplicate patch. | The exact Buildroot 2026.05.1 util-linux 2.41.5 source already contains upstream commit `c0186f14fbdb02f64c8e0ba701ce727ea764ff4c`; the raw CPE result is a false positive for this source. |
| BusyBox CVE-2026-38753/38754/38755 | Backport the three upstream mailing-list fixes. | All three patches pass extract/patch/full build; the patched source sites are verified and OpenVEX marks the version-only scanner matches fixed. |
| OpenSSL CVE-2026-54876 | Backport upstream 3.6-branch commit `155b5fe0f93365e6df1c56ee3606b121080c6c12`. | Patch passes extract/patch/full build and the owning-reference cleanup is present in the compiled source; OpenVEX marks the version-only match fixed. OpenSSL 3.6.4 is not used because no release tarball exists at this status date. |
| OpenSSL CVE-2026-14456 | Remove the affected unused QUIC surface. | `BR2_PACKAGE_LIBOPENSSL_ENABLE_QUIC` is disabled; final `.config` confirms it. |
| vendor zlib 1.3 | Stop packaging the private copy and use Buildroot zlib 1.3.2. | Staging/package/rootfs validators reject private `libz*`. The accepted system zlib satisfies all six symbols required by vendor protobuf; runtime loader-map and hardware tests remain. |
| dnsmasq 2.92rel2 | Remove the unused package and init script. | Defconfig and both independently built rootfs images contain neither binary nor init script. |
| hostapd 2.11 / CVE-2026-58374 | Update to 2.12 and remove compile-time 802.11be/MLO support. | Official tarball SHA-256, extract/patch/full build pass; final hostapd config contains nl80211 but no 11be/ACS/VLAN/legacy hostap. Runtime AP test remains. |
| Avahi CVE-2025-59529 | Restrict the local simple-protocol socket to root and bound daemon resources. | Overlay sets `RLIMIT_NOFILE`, no reflector/wide-area publishing; init chmods the socket to `0600`. `clients-max` is deliberately absent because this no-D-Bus build rejects that D-Bus-only setting. This is a threat-model mitigation, not an upstream code fix; verify daemon startup and socket permissions after boot. |
| empty clean-image root password | Lock root until first web provisioning. | Defconfig disables `BR2_TARGET_ENABLE_ROOT_LOGIN`; both rootfs validators confirm literal `root:*:`. First-login web/SSH synchronization remains a device gate. |
| non-reproducible userspace | Enable Buildroot reproducible mode, pin ext4 UUID/hash seed, and remove build-host metadata leaks before comparing independent builds. | Final independent outputs `repro3` and `repro4` from runtime commit `066770e` are byte-identical: ext4 `7a8e4bbd...`, tar `8c6275e1...`. |

The Buildroot VEX entries live in `buildroot-external/hardened-sg2002/external.mk`.
They cover only the three patched BusyBox findings, the already-fixed exact
util-linux source, three non-applicable OpenSSH product/configuration matches,
and the AArch64-only GCC match. Avahi `CVE-2025-59529` deliberately remains in
pkg-stats because raw.11 mitigates its reachable local socket but does not
backport an upstream code fix.

## Build Inputs And Guardrails

`scripts/prepare-buildroot-2026.05.1-security-source.sh` starts only from the
SHA-256-pinned Buildroot `2026.05.1` archive. It verifies the pristine recipes,
applies the tracked OpenSSH/hostapd recipe patch series with `-F 0`, removes two
hostapd 2.11 patches already integrated in 2.12, and records every applied patch
hash in `.hardened-security-backports`. It refuses unknown or stale output.

Package source patches are under the Buildroot global patch directory:

- `busybox/1.38.0`: the three 2026 fixes;
- `libopenssl/3.6.3`: the OCSP response leak fix.

Static policy gate:

```sh
make test-latest-buildroot-security-policy
```

Generated security evidence gate:

```sh
scripts/verify-raw11-security-evidence.sh \
  build/latestbuildroot/sg2002-config-2026.05.1-raw11-repro1/pkg-stats.json \
  build/latestbuildroot/security-audit-0.3.0-raw.11-20260822/evidence/rootfs-grype-vex.json
```

The machine-readable scanner dispositions are tracked in
[`security-maintenance-raw11.openvex.json`](security-maintenance-raw11.openvex.json).

## Required Execution Order

1. Prepare the strict security source and configure a fresh raw.11 output.
2. Download/hash-check and run the real Buildroot patch stage for OpenSSH
   10.5p1 and hostapd 2.12.
3. Build app `2.0.41`, including current web assets, cross-compiled Rust
   binaries, native libraries, and a package with no private zlib.
4. Build the complete rootfs and run both generic and latest-Buildroot rootfs
   validators. Inspect package versions, compiled feature flags, `/etc/shadow`,
   services, ELF dependencies, and update-key installation.
5. Generate fresh pkg-stats/SBOM/scanner evidence and classify every remaining
   match; do not equate a scanner zero with coverage of proprietary binaries.
6. Repeat the complete build from a second clean output directory with the same
   committed source and compare normalized rootfs contents and release inputs.
7. Assemble recoverable SD media and pass boot, first-login, SSH, HTTPS,
   firewall, Ethernet/Wi-Fi/AP, USB/HID/virtual-media, MJPEG/H.264/WebRTC,
   HDMI, hwmon, watchdog, reboot, persistence, and log gates.
8. Only after recoverable-media acceptance, exercise signed raw update,
   boot-good, rollback, and post-update regression on the test device.
9. Sign app and system metadata with the production key, verify downloaded
   assets independently, publish app first and raw second, then update preview
   channels and documentation. Stable promotion is a separate decision.

## Current Gates

Completed locally:

- format-2 minimum-app contract and unit/integration tests;
- strict no-fuzz Buildroot source preparation on a clean archive;
- raw.11 defconfig generation and policy inspection;
- BusyBox and OpenSSL real source patch stages;
- frontend `2.0.41` build;
- application `2.0.41` preserves verification of the already-published
  `hardened-system-test` raw.10 channel while retaining the separate keyring
  and post-rotation key-policy enforcement; the original candidate exposed
  this compatibility failure during the five-reboot gate and commit `3a808ce`
  fixes it;
- application staging proof that an existing vendor-runtime directory cannot
  reintroduce `libz.so.1.3`;
- exact SHA identity for the Rust server and hwmon between the app archive
  staging and Buildroot rootfs; Buildroot is forbidden from re-stripping them,
  and post-build restores the single reviewed root-owned `/kvmapp` RUNPATH
  after Buildroot's generic target RPATH sanitizer; `/tmp` is not a dynamic
  library search location;
- static ABI proof that Buildroot zlib `1.3.2` exports every zlib symbol needed
  by the vendor protobuf closure;
- two independent final Buildroot outputs from runtime commit `066770e` with
  byte-identical ext4 and tar images after removing Buildroot host-path leaks:
  ext4 `7a8e4bbd75060d98bf0710c04e0b385402c764999484fb90841b2cdd56192f02`
  and tar `8c6275e15f343a90b34ce2ae64cb0a15afcab252cea83fd148103568d6a4c811`;
- fresh NVD feed synchronized at `2026-08-22T14:00:20Z`:
  47 target entries, one residual CVE, zero unsure; the residual is Avahi
  `CVE-2025-59529`;
- Syft `1.51.0`/Grype `0.117.0` scan with database built
  `2026-08-21T06:17:24Z`: five raw version matches, zero unsuppressed and five
  VEX-filtered after verified BusyBox/OpenSSL dispositions; final SBOM, raw
  Grype and VEX-filtered Grype SHA-256 values are respectively
  `03ace9d93715a0fee251047697d6a93a4d9052065efa4dccdeeb7cb3e726e5dd`,
  `a209588c965aff5d857e4ebb9a2aaf2086eaf286b42421f8e0dc6ad73c14da76`
  and `7b184b06268c43911c43f8bccc6348f2543a21db42a582fe614105d7ca77956e`;
- app `2.0.41` archive
  `75b293875d613d4f4908c17d2cf15de2bcfc3e38acdd8da7e5b34e0eb9be62dc`
  is installed on the test device over raw.10; online update checking, native
  identity, browser, network, remote syslog, same-WebSocket H.264, video, safe
  USB, peripherals, watchdog recovery, five reboots and final postflight pass;
- recoverable SD image
  `125d8766840ff9ca9f84a63455163e45a0b2df11b7105e54c588c7eca52e82d7`
  has the expected two-partition layout; its extracted rootfs, `fip.bin` and
  `boot.sd` are byte-identical to the accepted inputs. It has not yet been
  written to or booted from physical recovery media;
- unsigned raw.11 bundle
  `c1b8cfad21bc519dba71065d228dd3f2bd057ba5522c12735e5645f8c594ccd3`
  has a validated format-2 manifest requiring app `2.0.41`; it is deliberately
  not installable without production metadata/signatures;
- final Buildroot `legal-info` target manifest is
  `cc18e25a89f99b6d75bd0b5e23abcb7cd43dca9377b3569c9f3aa4d0fcfa0764`.
  The AIC firmware, vendor payload portion of kvmapp, codec firmware and SG2002
  vendor runtime remain `PROPRIETARY` without redistributable license files.

Pending or blocked:

- physical recovery-SD boot and the complete raw.11 hardware/rollback matrix;
- production system-update signing key custody;
- redistribution permission or replacement of the four proprietary inputs;
- the separate vendor-kernel remediation track.
