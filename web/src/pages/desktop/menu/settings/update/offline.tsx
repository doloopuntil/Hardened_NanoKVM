import { useRef } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/application.ts';
import { SettingRow } from '@/components/setting-rows.tsx';

interface UpdateProps {
  status: string;
  setStatus: (status: string) => void;
  setIsLocked: (isClosable: boolean) => void;
  setErrMsg: (msg: string) => void;
}

export const Offline = ({ status, setStatus, setIsLocked, setErrMsg }: UpdateProps) => {
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleClick() {
    inputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (!validateFilename(file.name)) {
      setStatus('failed');
      setErrMsg(t('settings.update.offline.invalidName'));
      return;
    }

    upload(file);
  }

  function upload(file: File | null) {
    if (!file) return;

    if (!validateFilename(file.name)) {
      setStatus('failed');
      setErrMsg(t('settings.update.offline.invalidName'));
      return;
    }

    if (status === 'loading' || status === 'updating') {
      return;
    }

    setIsLocked(true);
    setStatus('updating');
    setErrMsg('');

    const formData = new FormData();
    formData.append('file', file);

    api
      .offlineUpdate(formData)
      .then((rsp: Response) => {
        // Prüfen ob HTTP OK
        if (!rsp.ok) throw new Error(`HTTP error ${rsp.status}`);
        return rsp.json(); // JSON-Payload parsen
      })
      .then((rspj: any) => {
        // Jetzt rspj ist das tatsächliche JSON
        if (rspj.code !== 0 || !rspj.data) {
          setStatus('failed');
          setErrMsg(rspj.msg || t('settings.update.offline.updateFailed'));
          console.log(rspj);
          return;
        }
      })
      .finally(() => {
        setTimeout(() => {
          setIsLocked(false);
          setErrMsg('');

          window.location.reload();
        }, 12000);
      });
  }

  function validateFilename(filename: string) {
    const regex: RegExp =
      /^(nanokvm_\d+\.\d+\.\d+|hardened-nanokvm-kvmapp-\d+\.\d+\.\d+)\.tar\.gz$/;
    return regex.test(filename);
  }

  return (
    <SettingRow
      label={t('settings.update.offline.title')}
      description={t('settings.update.offline.desc')}
      inline
    >
      <input
        id="file-upload"
        ref={inputRef}
        type="file"
        accept=".tar,.gz"
        onChange={handleFileChange}
        className="hidden"
      />
      <Button onClick={handleClick}>{t('settings.update.local.choose')}</Button>
    </SettingRow>
  );
};
