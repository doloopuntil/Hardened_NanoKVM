import { useState } from 'react';
import { Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';
import { SettingRow } from '@/components/setting-rows.tsx';

export const Memory = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const isReady = useSettingsLoad(api.getMemoryLimit, (rsp) => {
    setIsEnabled(!!rsp.data.enabled);
  });

  function update() {
    if (isLoading) return;
    setIsLoading(true);

    const enabled = !isEnabled;
    const limit = isEnabled ? 0 : 75;

    attempt(() => api.setMemoryLimit(enabled, limit))
      .then((rsp) => {
        if (!rsp) return;

        setIsEnabled(enabled);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <SettingRow
      label={t('settings.tailscale.memory.title')}
      description={t('settings.tailscale.memory.tip')}
      isSwitch
    >
      <Switch checked={isEnabled} loading={isLoading} disabled={!isReady} onClick={update} />
    </SettingRow>
  );
};
