import { useState } from 'react';
import { LockOutlined, WifiOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Switch } from 'antd';
import { WifiIcon, WifiPenIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/network.ts';
import { attempt } from '@/lib/feedback.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';
import { SettingRow } from '@/components/setting-rows.tsx';

export const Wifi = () => {
  const { t } = useTranslation();

  const [isSupported, setIsSupported] = useState(false);
  const [isAPMode, setIsAPMode] = useState(false);
  const [connectedWiFi, setConnectedWifi] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'' | 'connecting' | 'disconnecting'>('');

  const applyWiFi = (rsp: { data?: any }) => {
    setIsSupported(!!rsp.data?.supported);
    setIsAPMode(!!rsp.data?.apMode);

    if (rsp.data?.connected && rsp.data?.ssid) {
      setConnectedWifi(rsp.data.ssid);
    } else {
      setConnectedWifi('');
    }
  };

  const isReady = useSettingsLoad(api.getWiFi, applyWiFi);

  // refresh after a failed connect
  async function getWiFi() {
    const rsp = await attempt(() => api.getWiFi(), { quiet: true });
    if (rsp) applyWiFi(rsp);
  }

  async function connect() {
    if (!ssid || !password) return;

    if (status !== '') return;
    setStatus('connecting');

    const rsp = await attempt(() => api.connectWifi(ssid, password));
    if (rsp) {
      setConnectedWifi(ssid);
      setIsModalOpen(false);
    } else {
      getWiFi();
    }

    setStatus('');
  }

  async function disconnect(enable: boolean) {
    if (enable || status !== '') return;

    setStatus('disconnecting');

    const rsp = await attempt(() => api.disconnectWifi());
    if (rsp) setConnectedWifi('');

    setStatus('');
  }

  function openModal() {
    setSsid('');
    setPassword('');
    setIsModalOpen(true);
  }

  function closeModal() {
    if (status !== '') return;
    setIsModalOpen(false);
  }

  if (!isSupported) {
    return <></>;
  }

  if (isAPMode) {
    return (
      <SettingRow
        label={t('settings.network.wifi.title')}
        description={t('settings.network.wifi.apMode')}
        inline
      >
        <Button shape="round" size="small" disabled>
          <div className="flex items-center justify-center px-1.5">
            <WifiIcon size={16} />
          </div>
        </Button>
      </SettingRow>
    );
  }

  return (
    <>
      <SettingRow
        label={t('settings.network.wifi.title')}
        description={connectedWiFi ? connectedWiFi : t('settings.network.wifi.description')}
        inline
      >
        <Button
          type={connectedWiFi ? 'primary' : 'default'}
          shape="round"
          size="small"
          disabled={!isReady}
          onClick={openModal}
        >
          <div className="flex items-center justify-center px-1.5">
            <WifiIcon size={16} />
          </div>
        </Button>
      </SettingRow>

      <Modal
        closable={false}
        open={isModalOpen}
        centered={true}
        onOk={connect}
        onCancel={closeModal}
        okText={t('settings.network.wifi.joinBtn')}
        cancelText={t('settings.network.wifi.cancelBtn')}
        confirmLoading={status === 'connecting'}
      >
        {/* title */}
        <div className="flex items-center space-x-5">
          <div className="size-16">
            <WifiPenIcon size={64} className="text-blue-400" />
          </div>

          {!connectedWiFi ? (
            <div className="flex flex-col">
              <span className="text-lg font-bold">{t('settings.network.wifi.connect')}</span>
              <span className="text-xs text-neutral-400">
                {t('settings.network.wifi.connectDesc1')}
              </span>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="flex w-72 justify-between rounded-lg bg-neutral-800">
                <div className="flex w-full justify-between p-3">
                  <span>{connectedWiFi}</span>
                  <Switch
                    value={!!connectedWiFi}
                    loading={status === 'disconnecting'}
                    onChange={disconnect}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* form */}
        <div className="flex flex-col items-center space-y-3 py-6">
          <Input
            value={ssid}
            className="w-72"
            prefix={<WifiOutlined />}
            placeholder={t('settings.network.wifi.ssid')}
            onChange={(e) => setSsid(e.target.value)}
          />
          <Input.Password
            value={password}
            className="w-72"
            prefix={<LockOutlined />}
            placeholder={t('settings.network.wifi.password')}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};
