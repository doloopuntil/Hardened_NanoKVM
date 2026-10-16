import { useState } from 'react';
import { Select, Space, Switch, Tooltip } from 'antd';
import { CircleAlertIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';

// The size used when swap is switched on before a size has been chosen.
const DEFAULT_SIZE = '256';

export const Swap = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [size, setSize] = useState(DEFAULT_SIZE);

  const options = ['64', '128', '256', '512'].map((value) => ({ value, label: value }));

  const isReady = useSettingsLoad(api.getSwap, (rsp) => {
    if (rsp.data?.size) {
      setIsEnabled(true);
      setSize(rsp.data.size.toString());
    }
  });

  function apply(enabled: boolean, value: string) {
    if (isLoading) return;
    setIsLoading(true);

    attempt(() => api.setSwap(enabled ? parseInt(value) : 0))
      .then((rsp) => {
        if (!rsp) return;

        setIsEnabled(enabled);
        setSize(value);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="flex items-center justify-between gap-x-4">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <span>{t('settings.device.swap.title')}</span>

            <Tooltip
              title={t('settings.device.swap.tip')}
              className="cursor-pointer"
              placement="right"
              styles={{ root: { maxWidth: '400px' } }}
            >
              <CircleAlertIcon className="text-neutral-500" size={14} />
            </Tooltip>
          </div>
          <span className="text-xs text-neutral-500">{t('settings.device.swap.description')}</span>
        </div>

        <Switch
          checked={isEnabled}
          loading={isLoading}
          disabled={!isReady}
          onChange={(checked) => apply(checked, size)}
        />
      </div>

      <div className="flex items-center justify-between gap-x-4">
        <div className="flex flex-col space-y-1">
          <span>{t('settings.device.swap.size')}</span>
          <span className="text-xs text-neutral-500">
            {t('settings.device.swap.sizeDescription')}
          </span>
        </div>

        <Space.Compact className="shrink-0">
          <Select
            className="w-20 text-right"
            value={size}
            options={options}
            disabled={!isReady || !isEnabled || isLoading}
            onChange={(value) => apply(true, value)}
          />
          <Space.Addon className="w-12 text-center">MB</Space.Addon>
        </Space.Compact>
      </div>
    </>
  );
};
