import { useState } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt, confirm } from '@/lib/feedback.ts';

export const Reboot = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  function reboot() {
    if (isLoading) return;
    setIsLoading(true);

    const timeoutId = setTimeout(() => {
      window.location.reload();
    }, 30000);

    attempt(() => api.reboot()).then((rsp) => {
      if (rsp) return;

      setIsLoading(false);
      clearTimeout(timeoutId);
    });
  }

  function confirmReboot() {
    confirm({
      danger: true,
      title: t('settings.device.reboot'),
      content: t('settings.device.rebootDesc'),
      okText: t('settings.device.reboot'),
      onOk: reboot
    });
  }

  return (
    <Button danger loading={isLoading} onClick={confirmReboot}>
      {t('settings.device.reboot')}
    </Button>
  );
};
