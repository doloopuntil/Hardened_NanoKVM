import { useEffect, useRef, useState } from 'react';
import { Button, Input, notification, Progress } from 'antd';
import type { InputRef } from 'antd';
import clsx from 'clsx';
import { useSetAtom } from 'jotai';
import { DownloadIcon, XCircleIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { imageEnabled } from '@/api/download.ts';
import { getVirtualDevice, updateVirtualDevice } from '@/api/virtual-device.ts';
import { attempt } from '@/lib/feedback.ts';
import { formatBytes } from '@/lib/image-transfer.ts';
import { useImageTransfer } from '@/hooks/useImageTransfer.ts';
import { isKeyboardEnableAtom } from '@/jotai/keyboard.ts';
import { MenuItem } from '@/components/menu-item.tsx';
import { MenuHeader } from '@/components/menu-rows.tsx';

export const DownloadImage = () => {
  const { t } = useTranslation();
  const [notify, contextHolder] = notification.useNotification();
  const setIsKeyboardEnable = useSetAtom(isKeyboardEnableAtom);

  const [diskEnabled, setDiskEnabled] = useState(false);
  const [remoteEnabled, setRemoteEnabled] = useState(false);
  const [isDiskShared, setIsDiskShared] = useState(false);
  const [isDisablingDisk, setIsDisablingDisk] = useState(false);
  const [popoverKey, setPopoverKey] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const inputRef = useRef<InputRef>(null);

  const {
    input,
    sha256sum,
    status,
    log,
    progress,
    bytesDone,
    isCanceling,
    selectedFile,
    fileInputRef,
    changeInput,
    changeSha256,
    selectLocalFile,
    download,
    upload,
    cancel,
    resume,
    reset
  } = useImageTransfer({
    remoteEnabled,
    onFailed: (message) =>
      notify.error({ message: t('download.failed'), description: message, duration: 10 })
  });

  useEffect(() => {
    checkDiskEnabled();
  }, []);

  function checkDiskEnabled() {
    imageEnabled()
      .then((res) => {
        setDiskEnabled(res.data.enabled);
        setRemoteEnabled(res.data.remoteEnabled === true);
      })
      .catch(() => {
        setDiskEnabled(false);
        setRemoteEnabled(false);
      });

    // /data is read-only while the virtual disk serves it to the host
    getVirtualDevice()
      .then((res) => {
        setIsDiskShared(!!res.data?.disk);
      })
      .catch(() => {
        setIsDiskShared(false);
      });
  }

  // hand /data back to the KVM, which makes the download possible again
  function disableDisk() {
    if (isDisablingDisk) return;
    setIsDisablingDisk(true);

    attempt(() => updateVirtualDevice('disk'))
      .then((rsp) => {
        if (!rsp) return;

        checkDiskEnabled();
      })
      .finally(() => {
        setIsDisablingDisk(false);
      });
  }

  function handleOpenChange(open: boolean) {
    if (open) {
      checkDiskEnabled();
      resume();
      setIsKeyboardEnable(false);
      setPopoverKey((prevKey) => prevKey + 1); // Force re-render
    } else {
      reset();
      setIsDragging(false);

      setIsKeyboardEnable(true);
    }
  }

  const content = (
    <div key={popoverKey} className="min-w-[300px]">
      <MenuHeader title={t('download.title')} />

      {!diskEnabled ? (
        isDiskShared ? (
          <div className="space-y-3">
            <div className="text-neutral-300">{t('download.diskShared')}</div>
            <Button type="primary" block loading={isDisablingDisk} onClick={disableDisk}>
              {t('download.diskOff')}
            </Button>
          </div>
        ) : (
          <div className="max-w-[300px] text-red-500">{t('download.disabled')}</div>
        )
      ) : (
        <div className="space-y-3">
          <div>
            <div className="pb-1 text-neutral-500">{t('download.input')}</div>
            <div className="flex items-center space-x-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => changeInput(e.target.value)}
                disabled={status === 'in_progress' || !remoteEnabled}
              />
              <Button
                type="primary"
                onClick={() => download(input)}
                disabled={
                  status === 'in_progress' ||
                  status === 'complete' ||
                  !remoteEnabled ||
                  !input.trim()
                }
              >
                {t('download.ok')}
              </Button>
            </div>
            {!remoteEnabled && (
              <div className="pt-1 text-xs text-neutral-500">{t('download.remoteDisabled')}</div>
            )}
          </div>
          <div>
            <div className="pb-1 text-neutral-500">{t('download.sha256')}</div>
            <Input
              value={sha256sum}
              onChange={(e) => changeSha256(e.target.value)}
              disabled={status === 'in_progress'}
              maxLength={64}
              placeholder={t('download.sha256Placeholder')}
            />
          </div>
          <div>
            <div className="pb-1 text-neutral-500">{t('download.inputfile')}</div>
            <div className="flex items-center space-x-2">
              <Button
                block
                disabled={status === 'in_progress'}
                className={clsx('min-w-0', isDragging && '!border-blue-500 !text-blue-400')}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files?.[0] ?? null;
                  selectLocalFile(file);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <span className="block max-w-full truncate">
                  {selectedFile ? selectedFile.name : t('download.uploadbox')}
                </span>
              </Button>
              <input
                id="file-upload"
                ref={fileInputRef}
                type="file"
                accept=".iso,.img"
                onChange={(e) => selectLocalFile(e.target.files?.[0] ?? null)}
                disabled={status === 'in_progress'}
                className="hidden"
              />
              <Button
                type="primary"
                onClick={() => upload(selectedFile)}
                disabled={status === 'in_progress' || status === 'complete' || !selectedFile}
              >
                {t('download.ok')}
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className={clsx('py-2')}>
        {status && log && (
          <div
            className={clsx(
              'mt-3 max-w-[300px] break-words text-sm',
              status === 'failed' ? 'text-red-500' : 'text-green-500'
            )}
          >
            {log}
          </div>
        )}
        {status === 'in_progress' && (
          <div className="flex w-full items-center space-x-2 pt-3">
            <div className="min-w-0 flex-1">
              <Progress
                percent={progress ?? 100}
                status="active"
                size="small"
                showInfo={progress !== null}
                format={(percent) => `${Math.floor(percent ?? 0)}%`}
              />
              {progress === null && bytesDone > 0 && (
                <div className="text-xs text-neutral-500">{formatBytes(bytesDone)}</div>
              )}
            </div>
            <Button
              danger
              size="small"
              icon={<XCircleIcon size={14} />}
              loading={isCanceling}
              onClick={cancel}
            >
              {t('download.cancel')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {contextHolder}
      <MenuItem
        title={t('download.title')}
        icon={<DownloadIcon size={18} />}
        content={content}
        onOpenChange={handleOpenChange}
      />
    </>
  );
};
