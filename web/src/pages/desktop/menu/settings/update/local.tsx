import { useEffect, useRef, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/application.ts';
import { attempt } from '@/lib/feedback.ts';
import { SettingRow } from '@/components/setting-rows.tsx';

type LocalKey = { configured: boolean; fingerprint?: string | null };

type UploadProps = {
  disabled: boolean;
  onStaged: (data: any) => void;
  setBusy: (busy: boolean) => void;
};

// Pick the archive, system-latest.json and its signature out of what was selected.
function sortFiles(files: File[]) {
  return {
    archive: files.find((f) => f.name.endsWith('.tar.gz')),
    metadata: files.find((f) => f.name.endsWith('.json')),
    signature: files.find((f) => f.name.endsWith('.sig'))
  };
}

export const SystemUpload = ({ disabled, onStaged, setBusy }: UploadProps) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState('');

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';
    const { archive, metadata, signature } = sortFiles(files);
    if (!archive || !metadata) {
      setError(t('settings.update.local.missingFiles'));
      return;
    }

    setError('');
    setBusy(true);
    const data = new FormData();
    data.append('metadata', metadata);
    if (signature) data.append('signature', signature);
    data.append('file', archive);

    const rsp = await attempt(() => api.uploadSystemUpdate(data));
    setBusy(false);
    if (rsp?.data) onStaged(rsp.data);
  }

  return (
    <SettingRow
      label={t('settings.update.local.title')}
      description={error || t('settings.update.local.desc')}
      inline
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".gz,.json,.sig"
        onChange={handleChange}
        className="hidden"
      />
      <Button disabled={disabled} onClick={() => inputRef.current?.click()}>
        {t('settings.update.local.choose')}
      </Button>
    </SettingRow>
  );
};

export const LocalKeyRow = () => {
  const { t } = useTranslation();
  const [key, setKey] = useState<LocalKey | null>(null);
  const [open, setOpen] = useState(false);
  const [pem, setPem] = useState('');
  const [password, setPassword] = useState('');
  const [removing, setRemoving] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    attempt(() => api.getLocalUpdateKey(), { quiet: true }).then((rsp) => {
      if (rsp?.data) setKey(rsp.data);
    });
  }, []);

  function close() {
    setOpen(false);
    setRemoving(false);
    setPem('');
    setPassword('');
  }

  async function submit() {
    setSaving(true);
    const rsp = await attempt(() =>
      removing ? api.removeLocalUpdateKey(password) : api.setLocalUpdateKey(password, pem)
    );
    setSaving(false);
    if (!rsp) return;

    setKey(removing ? { configured: false } : rsp.data);
    close();
  }

  return (
    <>
      <SettingRow
        label={t('settings.update.local.keyTitle')}
        description={
          key?.configured
            ? (key.fingerprint ?? t('settings.update.local.keyDesc'))
            : t('settings.update.local.keyNone')
        }
        inline
      >
        <div className="flex gap-2">
          {key?.configured && (
            <Button
              danger
              onClick={() => {
                setRemoving(true);
                setOpen(true);
              }}
            >
              {t('settings.update.local.keyRemove')}
            </Button>
          )}
          <Button onClick={() => setOpen(true)}>{t('settings.update.local.keySet')}</Button>
        </div>
      </SettingRow>

      <Modal
        centered
        open={open}
        title={t('settings.update.local.keyTitle')}
        okText={t('common.confirm')}
        cancelText={t('common.cancel')}
        okButtonProps={{ disabled: !password || (!removing && !pem), loading: saving }}
        onOk={submit}
        onCancel={close}
      >
        <div className="flex flex-col gap-3">
          {!removing && (
            <>
              <span className="text-sm text-neutral-400">{t('settings.update.local.keyDesc')}</span>
              <Input.TextArea
                rows={6}
                value={pem}
                placeholder="-----BEGIN PUBLIC KEY-----"
                onChange={(e) => setPem(e.target.value)}
              />
            </>
          )}
          <Input.Password
            value={password}
            placeholder={t('settings.account.password')}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};
