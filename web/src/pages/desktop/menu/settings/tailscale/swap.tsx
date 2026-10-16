import { useState } from 'react';
import { Switch, Tooltip } from 'antd';
import { CircleHelpIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';
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

    const size = enable ? 256 : 0;

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
        <span className="inline-flex items-center gap-1">
          {t('settings.tailscale.swap.title')}
          <Tooltip
            title={t('settings.tailscale.swap.sizeTip')}
            className="cursor-pointer text-neutral-500"
            placement="top"
            styles={{ root: { maxWidth: '400px' } }}
          >
            <CircleHelpIcon size={15} />
          </Tooltip>
        </span>
      }
      description={t('settings.tailscale.swap.tip')}
      isSwitch
    >
      <Switch checked={isEnabled} loading={isLoading} disabled={!isReady} onChange={update} />
    </SettingRow>
  );
};
