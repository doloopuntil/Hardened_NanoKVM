---
status: current, channels pending
applies-to: system 0.4.0 / app 2.1.0
last-checked: 2026-10-22
---

# Updates

Hardened NanoKVM has two kinds of update, and they are kept apart on purpose:
replacing the application is safe to retry, while a system update rewrites SD-card
partitions and can leave a device that does not boot.

> [!IMPORTANT]
> **Update channels for 0.4.0 are not set up yet.** The server still reads the
> channels of `woffko/Hardened_NanoKVM`, which do not carry 0.4.0. Until this fork
> has channels of its own, install 0.4.0 by flashing an SD card
> ([Install](install.md)) or by uploading an application archive through
> **Offline updates**. This page will be updated when the channels exist.

## Application updates

An application update replaces only `/kvmapp`: the Rust server, the web UI, the
init scripts and helpers shipped with it, the update keys and the version file. It
does not touch the boot partition, the root filesystem or the kernel. Backend and
web UI fixes ship this way.

In **Settings > System updates**:

- **Application** checks the online channel. The device accepts an update only
  when its `latest.json` carries a valid signature and the downloaded archive
  matches the SHA-512 in it.
- **Preview updates** switches both the application and the system check to the
  preview channels.
- **Offline updates** takes an application archive
  (`hardened-nanokvm-kvmapp-<version>.tar.gz`) uploaded from the browser and runs
  the same package checks.

The server restarts after an application update; sign in again afterwards.

## System updates

A system update writes new images to the boot and root partitions
(`/dev/mmcblk0p1` and `/dev/mmcblk0p2`). It is the only way to change the kernel,
the Buildroot userspace or the init scripts installed in the root filesystem.

- **Allow raw system updates** must be on before a staged system update can be
  installed. Preview updates only chooses the channel; it does not authorise the
  write.
- **Download and verify** fetches the system bundle into
  `/data/.hardened-kvmcache`, checks its signed metadata, the archive digest and
  every payload hash, and stages it.
- **Install** re-checks the staged bundle, backs up the configuration it needs,
  streams the compressed images onto the partitions and reboots.
- On the first boot of the new system, the saved configuration in `/etc/kvm` is
  restored before SSH and the server start. Once the server reports healthy, the
  boot watchdog confirms the update. If health checks fail after boot, it rolls
  back.

### Updating from a bundle you built

To update without the release channel or an SD-card reflash, sign the bundle
with a key of your own and upload it.

1. Create a key pair on your computer and keep the private half there:
   `openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:3072 -out local.pem`, then
   `openssl pkey -in local.pem -pubout -out local.pub.pem`.
2. In **Settings > System updates**, choose **Set key** under **Local update key**,
   paste `local.pub.pem` and enter your password. The device now trusts that key
   for uploaded bundles only; the online channels never use it.
3. Build the metadata with
   `SYSTEM_UPDATE_SIGNING_KEY=local.pem SYSTEM_UPDATE_SIGNATURE_KEY_ID=local CHANNEL=dev scripts/create-system-update-metadata.sh <version> hardened-system-<version> <archive> system-latest.json`.
   This also writes `system-latest.json.sig`.
4. Wrap the three files into one bundle with
   `scripts/create-system-update-bundle.sh <archive> system-latest.json system-latest.json.sig <version>.bundle.tar`.
5. Choose **Upload system bundle** and select the `.bundle.tar`. The device
   verifies the signature, the archive digests and every payload hash, then
   stages the bundle. Install it as usual.

Bundles signed by the local key may repeat or lower the installed version, so a
development build can be reinstalled. Bundles signed by a release key must still
be newer. Choose **Remove** to withdraw the key. Registering and removing it
needs your password and is written to the system log.

Keep a recovery card ready and the power connected. A system update does not
recover by itself from a device that cannot boot at all; reflash the card then.
Turn **Allow raw system updates** off again afterwards.

## Which one to use

Use an application update for anything inside `/kvmapp`. Use a system update, or
a fresh SD card, only when the base system changes. A system bundle can require a
minimum application version (RC12's required app 2.0.42), so install the
application update first when both are offered.

## For maintainers

The bundle layout, metadata format and signing are in
[System-update bundles](../reference/system-update-bundles.md).
