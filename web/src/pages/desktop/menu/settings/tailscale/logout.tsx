import { useState } from 'react';
import { Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/extensions/tailscale.ts';
import { attempt } from '@/lib/feedback.ts';

type LogoutProps = {
  onSuccess: () => void;
};

export const Logout = ({ onSuccess }: LogoutProps) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  async function logout() {
    if (isLoading) return;
    setIsLoading(true);

    const rsp = await attempt(() => api.logout());
    if (rsp) onSuccess();

    setIsLoading(false);
  }

  return (
    <Popconfirm
      placement="topRight"
      title={t('settings.tailscale.logoutDesc')}
      okText={t('settings.tailscale.okBtn')}
      cancelText={t('settings.tailscale.cancelBtn')}
      onConfirm={logout}
    >
      <Button danger loading={isLoading}>
        {t('settings.tailscale.logout')}
      </Button>
    </Popconfirm>
  );
};
