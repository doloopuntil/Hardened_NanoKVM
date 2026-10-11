import { useState } from 'react';
import { Button, Divider, Modal, Switch, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { statusImage } from '@/api/download.ts';
import { getHidMode, getUsbWakeup, setHidMode, setUsbWakeup } from '@/api/hid.ts';
import { getMountedImage } from '@/api/storage.ts';
import * as api from '@/api/virtual-device.ts';
import { attempt, confirm, toast } from '@/lib/feedback.ts';
import { notifyImageListChanged } from '@/lib/image-events.ts';
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
  const [hidErrMsg, setHidErrMsg] = useState('');

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

  // the device reboots to apply the mode, so the page reloads once it is back
  function updateHidMode() {
    if (loading) return;
    setLoading('hid');
    setHidErrMsg('');

    const timeoutId = setTimeout(() => {
      window.location.reload();
    }, 30000);

    setHidMode(isHidOnlyMode ? 'normal' : 'hid-only')
      .then((rsp) => {
        if (rsp.code !== 0) {
          setHidErrMsg(rsp.msg);
          setLoading('');
          clearTimeout(timeoutId);
        }
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
    <div className="flex items-center justify-between">
      <div className="flex flex-col space-y-1">
        <span>{t('settings.device.usbWakeup')}</span>
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
      <div className="flex items-center justify-between space-x-10">
        <div className="flex flex-col space-y-1">
          <span>{t('settings.device.hidOnly')}</span>
          <span className="text-xs text-neutral-500">{t('settings.device.hidOnlyDesc')}</span>
        </div>

        <Switch
          checked={isHidOnlyMode}
          loading={loading === 'hid'}
          disabled={!isReady}
          onChange={() => setIsHidModalOpen(true)}
        />
      </div>

      <Modal
        open={isHidModalOpen}
        title={t('mouse.hidOnly.title')}
        width={580}
        centered={false}
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

        {hidErrMsg && <div className="pt-1 text-sm text-red-500">{hidErrMsg}</div>}

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
            {isHidOnlyMode ? t('mouse.hidOnly.disable') : t('mouse.hidOnly.enable')}
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
      <div className="flex items-center justify-between">
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
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-1">
          <span>{t('settings.device.network')}</span>
          <span className="text-xs text-neutral-500">{t('settings.device.networkDesc')}</span>
        </div>

        <Switch
          checked={isNetworkEnabled}
          loading={loading === 'network'}
          disabled={!isReady}
          onChange={() => update('network')}
        />
      </div>

      {usbWakeup}
    </>
  );
};
