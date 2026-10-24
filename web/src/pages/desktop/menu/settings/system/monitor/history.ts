import { HISTORY_LENGTH } from './scale';

export type Sample = {
  seq: number;
  temperatureC: number | null;
  memoryPercent: number | null;
  swapPercent: number | null;
  cpuPercent: number | null;
};

export type History = {
  // which run of the server the readings come from
  epoch?: number;
  lastSeq: number;
  temperatures: number[];
  memoryPercents: number[];
  swapPercents: number[];
  cpuPercents: number[];
};

export const emptyHistory: History = {
  lastSeq: 0,
  temperatures: [],
  memoryPercents: [],
  swapPercents: [],
  cpuPercents: []
};

function keepNewest(values: number[]): number[] {
  return values.length > HISTORY_LENGTH ? values.slice(-HISTORY_LENGTH) : values;
}

// Adds the samples the server sent. The server sends everything when the page has nothing yet
// or when it restarted, so a change of run starts the lines over.
export function applySamples(
  history: History,
  epoch: number,
  latestSeq: number,
  samples: Sample[]
): History {
  const base =
    (history.epoch !== undefined && history.epoch !== epoch) || latestSeq < history.lastSeq
      ? emptyHistory
      : history;

  const fresh = samples.filter((sample) => sample.seq > base.lastSeq);
  if (fresh.length === 0) return { ...base, epoch, lastSeq: Math.max(base.lastSeq, 0) };

  const temperatures = [...base.temperatures];
  const memoryPercents = [...base.memoryPercents];
  const swapPercents = [...base.swapPercents];
  const cpuPercents = [...base.cpuPercents];
  for (const sample of fresh) {
    if (sample.temperatureC !== null) temperatures.push(sample.temperatureC);
    if (sample.memoryPercent !== null) memoryPercents.push(sample.memoryPercent);
    if (sample.swapPercent !== null) swapPercents.push(sample.swapPercent);
    if (sample.cpuPercent !== null) cpuPercents.push(sample.cpuPercent);
  }

  return {
    epoch,
    lastSeq: fresh[fresh.length - 1].seq,
    temperatures: keepNewest(temperatures),
    memoryPercents: keepNewest(memoryPercents),
    swapPercents: keepNewest(swapPercents),
    cpuPercents: keepNewest(cpuPercents)
  };
}
