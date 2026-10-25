---
status: current
applies-to: system 0.4.0 / app 2.1.0
last-checked: 2026-10-22
---

# Tailscale

Tailscale is the other way to reach the KVM from outside your network. It is not
part of the image; the page installs it on demand.

1. Open **Settings > Network > Tailscale** and press **Install**. The device downloads
   `tailscale_latest_riscv64.tgz` from `pkgs.tailscale.com`. If the download
   fails, download that package yourself, unpack it, and copy `tailscale` to
   `/usr/bin/` and `tailscaled` to `/usr/sbin/` on the device.
2. Start the service and press **Login**. Open the link shown (valid for ten
   minutes) and add the device to your tailnet.
3. Reach the KVM by its Tailscale address or name.

**Memory optimization** keeps Tailscale's memory use low, which helps on the
NanoKVM's 256 MB. If it still runs short, turn on the swap file (its size is set
in **Settings > System > Performance**). Restart Tailscale after changing either.

**Stop** stops the service and keeps it from starting at boot.

Restricted mode allows only a few outbound ports, so Tailscale falls back to its
relays over HTTPS, which is slower; Paranoid blocks it. Moderate leaves outbound
traffic open. See
[Firewall modes](firewall.md).
