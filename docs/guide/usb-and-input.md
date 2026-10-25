---
status: current
applies-to: system 0.4.0 / app 2.1.0
last-checked: 2026-10-18
---

# USB devices, keyboard and mouse

The NanoKVM is a USB gadget to the host: a keyboard, an absolute and a relative
mouse and, unless HID-only mode is on, a mass-storage device and a USB network
card. The gadget's serial number and MAC addresses are derived from the SG2002
chip ID, so they stay the same across reboots and reflashing.

## Settings > Device

- **Virtual disk**: shares `/data` with the host
  ([Virtual media](virtual-media.md#the-virtual-disk-and-data)).
- **Virtual network**: a USB network card on the host. Changing it restarts the
  USB connection, which cancels a mounted image.
- **USB wakeup**: lets keyboard and mouse events wake a sleeping host. Turn it
  off if the host logs repeated USB wakeup messages.
- **Mouse jiggler**: moves the mouse now and then so the host does not sleep, in
  absolute or relative mode.

## HID-only mode

Some hosts, often BIOS setups and KVM switches, stop responding to the keyboard
or mouse when the NanoKVM also presents storage and network devices. **HID-only
mode** (**Settings > Device**) keeps only the keyboard and mice. It is kept as the
flag file `/boot/usb.hidonly`, and changing it reboots the NanoKVM. While it is
on, images cannot be mounted.

## Keyboard

- **Paste** types text from your clipboard on the host.
- **Shortcuts** sends key combinations the browser would otherwise catch, and
  the **Leader key** lets you type them in sequence or all at once.
- The menu bar shows the host's **Num, Caps and Scroll Lock** state as the host
  reports it.
- On phones and tablets, the mobile view has its own keyboard controls, an
  on-screen keyboard, TouchSync pointer control, pinch-to-zoom and panning.
  **Settings > User > Appearance** can force the mobile view.

## Mouse

Absolute mode maps the pointer to the screen; relative mode sends movements and
has a sensitivity control. If the host does not read the mouse at all (a console
without a mouse driver), absolute moves time out quickly instead of stalling the
interface.
