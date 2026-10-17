import { useState } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/extensions/tailscale.ts';
import { attempt, confirm } from '@/lib/feedback.ts';

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

  function confirmLogout() {
    confirm({
      danger: true,
      title: t('settings.tailscale.logout'),
      content: t('settings.tailscale.logoutDesc'),
      okText: t('settings.tailscale.logout'),
      onOk: logout
    });
  }

  return (
    <Button danger loading={isLoading} onClick={confirmLogout}>
      {t('settings.tailscale.logout')}
    </Button>
  );
};
