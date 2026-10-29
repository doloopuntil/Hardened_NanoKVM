export function formatBytes(bytes: number) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
}

export function isAllowedImageName(name: string) {
  const lower = name.toLowerCase();
  return lower.endsWith('.iso') || lower.endsWith('.img');
}

// empty means no check
export function isValidSha256(value: string) {
  const checksum = value.trim();
  return !checksum || /^[a-fA-F0-9]{64}$/.test(checksum);
}

export function parseJson(raw: string): { code?: number; msg?: string } | null {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
