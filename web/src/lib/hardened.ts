export const HARDENED_NAME = 'H-NanoKVM';
export const HARDENED_SHORT_NAME = 'H-NanoKVM';
export const HARDENED_VERSION = 'beta 2.0.4';
// Light-text lockup for the dark login page; hardened-logo.svg is the dark-text one for light pages.
export const HARDENED_LOGO_SRC = '/hardened-logo-dark.svg';
// The gear emblem alone, on a transparent background, for the dark menu bar.
export const HARDENED_MARK_SRC = '/hardened-mark.svg';

export function formatHardenedVersion(version?: string) {
  const value = version?.trim();
  if (!value) return HARDENED_VERSION;
  const lower = value.toLowerCase();
  if (lower.startsWith('alfa') || lower.startsWith('alpha') || lower.startsWith('beta')) {
    return value;
  }
  if (value.startsWith('2.')) {
    return `beta ${value}`;
  }
  return `beta - ${value}`;
}
