---
status: current
applies-to: system 0.4.0 / app 2.1.0
last-checked: 2026-10-24
---

# Power control and hardware

## Power menu

On a NanoKVM Full or PCIe, the ATX board connects to the host's power and reset
pins. The **Power** menu sends a short or long click of the power button, or a
reset. Its **Confirmation** switch makes each of them ask first.

A NanoKVM Lite has no ATX board, so the buttons would do nothing. When the device
looks like a Lite (a `beta` board with no OLED and no Wi-Fi), the Power menu is
hidden by default. That detection is a guess: if you have customised the menu bar
icons in **Settings > User > Appearance > Menu bar**, your choice decides instead.

## Video capture

- **Settings > Device > HDMI** turns HDMI capture on or off.
- **Capture idle timeout** stops HDMI capture after a set time without viewers
  and starts it again when someone connects, which saves power and heat.
- Video modes: **H.264 Direct** has the lowest CPU load and needs HTTPS and a
  browser with WebCodecs. **H.264 WebRTC** works over HTTP but is blocked by the
  Restricted and Paranoid firewall modes. **MJPEG** works everywhere.

## OLED and swap

- **OLED timeout** turns the screen off after a set time, or never.
- **Swap** (**Settings > System > Performance**) adds a swap file when memory runs
  low; it wears the SD card faster.

## Monitor and CPU load

**Settings > System > Monitor** shows the CPU load, temperature, RAM, swap and disk
use once a second, with five minutes of history kept on the device. The CPU load
bar splits user time from system time; interrupt handling counts as system time.
The figure comes from `/proc/stat`, not from `/proc/loadavg`: the load average
stays near 7 on an idle device, because the vendor video and ISP kernel threads
(`vi_event_handle`, `cvitask_isp_*`, `cvitask_vc_*`) wait in uninterruptible sleep
and each adds 1.0. Read the Monitor, not `uptime`.

## Crash recovery

The first-stage boot loader (FSBL) arms the SoC's hardware watchdog at power-up, so a
hang in U-Boot or early Linux resets the chip after about 43 seconds. Linux keeps feeding
the timer until `S02watchdog` takes over: if nothing feeds it for 60 seconds the chip
resets itself, and a kernel panic or oops restarts the device after 10 seconds. The
reason for the last restart (`power-on`, `restart`, `watchdog` or `overheat`) is read
from the RTC and written to `/tmp/boot-reason` and the system log.

**Settings > System > Performance > Recovery** switches the watchdog on or off at
once and shows the reason for the last restart. The switch creates or removes an
empty `/boot/disable_watchdog` file, which you can also create from the SD card on
another computer. With the watchdog off, Linux disarms it as soon as it starts.

The FSBL also counts boots that never reached a healthy server, in the RTC register
`RTC_INFO1`. `S95nanokvm` sets the count back once the server answers. After 2 such boots
in a row the FSBL starts with the standard clocks, whatever the clock overdrive setting
says; after 4 it leaves the watchdog off so a boot loop cannot lock you out. A power
loss clears the count.

## Host name

The host name may be fully qualified (`kvm.example.net`). The mDNS name is its
first label plus `.local` (`kvm.local`). Changing it asks whether to reboot.
