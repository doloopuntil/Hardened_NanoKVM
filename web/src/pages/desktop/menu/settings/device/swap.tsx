import { useState } from 'react';
import { Select, Tooltip } from 'antd';
import { CircleAlertIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';

export const Swap = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState('0');

  const options = [
    { value: '0', label: t('settings.device.swap.disable') },
    { value: '64', label: '64 MB' },
    { value: '128', label: '128 MB' },
    { value: '256', label: '256 MB' },
    { value: '512', label: '512 MB' }
  ];

  const isReady = useSettingsLoad(api.getSwap, (rsp) => {
    if (rsp.data?.size) {
      setSize(rsp.data.size.toString());
    }
  });

  function update(value: string) {
    if (isLoading) return;
    setIsLoading(true);

    attempt(() => api.setSwap(parseInt(value)))
      .then((rsp) => {
        if (!rsp) return;

        setSize(value);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
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

      <Select
        style={{ width: 150 }}
        value={size}
        options={options}
        loading={isLoading}
        disabled={!isReady}
        onChange={update}
      />
    </div>
  );
};
