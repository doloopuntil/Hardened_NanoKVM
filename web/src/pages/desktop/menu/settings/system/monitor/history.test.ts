import { describe, expect, it } from 'vitest';

import { applySamples, emptyHistory, type Sample } from './history';
import { HISTORY_LENGTH } from './scale';

function samples(from: number, to: number): Sample[] {
  const list: Sample[] = [];
  for (let seq = from; seq <= to; seq++) {
    list.push({ seq, temperatureC: 50 + seq, memoryPercent: 40 });
  }
  return list;
}

describe('applySamples', () => {
  it('fills the lines at once from the first answer', () => {
    const history = applySamples(emptyHistory, 7, 300, samples(1, 300));
    expect(history.temperatures).toHaveLength(HISTORY_LENGTH);
    expect(history.lastSeq).toBe(300);
  });

  it('adds only the new samples afterwards', () => {
    let history = applySamples(emptyHistory, 7, 3, samples(1, 3));
    history = applySamples(history, 7, 5, samples(4, 5));
    expect(history.temperatures).toEqual([51, 52, 53, 54, 55]);
    // a repeated answer changes nothing
    expect(applySamples(history, 7, 5, samples(4, 5)).temperatures).toHaveLength(5);
  });

  it('keeps five minutes and scrolls', () => {
    let history = applySamples(emptyHistory, 7, 300, samples(1, 300));
    history = applySamples(history, 7, 302, samples(301, 302));
    expect(history.temperatures).toHaveLength(HISTORY_LENGTH);
    expect(history.temperatures[0]).toBe(53);
    expect(history.temperatures[history.temperatures.length - 1]).toBe(352);
  });

  it('starts over when the server restarted', () => {
    let history = applySamples(emptyHistory, 7, 100, samples(1, 100));
    history = applySamples(history, 8, 4, samples(1, 4));
    expect(history.temperatures).toEqual([51, 52, 53, 54]);
    expect(history.epoch).toBe(8);
  });

  it('skips readings the device could not take', () => {
    const history = applySamples(emptyHistory, 7, 2, [
      { seq: 1, temperatureC: null, memoryPercent: 40 },
      { seq: 2, temperatureC: 55, memoryPercent: null }
    ]);
    expect(history.temperatures).toEqual([55]);
    expect(history.memoryPercents).toEqual([40]);
  });
});
