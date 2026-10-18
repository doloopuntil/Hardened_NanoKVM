import { Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import * as api from '@/api/auth.ts';
import { removeToken } from '@/lib/cookie.ts';
import { attempt } from '@/lib/feedback.ts';
import { usePopconfirmColor } from '@/hooks/usePopconfirmColor.ts';

export const Logout = () => {
  const { t } = useTranslation();
  const popconfirmColor = usePopconfirmColor();
  const navigate = useNavigate();

  function logout() {
    attempt(() => api.logout()).then((rsp) => {
      if (!rsp) return;

      removeToken();
      navigate('/auth/login');
    });
  }

  return (
    <Popconfirm
      color={popconfirmColor}
      placement="topRight"
      title={t('settings.account.logoutDesc')}
      okText={t('settings.account.okBtn')}
      cancelText={t('settings.account.cancelBtn')}
      onConfirm={logout}
    >
      <Button danger>{t('settings.account.logoutBtn')}</Button>
    </Popconfirm>
  );
};
