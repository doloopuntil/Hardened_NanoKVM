import { useState } from 'react';
import { Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';
import { InfoRow, SettingRow } from '@/components/setting-rows.tsx';

const REASON_KEYS = {
  'power-on': 'reasonPowerOn',
  restart: 'reasonRestart',
  watchdog: 'reasonWatchdog',
  overheat: 'reasonOverheat',
  unknown: 'reasonUnknown'
} as const;

export const Watchdog = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<api.WatchdogState | null>(null);

  const isReady = useSettingsLoad(api.getWatchdog, (rsp) => setState(rsp.data ?? null));

  function onChange(enabled: boolean) {
    if (isLoading) return;
    setIsLoading(true);

    attempt(() => api.setWatchdog(enabled))
      .then((rsp) => {
        if (!rsp) return;
        setState((previous) => (previous ? { ...previous, enabled, running: enabled } : previous));
      })
      .finally(() => setIsLoading(false));
  }

  const base = 'settings.system.performance.watchdog';
  const available = !!state?.available;
  const description = !isReady
    ? t(`${base}.description`)
    : !available
      ? t(`${base}.unavailable`)
      : state?.enabled && !state.running
        ? t(`${base}.notRunning`)
        : t(`${base}.description`);
  const reason = state?.lastRestart;

  return (
    <>
      <SettingRow label={t(`${base}.title`)} description={description} isSwitch>
        <Switch
          checked={!!state?.enabled && available}
          loading={isLoading}
          disabled={!isReady || !available}
          onChange={onChange}
        />
      </SettingRow>

      {reason && (
        <InfoRow
          label={t(`${base}.lastRestart`)}
          description={t(`${base}.lastRestartCaption`)}
          value={t(`${base}.${REASON_KEYS[reason]}`)}
        />
      )}
    </>
  );
};
