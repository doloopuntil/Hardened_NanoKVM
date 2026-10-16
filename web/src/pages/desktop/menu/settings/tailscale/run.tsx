import { useState } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/extensions/tailscale.ts';
import { attempt } from '@/lib/feedback.ts';
import { SettingSection } from '@/components/setting-rows.tsx';

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
    <SettingSection
      title={t('settings.network.connection')}
      description={t('settings.tailscale.notRunning')}
    >
      <div className="flex justify-end">
        <Button type="primary" loading={isLoading} onClick={run}>
          {t('settings.tailscale.run')}
        </Button>
      </div>
    </SettingSection>
  );
};
