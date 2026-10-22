import { useState } from 'react';
import { Select, Space, Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { getCsrfToken, setCsrfToken } from '@/lib/cookie.ts';
import { attempt } from '@/lib/feedback.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';
import { SettingRow } from '@/components/setting-rows.tsx';

const DEFAULT_DURATION = '900';

// the durations in seconds, shown in minutes beside a fixed unit label
const options = [300, 900, 1800, 3600].map((seconds) => ({
  value: seconds.toString(),
  label: (seconds / 60).toString()
}));

export const SessionSettings = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(DEFAULT_DURATION);
  const [logoutOnClose, setLogoutOnClose] = useState(false);

  const isReady = useSettingsLoad(api.getSessionLock, (rsp) => {
    const value = rsp.data?.duration?.toString();
    if (value) {
      setDuration(value);
    }
    setLogoutOnClose(!!rsp.data?.logoutOnBrowserClose);
  });

  // the CSRF cookie has to follow the session cookie when its lifetime changes
  function followSession(rsp: any, sessionOnly: boolean) {
    const expiresAt = rsp.data?.expiresAt;
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      setCsrfToken(csrfToken, expiresAt, sessionOnly);
    }
  }

  function updateDuration(value: string) {
    if (isLoading) return;
    setIsLoading(true);

    attempt(() => api.setSessionLock(parseInt(value)))
      .then((rsp) => {
        if (!rsp) return;

        setDuration(value);
        followSession(rsp, logoutOnClose);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function updateLogoutOnClose(enabled: boolean) {
    if (isLoading) return;
    setIsLoading(true);

    attempt(() => api.setLogoutOnBrowserClose(enabled))
      .then((rsp) => {
        if (!rsp) return;

        setLogoutOnClose(enabled);
        followSession(rsp, enabled);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <SettingRow
        label={t('settings.account.logoutOnClose.title')}
        description={t('settings.account.logoutOnClose.description')}
        isSwitch
      >
        <Switch
          checked={logoutOnClose}
          loading={isLoading}
          disabled={!isReady}
          onChange={updateLogoutOnClose}
        />
      </SettingRow>

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
            onChange={updateDuration}
          />
          <Space.Addon className="w-12 text-center">{t('settings.device.minutes')}</Space.Addon>
        </Space.Compact>
      </SettingRow>
    </>
  );
};
