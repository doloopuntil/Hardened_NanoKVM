---
status: current
applies-to: system 0.4.0 / app 2.1.0
last-checked: 2026-10-18
---

# Power control and hardware

## Power menu

On a NanoKVM Full or PCIe, the ATX board connects to the host's power and reset
pins. The **Power** menu sends a short or long click of the power button, or a
reset. Its **Confirmation** switch makes each of them ask first.

A NanoKVM Lite has no ATX board, so the buttons would do nothing. When the device
looks like a Lite (a `beta` board with no OLED and no Wi-Fi), the Power menu is
hidden by default. That detection is a guess: if you have customised the menu bar
icons in **Settings > Appearance > Menu bar**, your choice decides instead.

## Video capture

- **Settings > Device > HDMI** turns HDMI capture on or off.
- **Capture idle timeout** stops HDMI capture after a set time without viewers
  and starts it again when someone connects, which saves power and heat.
- Video modes: **H.264 Direct** has the lowest CPU load and needs HTTPS and a
  browser with WebCodecs. **H.264 WebRTC** works over HTTP but is blocked by the
  Restricted and Paranoid firewall modes. **MJPEG** works everywhere.

## OLED and swap

- **OLED timeout** turns the screen off after a set time, or never.
- **Swap** adds a swap file when memory runs low; it wears the SD card faster.

## Host name

The host name may be fully qualified (`kvm.example.net`). The mDNS name is its
first label plus `.local` (`kvm.local`). Changing it asks whether to reboot.
