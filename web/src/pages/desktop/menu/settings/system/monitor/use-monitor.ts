import { useEffect, useState } from 'react';

import { getMonitor, type MonitorData } from '@/api/vm.ts';

import { applySamples, emptyHistory, type History } from './history';

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

// Polls once a second while the page is open and visible. The server keeps the last five
// minutes of readings, so the first answer fills the graphs and each later one adds only what
// is new. The next request is only scheduled once the previous one has finished, so a slow
// device is never asked twice at the same time.
export function useMonitor(): MonitorState {
  const [state, setState] = useState<MonitorState>(empty);

  useEffect(() => {
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let failures = 0;
    let history: History = emptyHistory;

    async function tick() {
      if (!document.hidden) {
        try {
          const rsp =
            history.epoch === undefined
              ? await getMonitor()
              : await getMonitor(history.lastSeq, history.epoch);
          if (stopped) return;
          if (rsp.code !== 0 || !rsp.data) throw new Error(rsp.msg);

          const data = rsp.data;
          failures = 0;
          history = applySamples(history, data.epoch, data.latestSeq, data.samples);
          const { temperatures, memoryPercents } = history;
          setState({ data, temperatures, memoryPercents, unavailable: false });
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
