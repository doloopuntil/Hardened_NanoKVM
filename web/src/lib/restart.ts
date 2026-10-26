const POLL_MS = 1000;
const PROBE_TIMEOUT_MS = 2500;
// the server may restart faster than the polling sees, or not at all
const QUIET_UP_MS = 30 * 1000;
const GIVE_UP_MS = 3 * 60 * 1000;

type Clock = { now: () => number; sleep: (ms: number) => Promise<void> };

const realClock: Clock = {
  now: () => Date.now(),
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms))
};

async function probe(): Promise<string | undefined> {
  try {
    const rsp = await fetch('/api/application/current-version', {
      cache: 'no-store',
      signal: AbortSignal.timeout(PROBE_TIMEOUT_MS)
    });
    if (!rsp.ok) return undefined;
    const body = await rsp.json();
    return body?.code === 0 ? (body.data?.current ?? '') : undefined;
  } catch {
    return undefined;
  }
}

// Resolves once the server has restarted: it answered with another version than `before`, or it
// went away and came back. A restart too quick to see, or none at all, ends after a quiet spell,
// and a server that stays away ends after a few minutes; the caller reloads the page either way.
export async function waitForRestart(before: string, clock: Clock = realClock) {
  const start = clock.now();
  let wentDown = false;

  while (clock.now() - start < GIVE_UP_MS) {
    await clock.sleep(POLL_MS);

    const version = await probe();
    if (version === undefined) {
      wentDown = true;
    } else if (wentDown || (before !== '' && version !== before)) {
      return;
    } else if (clock.now() - start >= QUIET_UP_MS) {
      return;
    }
  }
}
