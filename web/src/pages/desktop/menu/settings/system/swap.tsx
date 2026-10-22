import { useState } from 'react';
import { Select, Space, Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';
import { LabelTip } from '@/components/label-tip.tsx';
import { SettingRow } from '@/components/setting-rows.tsx';

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
      <SettingRow
        label={
          <LabelTip
            text={t('settings.device.swap.title')}
            tip={t('settings.device.swap.tip')}
            warning
          />
        }
        description={t('settings.device.swap.description')}
        isSwitch
      >
        <Switch
          checked={isEnabled}
          loading={isLoading}
          disabled={!isReady}
          onChange={(checked) => apply(checked, size)}
        />
      </SettingRow>

      <SettingRow
        label={t('settings.device.swap.size')}
        description={t('settings.device.swap.sizeDescription')}
        inline
      >
        <Space.Compact>
          <Select
            className="w-20 text-right"
            value={size}
            options={options}
            disabled={!isReady || !isEnabled || isLoading}
            onChange={(value) => apply(true, value)}
          />
          <Space.Addon className="w-12 text-center">MB</Space.Addon>
        </Space.Compact>
      </SettingRow>
    </>
  );
};
