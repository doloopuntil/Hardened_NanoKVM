import { useEffect, useState } from 'react';
import { Input, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import * as totpApi from '@/api/auth-totp.ts';
import * as vmApi from '@/api/vm.ts';
import { encrypt } from '@/lib/encrypt.ts';
import { attempt } from '@/lib/feedback.ts';

type TerminalEnableProps = {
  open: boolean;
  onClose: () => void;
  onEnabled: () => void;
};

// Turning the terminal on opens a root shell, so it asks for the password, and for a code when
// the account has a second factor.
export const TerminalEnable = ({ open, onClose, onEnabled }: TerminalEnableProps) => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [totpEnabled, setTotpEnabled] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;

    attempt(() => totpApi.getStatus(), { quiet: true }).then((rsp) => {
      setTotpEnabled(!!rsp?.data?.enabled);
    });
  }, [open]);

  function close() {
    setPassword('');
    setCode('');
    onClose();
  }

  async function submit() {
    setSaving(true);
    const rsp = await attempt(() =>
      vmApi.setTerminalEnabled(true, encrypt(password), code.trim() || undefined)
    );
    setSaving(false);
    if (!rsp) return;

    onEnabled();
    close();
  }

  return (
    <Modal
      centered
      open={open}
      title={t('settings.appearance.menuBar.terminalWarningTitle')}
      okText={t('settings.appearance.menuBar.terminalWarningConfirm')}
      cancelText={t('common.cancel')}
      okButtonProps={{
        danger: true,
        disabled: !password || (totpEnabled && !code),
        loading: saving
      }}
      onOk={submit}
      onCancel={close}
    >
      <div className="flex flex-col gap-3">
        <span className="text-sm text-neutral-400">
          {t('settings.appearance.menuBar.terminalWarningDesc')}
        </span>
        <Input.Password
          value={password}
          placeholder={t('settings.account.password')}
          onChange={(e) => setPassword(e.target.value)}
        />
        {totpEnabled && (
          <Input
            value={code}
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder={t('auth.totp.placeholderCode')}
            onChange={(e) => setCode(e.target.value)}
          />
        )}
      </div>
    </Modal>
  );
};
