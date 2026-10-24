---
status: current
applies-to: system 0.4.0 / app 2.1.0
last-checked: 2026-10-22
---

# Sign-in and two-factor

## The account

There is one administrator account. A freshly flashed card asks you to create
it on first visit; there is no default `admin/admin`. Its password is also set as
the `root` password, which SSH uses.

There is no reset through the web UI or the API. If you lose the password,
reflash the SD card ([Install](install.md)).

Change the password in **Settings > Account**. You need the current password,
and every other session is signed out.

## What protects a session

- New passwords are stored with Argon2id. Older bcrypt files are still accepted.
- Sessions are bound to a CSRF token and checked against the request's
  `Origin`. WebSockets check their `Origin` too.
- Five wrong passwords from one address lock that address out for ten minutes.
- **Settings > Account > Session > Log out when the browser closes**, on by
  default, keeps the sign-in out of the browser's saved cookies, so it ends when
  you quit the browser; a browser set to restore its last session may keep it.
  **Lock session when inactive** is separate and also applies: it signs you out
  after 5, 15, 30 or 60 minutes without activity, even in an open browser.
- Sign-ins and sign-in failures go to the system log, so remote logging
  (**Settings > System > Logging**) can keep them off the device.

## Two-factor sign-in (TOTP)

An authenticator app can add a six-digit code to the web sign-in. SSH is not
covered: it keeps using the `root` password.

1. Open **Settings > Account > Two-factor authentication** and turn it on.
2. Enter your password, scan the QR code with the authenticator app and enter a
   code to confirm. The second factor becomes active only after that code is
   accepted, so a wrongly set up app cannot lock you out.
3. Save the nine backup codes shown. Each works once, and they are not shown
   again.

Turning the second factor off and issuing new backup codes also ask for your
password.

**Require two-factor authentication** makes the second factor mandatory. It can only be
turned on once the account has a confirmed authenticator.

### The device clock

The NanoKVM has no battery-backed clock, so until NTP has set the time after a
boot, authenticator codes are refused with a "clock not synchronized" message.
Backup codes still work then: they are the way in on a device that booted
without network time.

### Lost authenticator and backup codes

Sign in over SSH and remove the `totp` object from `/etc/kvm/pwd`. If SSH is off
too, reflash the card.

## For developers

How the pending sign-in ticket, replay protection and the enforced policy work is
in [Rust backend: two-factor authentication](../development/backend.md#two-factor-authentication).
