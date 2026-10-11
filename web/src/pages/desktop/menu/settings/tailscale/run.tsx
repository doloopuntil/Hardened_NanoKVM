import { useState } from 'react';
import { PauseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Result } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/extensions/tailscale.ts';
import { attempt } from '@/lib/feedback.ts';

type RunProps = {
  onSuccess: () => void;
};

export const Run = ({ onSuccess }: RunProps) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  function run() {
    if (isLoading) return;
    setIsLoading(true);

    attempt(() => api.start())
      .then((rsp) => {
        if (rsp) onSuccess();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Card>
      <Result
        icon={<PauseCircleOutlined />}
        subTitle={t('settings.tailscale.notRunning')}
        extra={
          <Button key="install" type="primary" loading={isLoading} onClick={run}>
            {t('settings.tailscale.run')}
          </Button>
        }
      />
    </Card>
  );
};
