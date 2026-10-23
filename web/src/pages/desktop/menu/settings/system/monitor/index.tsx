import type { ReactNode } from 'react';
import { Divider } from 'antd';
import { useTranslation } from 'react-i18next';

import { SettingSection } from '@/components/setting-rows.tsx';

import { Meter, ReadingRow } from './meter';
import {
  formatBytes,
  formatMegabytes,
  MEMORY_CRIT_PERCENT,
  MEMORY_WARN_PERCENT,
  percent,
  percentAxis,
  TEMP_CRIT_C,
  TEMP_WARN_C,
  temperatureAxis,
  toneFor,
  VALUE_COLORS
} from './scale';
import { Sparkline } from './sparkline';
import { useMonitor } from './use-monitor';

const DASH = '-';

const OverdriveTag = ({ text }: { text: string }) => (
  <span className="ml-2 rounded border border-solid border-orange-900 px-1.5 text-[11px] text-orange-400">
    {text}
  </span>
);

// A reading with a history line under it; the value takes the colour of the line.
const History = ({
  label,
  caption,
  value,
  unit,
  tone,
  children
}: {
  label: string;
  caption: string;
  value: string;
  unit: string;
  tone: 'normal' | 'warn' | 'crit';
  children: ReactNode;
}) => (
  <div className="flex min-w-0 flex-col md:min-h-[104px]">
    <div className="flex items-end justify-between gap-4">
      <div className="flex min-w-0 flex-col space-y-0.5">
        <span className="text-sm text-neutral-300">{label}</span>
        <span className="break-words text-xs text-neutral-500">{caption}</span>
      </div>
      <div className={`shrink-0 whitespace-nowrap text-[15px] tabular-nums ${VALUE_COLORS[tone]}`}>
        {value}
        <small className="ml-0.5 text-xs text-neutral-500">{unit}</small>
      </div>
    </div>
    {children}
  </div>
);

export const Monitor = () => {
  const { t } = useTranslation();
  const { data, temperatures, memoryPercents, unavailable } = useMonitor();

  const temperature = data?.temperatureC ?? undefined;
  const temperatureTone = toneFor(temperature, TEMP_WARN_C, TEMP_CRIT_C);
  const memory = data?.memory;
  const memoryPercent = memory ? percent(memory.usedKb, memory.totalKb) : 0;
  const memoryTone = toneFor(memoryPercent, MEMORY_WARN_PERCENT, MEMORY_CRIT_PERCENT);
  const swapOn = !!memory && memory.swapTotalKb > 0;
  const disk = (mount: string) => data?.disks.find((item) => item.mount === mount);

  const tag = data?.overdrive ? (
    <OverdriveTag text={t('settings.system.monitor.overdrive')} />
  ) : null;

  function storage(mount: string, title: string, label: string) {
    const item = disk(mount);
    const used = item ? percent(item.usedBytes, item.totalBytes) : 0;
    return (
      <SettingSection title={title}>
        <Meter
          label={label}
          caption={
            item
              ? t('settings.system.monitor.percentUsed', { percent: Math.round(used) })
              : t('settings.system.monitor.unavailable')
          }
          value={
            item
              ? t('settings.system.monitor.sizeOf', {
                  used: formatBytes(item.usedBytes),
                  total: formatBytes(item.totalBytes)
                })
              : DASH
          }
          percent={used}
        />
      </SettingSection>
    );
  }

  return (
    <div className="flex min-w-0 flex-col space-y-6">
      {unavailable && (
        <div className="text-xs text-orange-400">{t('settings.system.monitor.noReadings')}</div>
      )}

      <div className="grid min-w-0 grid-cols-1 gap-x-14 gap-y-7 md:grid-cols-2">
        <SettingSection title={t('settings.system.performance.processor')}>
          <div className="flex min-w-0 flex-col gap-5">
            <ReadingRow
              label={t('settings.system.monitor.processorClock')}
              caption={t('settings.system.monitor.cpuClockCaption')}
              value={data?.cpuMhz != null ? `${data.cpuMhz}` : DASH}
              unit={data?.cpuMhz != null ? 'MHz' : undefined}
              extra={tag}
            />
            <ReadingRow
              label={t('settings.system.monitor.videoClock')}
              caption={t('settings.system.monitor.videoClockCaption')}
              value={data?.videoMhz != null ? `${data.videoMhz}` : DASH}
              unit={data?.videoMhz != null ? 'MHz' : undefined}
              extra={tag}
            />
            <History
              label={t('settings.system.monitor.temperature')}
              caption={t('settings.system.monitor.lastMinutes')}
              value={temperature !== undefined ? temperature.toFixed(1) : DASH}
              unit={temperature !== undefined ? '°C' : ''}
              tone={temperatureTone}
            >
              <Sparkline
                label={t('settings.system.monitor.temperature')}
                values={temperatures}
                axis={temperatureAxis(temperatures)}
                warn={TEMP_WARN_C}
                crit={TEMP_CRIT_C}
              />
            </History>
          </div>
        </SettingSection>

        <SettingSection title={t('settings.system.performance.memory')}>
          <div className="flex min-w-0 flex-col gap-5">
            <Meter
              label={t('settings.system.monitor.ram')}
              caption={t('settings.system.monitor.percent', {
                percent: Math.round(memoryPercent)
              })}
              value={
                memory
                  ? t('settings.system.monitor.sizeOf', {
                      used: formatMegabytes(memory.usedKb),
                      total: formatMegabytes(memory.totalKb)
                    })
                  : DASH
              }
              percent={memoryPercent}
              tone={memoryTone}
            />
            <Meter
              label={t('settings.device.swap.title')}
              caption={
                swapOn
                  ? t('settings.system.monitor.percent', {
                      percent: Math.round(percent(memory.swapUsedKb, memory.swapTotalKb))
                    })
                  : t('settings.system.monitor.off')
              }
              value={
                swapOn
                  ? t('settings.system.monitor.sizeOf', {
                      used: formatMegabytes(memory.swapUsedKb),
                      total: formatMegabytes(memory.swapTotalKb)
                    })
                  : DASH
              }
              percent={swapOn ? percent(memory.swapUsedKb, memory.swapTotalKb) : 0}
            />
            <History
              label={t('settings.system.monitor.ramHistory')}
              caption={t('settings.system.monitor.lastMinutes')}
              value={memory ? `${Math.round(memoryPercent)}` : DASH}
              unit={memory ? '%' : ''}
              tone={memoryTone}
            >
              <Sparkline
                label={t('settings.system.monitor.ramHistory')}
                values={memoryPercents}
                axis={percentAxis}
                warn={MEMORY_WARN_PERCENT}
                crit={MEMORY_CRIT_PERCENT}
              />
            </History>
          </div>
        </SettingSection>
      </div>

      <Divider className="opacity-50" />

      <div className="grid min-w-0 grid-cols-1 gap-x-14 gap-y-7 md:grid-cols-2">
        {storage('/', t('settings.system.monitor.systemPartition'), '/')}
        {storage('/data', t('settings.system.monitor.dataPartition'), '/data')}
      </div>

      <div className="text-xs text-neutral-500">{t('settings.system.monitor.refresh')}</div>
    </div>
  );
};
