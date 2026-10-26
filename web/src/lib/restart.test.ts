import { afterEach, describe, expect, it, vi } from 'vitest';

import { waitForRestart } from './restart.ts';

// a clock that advances by what is slept, so the polling runs without waiting
function fakeClock() {
  let now = 0;
  return {
    now: () => now,
    sleep: async (ms: number) => {
      now += ms;
    }
  };
}

function answers(...replies: (string | undefined)[]) {
  const queue = [...replies];
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => {
      const reply = queue.length > 1 ? queue.shift() : queue[0];
      if (reply === undefined) throw new Error('connection refused');
      return { ok: true, json: async () => ({ code: 0, data: { current: reply } }) };
    })
  );
  return vi.mocked(fetch);
}

afterEach(() => vi.unstubAllGlobals());

describe('waitForRestart', () => {
  it('returns once the server comes back after being down', async () => {
    const fetchMock = answers('2.1.0', undefined, undefined, '2.1.0');
    const clock = fakeClock();

    await waitForRestart('2.1.0', clock);

    expect(fetchMock).toHaveBeenCalledTimes(4);
    expect(clock.now()).toBe(4000);
  });

  it('returns at once when the server answers with another version', async () => {
    const fetchMock = answers('2.2.0');

    await waitForRestart('2.1.0', fakeClock());

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('stops after a quiet spell when the server never went away', async () => {
    answers('2.1.0');
    const clock = fakeClock();

    await waitForRestart('2.1.0', clock);

    expect(clock.now()).toBe(30000);
  });

  it('gives up when the server stays away', async () => {
    answers(undefined);
    const clock = fakeClock();

    await waitForRestart('2.1.0', clock);

    expect(clock.now()).toBe(180000);
  });

  it('does not take an unknown starting version for a change', async () => {
    answers('2.1.0');
    const clock = fakeClock();

    await waitForRestart('', clock);

    expect(clock.now()).toBe(30000);
  });
});
