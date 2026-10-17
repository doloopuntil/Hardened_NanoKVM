import { useState } from 'react';
import { Select, Space } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { getCsrfToken, setCsrfToken } from '@/lib/cookie.ts';
import { attempt } from '@/lib/feedback.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';
import { SettingRow } from '@/components/setting-rows.tsx';

const DEFAULT_DURATION = '900';

export const SessionLock = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(DEFAULT_DURATION);

  // the durations in seconds, shown in minutes beside a fixed unit label
  const options = [300, 900, 1800, 3600].map((seconds) => ({
    value: seconds.toString(),
    label: (seconds / 60).toString()
  }));

  const isReady = useSettingsLoad(api.getSessionLock, (rsp) => {
    const value = rsp.data?.duration?.toString();
    if (value) {
      setDuration(value);
    }
  });

  function update(value: string) {
    if (isLoading) return;
    setIsLoading(true);

    attempt(() => api.setSessionLock(parseInt(value)))
      .then((rsp) => {
        if (!rsp) return;

        setDuration(value);
        const expiresAt = rsp.data?.expiresAt;
        const csrfToken = getCsrfToken();
        if (expiresAt && csrfToken) {
          setCsrfToken(csrfToken, expiresAt);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <SettingRow
      label={t('settings.device.sessionLock.title')}
      description={t('settings.device.sessionLock.description')}
      inline
    >
      <Space.Compact>
        <Select
          className="w-20 text-right"
          value={duration}
          options={options}
          loading={isLoading}
          disabled={!isReady}
          onChange={update}
        />
        <Space.Addon className="w-12 text-center">{t('settings.device.minutes')}</Space.Addon>
      </Space.Compact>
    </SettingRow>
  );
};
