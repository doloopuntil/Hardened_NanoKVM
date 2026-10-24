import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';
import { InfoRow } from '@/components/setting-rows.tsx';

const DASH = '-';

const OverdriveTag = ({ text }: { text: string }) => (
  <span className="ml-2 rounded border border-solid border-orange-900 px-1.5 text-[11px] text-orange-400">
    {text}
  </span>
);

// The clocks the device booted with. The boot fixes them, so they are read once.
export const Clocks = () => {
  const { t } = useTranslation();
  const [cpuMhz, setCpuMhz] = useState<number | null>(null);
  const [videoMhz, setVideoMhz] = useState<number | null>(null);
  const [overdrive, setOverdrive] = useState(false);

  useSettingsLoad(api.getMonitor, (rsp) => {
    setCpuMhz(rsp.data?.cpuMhz ?? null);
    setVideoMhz(rsp.data?.videoMhz ?? null);
    setOverdrive(!!rsp.data?.overdrive);
  });

  const tag = overdrive ? <OverdriveTag text={t('settings.system.monitor.overdrive')} /> : null;

  return (
    <>
      <InfoRow
        label={
          <>
            {t('settings.system.monitor.processorClock')}
            {tag}
          </>
        }
        description={t('settings.system.monitor.cpuClockCaption')}
        value={cpuMhz !== null ? `${cpuMhz} MHz` : DASH}
      />
      <InfoRow
        label={
          <>
            {t('settings.system.monitor.videoClock')}
            {tag}
          </>
        }
        description={t('settings.system.monitor.videoClockCaption')}
        value={videoMhz !== null ? `${videoMhz} MHz` : DASH}
      />
    </>
  );
};
