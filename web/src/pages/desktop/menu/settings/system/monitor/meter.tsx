import type { ReactNode } from 'react';

import type { Tone } from './scale';

const BAR_COLORS: Record<Tone, string> = {
  normal: 'bg-blue-600',
  warn: 'bg-amber-500',
  crit: 'bg-red-500'
};

// A labelled value with a bar under it. Blocks of the same kind share a height on wide screens,
// so the two columns of the page line up.
export const Meter = ({
  label,
  caption,
  value,
  percent,
  tone = 'normal'
}: {
  label: string;
  caption: string;
  value: string;
  percent: number;
  tone?: Tone;
}) => (
  <div className="flex min-w-0 flex-col md:min-h-14">
    <div className="flex items-end justify-between gap-4">
      <div className="flex min-w-0 flex-col space-y-0.5">
        <span className="text-sm text-neutral-300">{label}</span>
        <span className="break-words text-xs text-neutral-500">{caption}</span>
      </div>
      <div className="shrink-0 whitespace-nowrap text-[15px] tabular-nums text-neutral-200">
        {value}
      </div>
    </div>
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(percent)}
      className="mt-2 h-2 overflow-hidden rounded bg-neutral-700/60"
    >
      <div className={`h-full rounded ${BAR_COLORS[tone]}`} style={{ width: `${percent}%` }} />
    </div>
  </div>
);

// A value on the right with a label and caption on the left; `extra` sits after the label.
export const ReadingRow = ({
  label,
  caption,
  value,
  unit,
  extra
}: {
  label: string;
  caption: string;
  value: string;
  unit?: string;
  extra?: ReactNode;
}) => (
  <div className="flex min-w-0 flex-col md:min-h-14">
    <div className="flex items-end justify-between gap-4">
      <div className="flex min-w-0 flex-col space-y-0.5">
        <span className="text-sm text-neutral-300">
          {label}
          {extra}
        </span>
        <span className="break-words text-xs text-neutral-500">{caption}</span>
      </div>
      <div className="shrink-0 whitespace-nowrap text-[15px] tabular-nums text-neutral-200">
        {value}
        {unit && <small className="ml-0.5 text-xs text-neutral-500">{unit}</small>}
      </div>
    </div>
  </div>
);
