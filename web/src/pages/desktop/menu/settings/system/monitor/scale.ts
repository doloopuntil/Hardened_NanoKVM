export type Tone = 'normal' | 'warn' | 'crit';

// Datasheet Table 2-5: the recommended junction temperature tops out between 85 and 105 C.
export const TEMP_WARN_C = 85;
export const TEMP_CRIT_C = 105;
// No vendor figure exists for memory, so these are our own marks.
export const MEMORY_WARN_PERCENT = 80;
export const MEMORY_CRIT_PERCENT = 90;
// The only core is busy all the time while the video streams, so the marks sit near the top.
export const CPU_WARN_PERCENT = 90;
export const CPU_CRIT_PERCENT = 95;

// How many one-second readings the sparklines keep: five minutes.
export const HISTORY_LENGTH = 300;

export function toneFor(value: number | undefined, warn: number, crit: number): Tone {
  if (value === undefined) return 'normal';
  if (value >= crit) return 'crit';
  if (value >= warn) return 'warn';
  return 'normal';
}

export type Axis = { min: number; max: number; ticks: number[] };

// A window around the readings that is at least 10 degrees tall, with a label on every multiple
// of 10 and on the warning marks that fall inside it.
export function temperatureAxis(values: number[]): Axis {
  const low = values.length ? Math.min(...values) : 40;
  const high = values.length ? Math.max(...values) : 60;
  const pad = Math.max(0, (10 - (high - low)) / 2) + 1;
  const min = Math.floor(low - pad);
  const max = Math.ceil(high + pad);

  // the warning marks win over a multiple of 10 that would sit on top of them
  const ticks = [TEMP_WARN_C, TEMP_CRIT_C].filter((mark) => mark >= min && mark <= max);
  for (let value = Math.ceil(min / 10) * 10; value <= max; value += 10) {
    if (ticks.every((tick) => Math.abs(tick - value) >= 6)) ticks.push(value);
  }
  return { min, max, ticks: ticks.sort((a, b) => b - a) };
}

export const percentAxis: Axis = { min: 0, max: 100, ticks: [100, 50, 0] };

export function percent(used: number, total: number): number {
  return total > 0 ? Math.min(100, Math.max(0, (used / total) * 100)) : 0;
}

export function formatMegabytes(kb: number): string {
  return `${Math.round(kb / 1024)} MB`;
}

export function formatBytes(bytes: number): string {
  const gb = bytes / 1024 ** 3;
  if (gb >= 1) return `${gb.toFixed(1)} GB`;
  return `${Math.round(bytes / 1024 ** 2)} MB`;
}

export const TONE_COLORS: Record<Tone, string> = {
  normal: '#4096ff',
  warn: '#faad14',
  crit: '#ff4d4f'
};

// The two shares of the CPU load bar; teal stays apart from the blue of the other bars.
export const CPU_USER_COLOR = 'bg-blue-600';
export const CPU_SYSTEM_COLOR = 'bg-teal-600';

export const VALUE_COLORS: Record<Tone, string> = {
  normal: 'text-neutral-200',
  warn: 'text-amber-400',
  crit: 'text-red-400'
};
