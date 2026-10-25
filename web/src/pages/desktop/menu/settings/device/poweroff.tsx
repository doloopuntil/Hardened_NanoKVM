import { useState } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt, confirm } from '@/lib/feedback.ts';

export const Poweroff = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  // the device goes away, so the button keeps spinning once it has been told to
  function poweroff() {
    if (isLoading) return;
    setIsLoading(true);

    attempt(() => api.poweroff()).then((rsp) => {
      if (!rsp) setIsLoading(false);
    });
  }

  function confirmPoweroff() {
    confirm({
      danger: true,
      title: t('settings.device.poweroff'),
      content: t('settings.device.poweroffDesc'),
      okText: t('settings.device.poweroff'),
      onOk: poweroff
    });
  }

  return (
    <Button danger loading={isLoading} onClick={confirmPoweroff}>
      {t('settings.device.poweroff')}
    </Button>
  );
};
