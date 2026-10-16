import { useState } from 'react';
import { Select, Space, Switch } from 'antd';
import { ScreenShareOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';

// The device stores the timeout in seconds, with 0 for an OLED that never turns off. The menu
// shows minutes: 0.5, 1, 2, 3, 5, 10, 15, 20, 30 and 60.
const TIMEOUTS = [30, 60, 120, 180, 300, 600, 900, 1200, 1800, 3600];
const DEFAULT_TIMEOUT = 60;

export const Oled = () => {
  const { t } = useTranslation();

  const [isOLEDExist, setIsOLEDExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [keepOn, setKeepOn] = useState(false);
  const [timeout, setTimeoutSeconds] = useState(DEFAULT_TIMEOUT);

  const isReady = useSettingsLoad(api.getOLED, (rsp) => {
    if (!rsp.data.exist) return;

    setIsOLEDExist(true);
    const sleep: number = rsp.data.sleep;
    if (sleep === 0) {
      setKeepOn(true);
    } else {
      setTimeoutSeconds(sleep);
    }
  });

  // a value saved by an older version that is not in the list still shows as it is
  const options = (TIMEOUTS.includes(timeout) ? TIMEOUTS : [...TIMEOUTS, timeout])
    .sort((a, b) => a - b)
    .map((seconds) => ({ value: seconds.toString(), label: (seconds / 60).toString() }));

  function apply(seconds: number, onDone: () => void) {
    if (isLoading) return;
    setIsLoading(true);

    attempt(() => api.setOLED(seconds))
      .then((rsp) => {
        if (rsp) onDone();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  if (!isOLEDExist) {
    return (
      <div className="flex items-center justify-between gap-x-4">
        <div className="flex flex-col space-y-1">
          <span>{t('settings.device.oled.title')}</span>
          <span className="text-xs text-neutral-500">{t('settings.device.oled.description')}</span>
        </div>

        <span className="text-neutral-500">
          <ScreenShareOff size={16} />
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between gap-x-4">
        <div className="flex flex-col space-y-1">
          <span>{t('settings.device.oled.keepOn')}</span>
          <span className="text-xs text-neutral-500">
            {t('settings.device.oled.keepOnDescription')}
          </span>
        </div>

        <Switch
          checked={keepOn}
          loading={isLoading}
          disabled={!isReady}
          onChange={(checked) => apply(checked ? 0 : timeout, () => setKeepOn(checked))}
        />
      </div>

      <div className="flex items-center justify-between gap-x-4">
        <div className="flex flex-col space-y-1">
          <span>{t('settings.device.oled.title')}</span>
          <span className="text-xs text-neutral-500">{t('settings.device.oled.description')}</span>
        </div>

        <Space.Compact className="shrink-0">
          <Select
            className="w-20 text-right"
            value={timeout.toString()}
            options={options}
            disabled={!isReady || keepOn || isLoading}
            onChange={(value) => apply(parseInt(value), () => setTimeoutSeconds(parseInt(value)))}
          />
          <Space.Addon className="w-12 text-center">{t('settings.device.minutes')}</Space.Addon>
        </Space.Compact>
      </div>
    </>
  );
};
