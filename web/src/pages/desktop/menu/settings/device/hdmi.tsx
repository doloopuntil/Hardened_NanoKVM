import { useState } from 'react';
import { InputNumber, Switch } from 'antd';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { isHdmiEnabledAtom } from '@/jotai/screen.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';

export const Hdmi = () => {
  const { t } = useTranslation();

  const [isHdmiEnabled, setIsHdmiEnabled] = useAtom(isHdmiEnabledAtom);

  const [isPcie, setIsPcie] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idleTimeout, setIdleTimeout] = useState(0);
  const [idleTimeoutInput, setIdleTimeoutInput] = useState<number | null>(0);
  const [isIdleTimeoutLoading, setIsIdleTimeoutLoading] = useState(false);

  const isHardwareReady = useSettingsLoad(api.getHardware, (rsp) => {
    setIsPcie(rsp.data?.version === 'PCIE');
  });

  const isStateReady = useSettingsLoad(api.getHdmiState, (rsp) => {
    setIsHdmiEnabled(rsp.data.enabled);
    const timeout = rsp.data.idleTimeout ?? 0;
    setIdleTimeout(timeout);
    setIdleTimeoutInput(timeout);
  });

  const isReady = isHardwareReady && isStateReady;

  function updateIdleTimeout() {
    if (
      isIdleTimeoutLoading ||
      idleTimeoutInput === null ||
      idleTimeoutInput < 0 ||
      idleTimeoutInput === idleTimeout
    ) {
      return;
    }

    setIsIdleTimeoutLoading(true);
    attempt(() => api.setHdmiIdleTimeout(idleTimeoutInput))
      .then((rsp) => {
        if (!rsp) {
          setIdleTimeoutInput(idleTimeout);
          return;
        }

        setIdleTimeout(idleTimeoutInput);
      })
      .finally(() => {
        setIsIdleTimeoutLoading(false);
      });
  }

  async function setHdmiState() {
    if (isLoading) return;
    setIsLoading(true);

    const enabled = !isHdmiEnabled;

    const rsp = await attempt(() => api.setHdmiState(enabled));
    if (!rsp) {
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setIsHdmiEnabled(enabled);
      setIsLoading(false);
    }, 1000);
  }

  return (
    <>
      {isPcie && (
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between gap-x-4">
            <div className="flex flex-col space-y-1">
              <span>HDMI</span>

              <span className="text-xs text-neutral-500">
                {t('settings.device.hdmi.description')}
              </span>
            </div>

            <Switch
              checked={isHdmiEnabled}
              loading={isLoading}
              disabled={!isReady}
              onChange={setHdmiState}
            />
          </div>

          <div className="flex items-center justify-between gap-x-4">
            <div className="flex flex-col space-y-1">
              <span>{t('settings.device.hdmi.idleTimeoutTitle')}</span>
              <span className="text-xs text-neutral-500">
                {t('settings.device.hdmi.idleTimeoutDescription')}
              </span>
            </div>

            <InputNumber
              className="w-40 shrink-0 [&_.ant-input-number-input]:!text-right"
              min={0}
              max={10080}
              precision={0}
              value={idleTimeoutInput}
              addonAfter={t('settings.device.minutes')}
              disabled={isIdleTimeoutLoading || !isReady}
              onChange={setIdleTimeoutInput}
              onBlur={updateIdleTimeout}
              onPressEnter={updateIdleTimeout}
            />
          </div>
        </div>
      )}
    </>
  );
};
