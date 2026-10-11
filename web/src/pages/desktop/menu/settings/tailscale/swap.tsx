import { useState } from 'react';
import { Switch, Tooltip } from 'antd';
import { CircleHelpIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';

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
    <div className="flex h-[40px] cursor-pointer items-center justify-between space-x-6 rounded px-2 text-neutral-300 hover:bg-neutral-700/70">
      <div className="flex items-center space-x-1">
        <span>{t('settings.tailscale.swap.title')}</span>
        <Tooltip
          title={t('settings.tailscale.swap.tip')}
          className="cursor-pointer text-neutral-500"
          placement="top"
          styles={{ root: { maxWidth: '400px' } }}
        >
          <CircleHelpIcon size={15} />
        </Tooltip>
      </div>

      <Switch
        value={isEnabled}
        loading={isLoading}
        disabled={!isReady}
        size="small"
        onChange={update}
      />
    </div>
  );
};
