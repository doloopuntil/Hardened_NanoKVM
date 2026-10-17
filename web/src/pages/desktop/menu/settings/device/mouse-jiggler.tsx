import { useState } from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { setMouseJiggler } from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';
import { SettingRow } from '@/components/setting-rows.tsx';

export const MouseJiggler = () => {
  const { t } = useTranslation();

  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState('relative');
  const [isLoading, setIsLoading] = useState(false);

  const isReady = useSettingsLoad(api.getMouseJiggler, (rsp) => {
    setEnabled(rsp.data.enabled);
    setMode(rsp.data.mode);
  });

  const options = [
    { value: 'disable', label: t('settings.device.mouseJiggler.disable') },
    { value: 'relative', label: t('settings.device.mouseJiggler.relative') },
    { value: 'absolute', label: t('settings.device.mouseJiggler.absolute') }
  ];

  function updateMode(value: string) {
    if (isLoading) return;
    setIsLoading(true);

    const _enabled = value !== 'disable';
    const _mode = value === 'disable' ? 'relative' : value;

    attempt(() => setMouseJiggler(_enabled, _mode))
      .then((rsp) => {
        if (!rsp) return;

        setEnabled(_enabled);
        setMode(_mode);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <SettingRow
      label={t('settings.device.mouseJiggler.title')}
      description={t('settings.device.mouseJiggler.description')}
      inline
    >
      <Select
        className="w-40 text-right"
        value={enabled ? mode : 'disable'}
        options={options}
        loading={isLoading}
        disabled={!isReady}
        onChange={updateMode}
      />
    </SettingRow>
  );
};
