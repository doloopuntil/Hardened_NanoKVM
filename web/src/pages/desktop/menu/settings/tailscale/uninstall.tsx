import { useState } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/extensions/tailscale.ts';
import { attempt, confirm } from '@/lib/feedback.ts';

type UninstallProps = {
  onSuccess: () => void;
};

export const Uninstall = ({ onSuccess }: UninstallProps) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  function uninstall() {
    if (isLoading) return;
    setIsLoading(true);

    return attempt(() => api.uninstall()).finally(() => {
      setIsLoading(false);
      onSuccess();
    });
  }

  function confirmUninstall() {
    confirm({
      danger: true,
      title: t('settings.tailscale.uninstall'),
      content: t('settings.tailscale.uninstallDesc'),
      okText: t('settings.tailscale.uninstall'),
      onOk: uninstall
    });
  }

  return (
    <Button danger loading={isLoading} onClick={confirmUninstall}>
      {t('settings.tailscale.uninstall')}
    </Button>
  );
};
