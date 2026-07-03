# System Update Safety Notes

This file records device-layout assumptions that matter for future base-system
updates. It intentionally avoids per-device lab logs.

## Live Device Layout

Hardened raw/system update tooling assumes a NanoKVM SD-card layout with:

- a small boot partition mounted at `/boot`;
- an ext4 root filesystem mounted at `/`;
- a separate data partition mounted at `/data`;
- NanoKVM application files under `/kvmapp`;
- persistent device configuration under `/etc/kvm`.

Do not treat vendor OTA layout files as the live installed-device layout without
checking the target device. Vendor update containers can describe only BOOT and
ROOTFS while live devices also rely on a separate data partition.

## Raw Update Safety

Raw boot/rootfs writes remain for lab devices with SD-card recovery available.
They should not be enabled for broad production use until partition-aware
rollback and power-loss behavior are fully designed and validated.

Before publishing a raw system update:

1. Build or patch a known-good Hardened SD image.
2. Extract boot/rootfs payloads from that image.
3. Validate the rootfs with `scripts/validate-nanokvm-rootfs.sh`.
4. Build the signed raw bundle and metadata.
5. Install on sacrificial SD media first.
6. Verify web, SSH, video, HID, storage, network, reboot, and rollback paths.

## Rootfs Content Requirements

A raw rootfs payload must contain the expected Hardened NanoKVM runtime layout,
including:

- `/kvmapp`;
- `/etc/kvm`;
- required init scripts;
- Hardened web assets;
- the backend binary and native runtime libraries;
- the bundled system-update public key.

The validator must reject rootfs images that omit these files or include
unexpected runtime artifacts.

## Preferred Update Paths

- Use signed application updates for normal backend and UI changes.
- Use file-level signed system bundles for small known rootfs changes.
- Use raw boot/rootfs updates only when the change truly requires replacing
  base SD-card partitions.
