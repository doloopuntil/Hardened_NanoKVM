import { useState } from 'react';
import { Select, Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { setMouseJiggler } from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';

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

  function enable() {
    if (isLoading) return;
    setIsLoading(true);

    attempt(() => api.setMouseJiggler(true, mode))
      .then((rsp) => {
        if (!rsp) return;

        setEnabled(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

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
    <div className="flex items-center justify-between gap-x-4">
      <div className="flex flex-col space-y-1">
        <span>{t('settings.device.mouseJiggler.title')}</span>
        <span className="text-xs text-neutral-500">
          {t('settings.device.mouseJiggler.description')}
        </span>
      </div>

      {enabled ? (
        <Select
          className="w-40 shrink-0 text-right"
          value={mode}
          options={options}
          loading={isLoading}
          disabled={!isReady}
          onChange={updateMode}
        />
      ) : (
        <Switch checked={enabled} loading={isLoading} disabled={!isReady} onChange={enable} />
      )}
    </div>
  );
};
