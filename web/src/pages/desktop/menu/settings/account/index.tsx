import { useState } from 'react';
import { Button, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import * as api from '@/api/auth.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';
import { InfoRow, SettingRow, SettingSection } from '@/components/setting-rows.tsx';
import { TotpEnrollment } from '@/components/totp-enrollment.tsx';

import { Logout } from './logout.tsx';

type Props = {
  setIsLocked?: (locked: boolean) => void;
};

export const Account = ({ setIsLocked }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');

  useSettingsLoad(api.getAccount, (rsp) => setUsername(rsp.data.username));

  function changePassword() {
    navigate('/auth/password');
  }

  return (
    <>
      <div className="text-base">{t('settings.account.title')}</div>
      <Divider className="opacity-50" />

      <div className="flex min-w-0 flex-col space-y-6">
        <SettingSection title={t('auth.login')}>
          <InfoRow label={t('settings.account.webAccount')} value={username} />

          <SettingRow label={t('settings.account.password')} inline>
            <Button onClick={changePassword}>{t('settings.account.updateBtn')}</Button>
          </SettingRow>
        </SettingSection>

        <Divider className="opacity-50" />

        <SettingSection title={t('settings.account.totp.title')}>
          <TotpEnrollment setIsLocked={setIsLocked} />
        </SettingSection>

        <Divider className="opacity-50" />

        <div className="flex justify-end">
          <Logout />
        </div>
      </div>
    </>
  );
};
