import { useState } from 'react';
import { Button, Divider, Modal, Switch, Tooltip, Typography } from 'antd';
import { useSetAtom } from 'jotai';
import { CircleAlertIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { statusImage } from '@/api/download.ts';
import { getHidMode, getUsbWakeup, setHidMode, setUsbWakeup } from '@/api/hid.ts';
import { getMountedImage } from '@/api/storage.ts';
import * as api from '@/api/virtual-device.ts';
import { attempt, confirm, toast } from '@/lib/feedback.ts';
import { notifyImageListChanged } from '@/lib/image-events.ts';
import { closeSettingsRequestAtom } from '@/jotai/settings.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';

const { Paragraph } = Typography;

export const VirtualDevices = () => {
  const { t } = useTranslation();

  const [isHidOnlyMode, setIsHidOnlyMode] = useState(false);
  const [isUsbWakeupEnabled, setIsUsbWakeupEnabled] = useState(false);
  const [isDiskEnabled, setIsDiskEnabled] = useState(false);
  const [isNetworkEnabled, setIsNetworkEnabled] = useState(false);
  const [isImageMounted, setIsImageMounted] = useState(false);
  const [loading, setLoading] = useState<'' | 'disk' | 'network' | 'wakeup' | 'hid'>('');
  const [isHidModalOpen, setIsHidModalOpen] = useState(false);
  const setCloseSettingsRequest = useSetAtom(closeSettingsRequestAtom);

  const applyVirtualDevice = (rsp: { data?: any }) => {
    setIsDiskEnabled(rsp.data.disk);
    setIsNetworkEnabled(rsp.data.network);
  };

  const applyImageState = (rsp: { data?: any }) => {
    setIsImageMounted(!!rsp.data?.file);
  };

  const isReady = [
    useSettingsLoad(getHidMode, (rsp) => setIsHidOnlyMode(rsp.data.mode === 'hid-only')),
    useSettingsLoad(api.getVirtualDevice, applyVirtualDevice),
    useSettingsLoad(getMountedImage, applyImageState),
    useSettingsLoad(getUsbWakeup, (rsp) => setIsUsbWakeupEnabled(rsp.data.enabled))
  ].every(Boolean);

  async function update(device: 'disk' | 'network') {
    if (loading) return;
    setLoading(device);

    const rsp = await attempt(() => api.updateVirtualDevice(device));
    if (rsp) {
      const device = await attempt(() => api.getVirtualDevice());
      if (device) applyVirtualDevice(device);

      const image = await attempt(() => getMountedImage());
      if (image) applyImageState(image);

      // the desktop shows the mounted image and the CD-ROM flag too
      notifyImageListChanged();
    }

    setLoading('');
  }

  // enabling the disk hands /data to the host and takes it away from the
  // mounted image, and a running transfer would be cut short
  async function toggleDisk() {
    if (isDiskEnabled) {
      await update('disk');
      return;
    }

    try {
      const rsp = await statusImage();
      if (rsp.code === 0 && rsp.data?.status === 'in_progress') {
        toast.warning(t('settings.device.diskTransferRunning'));
        return;
      }
    } catch (err) {
      console.log(err);
    }

    if (isImageMounted) {
      confirm({
        title: t('image.attention'),
        content: t('settings.device.diskCancelMount'),
        onOk: () => update('disk')
      });
      return;
    }

    await update('disk');
  }

  // restarting the USB connection drops the mounted image and brings the virtual disk back
  function toggleNetwork() {
    if (!isImageMounted) {
      update('network');
      return;
    }

    confirm({
      title: t('image.attention'),
      content: t('settings.device.networkCancelMount'),
      onOk: () => update('network')
    });
  }

  // the device reboots to apply the mode, so the dialog closes and the page reloads once it is back
  function updateHidMode() {
    if (loading) return;
    setLoading('hid');

    const timeoutId = setTimeout(() => {
      window.location.reload();
    }, 30000);

    setHidMode(isHidOnlyMode ? 'normal' : 'hid-only')
      .then((rsp) => {
        if (rsp.code !== 0) {
          toast.error(rsp.msg || t('common.actionFailed'));
          setLoading('');
          clearTimeout(timeoutId);
          return;
        }

        setCloseSettingsRequest((count) => count + 1);
      })
      .catch((err) => {
        console.log(err);
        setLoading('');
        clearTimeout(timeoutId);
      });
  }

  async function updateWakeup(enabled: boolean) {
    if (loading) return;
    setLoading('wakeup');

    const rsp = await attempt(() => setUsbWakeup(enabled));
    if (rsp) setIsUsbWakeupEnabled(rsp.data.enabled);

    setLoading('');
  }

  const usbWakeup = (
    <div className="flex items-center justify-between gap-x-4">
      <div className="flex flex-col space-y-1">
        <div className="flex items-center space-x-2">
          <span>{t('settings.device.usbWakeup')}</span>

          <Tooltip
            title={t('settings.device.usbWakeupTip')}
            className="cursor-pointer"
            placement="right"
            styles={{ root: { maxWidth: '400px' } }}
          >
            <CircleAlertIcon className="text-neutral-500" size={14} />
          </Tooltip>
        </div>
        <span className="text-xs text-neutral-500">{t('settings.device.usbWakeupDesc')}</span>
      </div>

      <Switch
        checked={isUsbWakeupEnabled}
        loading={loading === 'wakeup'}
        disabled={!isReady}
        onChange={updateWakeup}
      />
    </div>
  );

  const hidOnly = (
    <>
      <div className="flex items-center justify-between gap-x-4">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <span>{t('settings.device.hidOnly')}</span>

            <Tooltip
              title={t('settings.device.hidOnlyTip')}
              className="cursor-pointer"
              placement="right"
              styles={{ root: { maxWidth: '400px' } }}
            >
              <CircleAlertIcon className="text-neutral-500" size={14} />
            </Tooltip>
          </div>
          <span className="text-xs text-neutral-500">{t('settings.device.hidOnlyDesc')}</span>
        </div>

        {/* Both directions reboot the device, so each asks in a dialog. */}
        <Switch
          checked={isHidOnlyMode}
          loading={loading === 'hid'}
          disabled={!isReady}
          onChange={() => {
            if (!isHidOnlyMode) {
              setIsHidModalOpen(true);
              return;
            }

            confirm({
              title: t('mouse.hidOnly.disable'),
              content: t('mouse.hidOnly.tip3'),
              okText: t('mouse.hidOnly.disable'),
              onOk: updateHidMode
            });
          }}
        />
      </div>

      <Modal
        open={isHidModalOpen}
        title={t('mouse.hidOnly.title')}
        width={580}
        centered
        footer={false}
        onCancel={() => setIsHidModalOpen(false)}
      >
        <Divider />

        <Paragraph>{t('mouse.hidOnly.desc')}</Paragraph>

        <Paragraph type="secondary">
          <ul>
            <li>{t('mouse.hidOnly.tip1')}</li>
            <li>{t('mouse.hidOnly.tip2')}</li>
            <li>{t('mouse.hidOnly.tip3')}</li>
          </ul>
        </Paragraph>

        <div className="flex justify-center pt-5">
          <Button
            danger
            type="primary"
            loading={loading === 'hid'}
            onClick={() => {
              setIsHidModalOpen(false);
              updateHidMode();
            }}
          >
            {t('mouse.hidOnly.enable')}
          </Button>
        </div>
      </Modal>
    </>
  );

  if (isHidOnlyMode) {
    return (
      <>
        {hidOnly}
        {usbWakeup}
      </>
    );
  }

  return (
    <>
      {hidOnly}

      {/* Virtual Disk */}
      <div className="flex items-center justify-between gap-x-4">
        <div className="flex flex-col space-y-1">
          <span>{t('settings.device.disk')}</span>
          <span className="text-xs text-neutral-500">
            {isImageMounted ? t('settings.device.diskLocked') : t('settings.device.diskDesc')}
          </span>
        </div>

        <Switch
          checked={isDiskEnabled}
          loading={loading === 'disk'}
          disabled={!isReady}
          onChange={toggleDisk}
        />
      </div>

      {/* Virtual Network */}
      <div className="flex items-center justify-between gap-x-4">
        <div className="flex flex-col space-y-1">
          <span>{t('settings.device.network')}</span>
          <span className="text-xs text-neutral-500">{t('settings.device.networkDesc')}</span>
        </div>

        <Switch
          checked={isNetworkEnabled}
          loading={loading === 'network'}
          disabled={!isReady}
          onChange={toggleNetwork}
        />
      </div>

      {usbWakeup}
    </>
  );
};
