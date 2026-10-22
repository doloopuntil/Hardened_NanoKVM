import { useEffect, useState } from 'react';

import { getMonitor, type MonitorData } from '@/api/vm.ts';

import { HISTORY_LENGTH, percent } from './scale';

const INTERVAL_MS = 1000;
// readings that failed in a row before the page says so
const FAILURES_BEFORE_NOTICE = 3;

export type MonitorState = {
  data?: MonitorData;
  temperatures: number[];
  memoryPercents: number[];
  unavailable: boolean;
};

const empty: MonitorState = { temperatures: [], memoryPercents: [], unavailable: false };

function push(values: number[], value: number | undefined): number[] {
  if (value === undefined) return values;
  return [...values, value].slice(-HISTORY_LENGTH);
}

// Polls once a second while the page is open and visible. The next request is only scheduled
// once the previous one has finished, so a slow device is never asked twice at the same time.
export function useMonitor(): MonitorState {
  const [state, setState] = useState<MonitorState>(empty);

  useEffect(() => {
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let failures = 0;

    async function tick() {
      if (!document.hidden) {
        try {
          const rsp = await getMonitor();
          if (stopped) return;
          if (rsp.code !== 0 || !rsp.data) throw new Error(rsp.msg);

          const data = rsp.data;
          failures = 0;
          setState((previous) => ({
            data,
            temperatures: push(previous.temperatures, data.temperatureC ?? undefined),
            memoryPercents: push(
              previous.memoryPercents,
              data.memory ? percent(data.memory.usedKb, data.memory.totalKb) : undefined
            ),
            unavailable: false
          }));
        } catch (err) {
          if (stopped) return;
          failures += 1;
          console.log(err);
          if (failures === FAILURES_BEFORE_NOTICE) {
            setState((previous) => ({ ...previous, unavailable: true }));
          }
        }
      }
      if (!stopped) timer = setTimeout(tick, INTERVAL_MS);
    }

    void tick();
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, []);

  return state;
}
