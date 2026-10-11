import { useState } from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';

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

  return (
    <div className="flex justify-center pt-3">
      <Popconfirm
        placement="bottom"
        title={t('settings.device.rebootDesc')}
        okText={t('settings.device.okBtn')}
        cancelText={t('settings.device.cancelBtn')}
        onConfirm={reboot}
      >
        <Button
          danger
          type="primary"
          size="large"
          shape="round"
          loading={isLoading}
          icon={<ReloadOutlined />}
        >
          {t('settings.device.reboot')}
        </Button>
      </Popconfirm>
    </div>
  );
};
