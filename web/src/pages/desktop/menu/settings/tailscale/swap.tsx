import { useState } from 'react';
import { Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';
import { LabelTip } from '@/components/label-tip.tsx';
import { SettingRow } from '@/components/setting-rows.tsx';

export const Swap = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const isReady = useSettingsLoad(api.getSwap, (rsp) => {
    setIsEnabled(rsp.data?.size > 0);
  });

  function update(enable: boolean) {
    if (isLoading) return;
    setIsLoading(true);

    const size = enable ? 128 : 0;

    attempt(() => api.setSwap(size))
      .then((rsp) => {
        if (!rsp) return;

        setIsEnabled(enable);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <SettingRow
      label={
        <LabelTip
          text={t('settings.tailscale.swap.title')}
          tip={t('settings.tailscale.swap.sizeTip')}
        />
      }
      description={t('settings.tailscale.swap.tip')}
      isSwitch
    >
      <Switch checked={isEnabled} loading={isLoading} disabled={!isReady} onChange={update} />
    </SettingRow>
  );
};
