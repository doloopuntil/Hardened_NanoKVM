import { useEffect, useState } from 'react';
import { Alert, Button, Input, Modal, Spin, Tag, message } from 'antd';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/auth-totp.ts';
import type { TotpStatus } from '@/api/auth-totp.ts';
import { encrypt } from '@/lib/encrypt.ts';

type Props = {
  /** Blocks navigation away while an enrolment is half-finished. */
  setIsLocked?: (locked: boolean) => void;
  /** Called once enrolment completes, for the forced-enrolment page. */
  onEnrolled?: () => void;
};

export const TotpEnrollment = ({ setIsLocked, onEnrolled }: Props) => {
  const { t } = useTranslation();

  const [status, setStatus] = useState<TotpStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBusy, setIsBusy] = useState(false);

  const [secret, setSecret] = useState('');
  const [otpauthUri, setOtpauthUri] = useState('');
  const [code, setCode] = useState('');

  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [isDisabling, setIsDisabling] = useState(false);

  const isEnrolling = Boolean(otpauthUri);

  useEffect(() => {
    refresh();
  }, []);

  // An abandoned enrolment leaves a secret the user may already have scanned,
  // so keep them on the tab until they either confirm it or back out.
  useEffect(() => {
    setIsLocked?.(isEnrolling || backupCodes.length > 0);
  }, [isEnrolling, backupCodes.length, setIsLocked]);

  function refresh() {
    setIsLoading(true);
    api
      .getStatus()
      .then((rsp) => {
        if (rsp.code === 0) {
          setStatus(rsp.data as TotpStatus);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function startEnrollment() {
    if (isBusy) return;
    setIsBusy(true);

    api
      .enroll()
      .then((rsp) => {
        if (rsp.code !== 0) {
          message.error(rsp.msg || t('settings.account.totp.enrollFailed'));
          return;
        }
        setSecret(rsp.data.secret);
        setOtpauthUri(rsp.data.otpauthUri);
        setCode('');
      })
      .catch((err) => message.error(errorText(err, t('settings.account.totp.enrollFailed'))))
      .finally(() => setIsBusy(false));
  }

  function confirmEnrollment() {
    if (isBusy || !code.trim()) return;
    setIsBusy(true);

    api
      .confirm(code.trim())
      .then((rsp) => {
        if (rsp.code !== 0) {
          message.error(rsp.msg || t('settings.account.totp.invalidCode'));
          return;
        }
        setBackupCodes(rsp.data.backupCodes || []);
        setOtpauthUri('');
        setSecret('');
        setCode('');
        refresh();
        onEnrolled?.();
      })
      .catch((err) => message.error(errorText(err, t('settings.account.totp.invalidCode'))))
      .finally(() => setIsBusy(false));
  }

  function cancelEnrollment() {
    setOtpauthUri('');
    setSecret('');
    setCode('');
  }

  function disable() {
    if (isBusy || !password) return;
    setIsBusy(true);

    api
      .disable(encrypt(password))
      .then((rsp) => {
        if (rsp.code !== 0) {
          message.error(rsp.msg || t('settings.account.totp.disableFailed'));
          return;
        }
        setIsDisabling(false);
        setPassword('');
        refresh();
      })
      .catch((err) => message.error(errorText(err, t('settings.account.totp.disableFailed'))))
      .finally(() => setIsBusy(false));
  }

  function copyBackupCodes() {
    navigator.clipboard
      ?.writeText(backupCodes.join('\n'))
      .then(() => message.success(t('settings.account.totp.copied')))
      .catch(() => undefined);
  }

  function errorText(err: any, fallback: string) {
    const detail = err?.response?.data?.msg;
    return typeof detail === 'string' && detail ? detail : fallback;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Spin />
      </div>
    );
  }

  // Backup codes are shown exactly once; only hashes are kept server-side.
  if (backupCodes.length > 0) {
    return (
      <div className="flex flex-col space-y-3">
        <Alert
          type="warning"
          showIcon
          message={t('settings.account.totp.backupTitle')}
          description={t('settings.account.totp.backupDescription')}
        />
        <div className="grid grid-cols-2 gap-2 rounded bg-neutral-800 p-3 font-mono text-sm">
          {backupCodes.map((backupCode) => (
            <span key={backupCode}>{backupCode}</span>
          ))}
        </div>
        <div className="flex space-x-2">
          <Button onClick={copyBackupCodes}>{t('settings.account.totp.copy')}</Button>
          <Button type="primary" onClick={() => setBackupCodes([])}>
            {t('settings.account.totp.savedThem')}
          </Button>
        </div>
      </div>
    );
  }

  if (isEnrolling) {
    return (
      <div className="flex flex-col space-y-3">
        <span className="text-sm text-neutral-400">{t('settings.account.totp.scan')}</span>
        <div className="flex justify-center rounded bg-white p-3">
          <QRCodeSVG value={otpauthUri} size={180} />
        </div>
        <span className="text-xs text-neutral-500">{t('settings.account.totp.manualEntry')}</span>
        <code className="break-all rounded bg-neutral-800 p-2 text-xs">{secret}</code>

        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onPressEnter={confirmEnrollment}
          placeholder={t('settings.account.totp.codePlaceholder')}
          inputMode="numeric"
          autoComplete="one-time-code"
        />
        <div className="flex space-x-2">
          <Button type="primary" loading={isBusy} onClick={confirmEnrollment}>
            {t('settings.account.totp.confirm')}
          </Button>
          <Button onClick={cancelEnrollment}>{t('settings.account.totp.cancel')}</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <span>{t('settings.account.totp.title')}</span>
            {status?.enabled ? (
              <Tag color="green">{t('settings.account.totp.enabled')}</Tag>
            ) : (
              <Tag>{t('settings.account.totp.disabled')}</Tag>
            )}
            {status?.required && <Tag color="blue">{t('settings.account.totp.required')}</Tag>}
          </div>
          <span className="text-xs text-neutral-500">
            {status?.enabled
              ? // Not named `count`: that would make i18next look for plural
                // key variants that the fork's extras mechanism does not add.
                t('settings.account.totp.remaining', {
                  remaining: status.backupCodesRemaining
                })
              : t('settings.account.totp.description')}
          </span>
        </div>

        {status?.enabled ? (
          <Button danger disabled={status.required} onClick={() => setIsDisabling(true)}>
            {t('settings.account.totp.disable')}
          </Button>
        ) : (
          <Button type="primary" disabled={!status?.clockSynced} onClick={startEnrollment}>
            {t('settings.account.totp.enable')}
          </Button>
        )}
      </div>

      {/* Codes are derived from the clock, so enrolling before NTP succeeds
          would produce a secret whose codes could never be confirmed. */}
      {!status?.clockSynced && !status?.enabled && (
        <Alert
          className="mt-3"
          type="warning"
          showIcon
          message={t('settings.account.totp.clockUnsynced')}
        />
      )}

      {status?.enabled && status.backupCodesRemaining === 0 && (
        <Alert
          className="mt-3"
          type="warning"
          showIcon
          message={t('settings.account.totp.noBackupCodes')}
        />
      )}

      <Modal
        open={isDisabling}
        title={t('settings.account.totp.disableTitle')}
        okText={t('settings.account.totp.disable')}
        okButtonProps={{ danger: true, loading: isBusy, disabled: !password }}
        onOk={disable}
        onCancel={() => {
          setIsDisabling(false);
          setPassword('');
        }}
      >
        <div className="flex flex-col space-y-3 py-2">
          <span className="text-sm text-neutral-400">
            {t('settings.account.totp.disableDescription')}
          </span>
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('settings.account.totp.passwordPlaceholder')}
          />
        </div>
      </Modal>
    </>
  );
};
