import { describe, expect, it } from 'vitest';

import { formatBytes, formatMegabytes, percent, temperatureAxis, toneFor } from './scale';

describe('toneFor', () => {
  it('switches at the marks', () => {
    expect(toneFor(84.9, 85, 105)).toBe('normal');
    expect(toneFor(85, 85, 105)).toBe('warn');
    expect(toneFor(105, 85, 105)).toBe('crit');
    expect(toneFor(undefined, 85, 105)).toBe('normal');
  });
});

describe('temperatureAxis', () => {
  it('keeps a window of at least 10 degrees around a steady reading', () => {
    const axis = temperatureAxis([54.5, 54.6, 54.7]);
    expect(axis.max - axis.min).toBeGreaterThanOrEqual(10);
    expect(axis.min).toBeLessThan(54.5);
    expect(axis.max).toBeGreaterThan(54.7);
    expect(axis.ticks).toContain(60);
  });

  it('labels the vendor marks only when they are in view', () => {
    expect(temperatureAxis([50, 52]).ticks).not.toContain(85);
    const hot = temperatureAxis([80, 96]);
    expect(hot.ticks).toContain(85);
    expect(hot.ticks).not.toContain(90);
    expect(hot.ticks).toEqual([...hot.ticks].sort((a, b) => b - a));
  });

  it('has a window before the first reading', () => {
    const axis = temperatureAxis([]);
    expect(axis.max).toBeGreaterThan(axis.min);
  });
});

describe('formatting', () => {
  it('keeps percentages in range', () => {
    expect(percent(50, 200)).toBe(25);
    expect(percent(5, 0)).toBe(0);
    expect(percent(300, 200)).toBe(100);
  });

  it('formats sizes', () => {
    expect(formatMegabytes(112144)).toBe('110 MB');
    expect(formatBytes(3.6 * 1024 ** 3)).toBe('3.6 GB');
    expect(formatBytes(512 * 1024 ** 2)).toBe('512 MB');
  });
});
