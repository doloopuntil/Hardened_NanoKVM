# Web UI layout rules for the Settings pages

These rules grew page by page while the Settings pages were unified. They
describe what the pages do now; the shared pieces live in
`web/src/components/setting-rows.tsx` and `web/src/components/save-bar.tsx`,
and the dialog and toast helpers in `web/src/lib/feedback.ts`.

## Page structure

1. A page starts with its title in `text-base`, followed by
   `<Divider className="opacity-50" />`. The title and the hairline sit at the
   same height on every page, on the desktop and the touch layout, so a page
   that has its own header (System) must not add padding above the title or
   change the spacing below it.
2. A page is a column of titled sections with the same faded hairline between
   them. A section is `SettingSection`: a grey sentence-case title
   (`text-neutral-400`), then its rows 24px apart.
3. No frames, cards or bordered boxes, and no result panels with icons. The
   exceptions are the viewers of text that comes from the system (the System
   log and the Current rules of the firewall, a dark box with monospace text)
   and the firewall mode tiles.
4. Read-only lines (`InfoRow`) are grouped in a `space-y-3` column. A row is at
   least 32px tall, so a line keeps its height whether it is read-only or
   editable.
5. Names are shared between pages when they mean the same thing: Connection
   (Network, WireGuard, Tailscale), Encrypted tunnel, Latest version, Login.
   A section title never repeats the label of its first row.

## Rows and fields

6. Use only the shared rows: `SettingRow` (label and caption left, control
   right; `isSwitch` and `inline` keep a narrow control on the label's row on a
   phone), `InfoRow` (value grey and right-aligned; it may carry a caption),
   `EditableInfoRow` (the same row with an input) and `SettingSection`.
7. Values are right-aligned, including the text inside inputs and tag fields.
   Every field has a caption except the editable address fields of Network
   (IP address, subnet mask, router, prefix), whose meaning is well understood.
8. Inputs are sized to their content with standard Tailwind widths (`w-20`,
   `w-24`, `sm:w-36`, `sm:w-72`). The one accepted exception is the WireGuard
   public key. A unit is a fixed label beside the box (`Space.Compact` with
   `Space.Addon`), never part of the value.
9. A field that depends on a switch stays visible and is disabled while the
   switch is off. Nothing appears or disappears with a switch.
10. A value that comes from the system (IPv4 and IPv6 outside manual mode) is
    shown read-only in the same row where the editable field would be.
11. On a phone, switches, info rows, narrow controls and buttons stay on the
    label's row. Wide inputs and selects go under it.
12. Long values wrap at spaces and hyphens (`break-words`); `break-all` is only
    for a single token with no spaces, such as a key or a URL.

## Buttons and actions

13. Buttons sit on the right. A group that wraps stays right-aligned
    (`ml-auto` on the group).
14. An action that runs something is a row with a caption and a button
    (Restart, Stop). Destructive or irreversible actions (Logout, Uninstall)
    go in a bar at the end of the page, under a hairline, as red outline
    buttons (`danger`, not `type="primary"`).
15. A primary (blue) button is the one main positive action of a page or state.
    A quick action confirms with a `Popconfirm`; a heavier one with
    `confirm()` from `lib/feedback.ts`.
16. Unsaved changes show in the sticky `SaveBar` at the bottom, never in the
    page header. The bar has a 12px gap above it in the panel colour
    (`#1b1b1b`, the modal colour under its 50% layer) and reaches across the
    panel padding on both layouts.

## Status and feedback

17. A state message is the caption of the field it describes: up to date or
    update available under the version row, "downloaded and verified" under
    Staged version, "reboot required" under Pending version.
18. A busy state is a small spinner with text. An error is red
    (`text-red-400`). A headline above the buttons is only for a state that is
    a message in itself ("Boot confirmed").
19. An `Alert` is for a state that blocks something (Paranoid mode, raw
    installs disabled, the clock not synchronized) and goes above the
    sections.
20. Secondary explanation goes in a tooltip behind a help icon; a warning
    tooltip uses an orange alert icon, always through `LabelTip`
    (`components/label-tip.tsx`, tooltip above the icon). A caption says what a
    setting does; a tooltip says what it costs or how it is sized.
21. A control stays disabled until its own load has succeeded
    (`useSettingsLoad`), and every failed action is visible (`attempt()` and
    `toast`).

## Text

22. Sentence case everywhere: labels, buttons, section titles and tab names.
    Only real names keep capitals: Tailscale, WireGuard, the firewall modes
    (Baseline, Moderate, Restricted, Paranoid), the key names Num Lock, Caps
    Lock and Scroll Lock, and "HID-Only mode". Protocol and file names (HDMI, SSH,
    mDNS, HTTPS, Changelog) stay as they are in every language.
23. Every text starts with a capital letter, with no parentheses and no "!".
    Captions, tooltips, toasts and field errors are one sentence without a
    final full stop. Dialogs, banners and step lists stay multi-sentence with
    full stops.
24. Menu paths read "Settings > Device > Virtual disk".
25. Every new or changed English string needs all 25 languages. English lives
    in `web/src/i18n/locales/en.ts` (or `locale-extras.ts` for the two-factor
    strings), the other languages in `translation-fixes.ts`, the last layer.
    Compare the effective strings of every language before and after a change
    to prove that nothing else moved; `translations.test.ts` checks that no
    language misses a key or has an extra one.

## Order

26. Tabs: About, Account, Appearance, Device, System, WireGuard, Tailscale,
    System updates. The System sub-pages are Time, Network, Firewall, Logging,
    and System opens on Time.

## Technical rules

27. Tailwind's preflight is off, so a border needs an explicit style
    (`border-0 border-b border-solid border-white/[0.06]`); `border-b` alone
    draws nothing.
28. A sticky element must not sit inside an `overflow-x-hidden` container; that
    makes the container its scroll parent and the element stops sticking.
29. Layout depends on the phone class `settings-modal-mobile` (see
    `assets/styles/index.css`); use
    `[.settings-modal-mobile_&]:` for rules that differ on the touch layout.
30. The app is dark-only. Colours that cannot come from a Tailwind token, such
    as the save bar gap, are written as a value with a comment.

## Adding or changing a page

- Start from the title and hairline, then `SettingSection`s; reach for a
  shared row before writing flex markup.
- Give every field a caption, or leave it bare on purpose and say so here.
- Put the strings in all languages, sentence case, one sentence without a full
  stop for captions.
- Check the page at desktop width and at 375px: title and hairline position,
  rows wrapping, buttons wrapping to the right, long values.

## Open deviations

None at the moment. The audit of 2026-10-17 found fifteen; they were fixed or
turned into the exceptions named in the rules above. List here what a page
still does against the rules, and remove the entry when it is fixed or turned
into an exception.
