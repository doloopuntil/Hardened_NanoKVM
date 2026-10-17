import { Divider } from 'antd';
import { useTranslation } from 'react-i18next';

import { PageHeader } from '@/components/page-header.tsx';
import { SettingSection } from '@/components/setting-rows.tsx';

import { Hdmi } from './hdmi.tsx';
import { Mdns } from './mdns.tsx';
import { MouseJiggler } from './mouse-jiggler.tsx';
import { Oled } from './oled.tsx';
import { Reboot } from './reboot.tsx';
import { SessionLock } from './session-lock.tsx';
import { Ssh } from './ssh.tsx';
import { Swap } from './swap.tsx';
import { VirtualDevices } from './virtual-devices.tsx';

export const Device = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader title={t('settings.device.title')} />

      <div className="flex flex-col space-y-6">
        <SettingSection title={t('settings.device.sections.connectivity')}>
          <Ssh />
          <Mdns />
        </SettingSection>

        <Divider className="opacity-50" />

        <SettingSection title={t('settings.device.sections.hostConnection')}>
          <VirtualDevices />
        </SettingSection>

        <Divider className="opacity-50" />

        <SettingSection title={t('settings.device.sections.inputOutput')}>
          <MouseJiggler />
          <Hdmi />
          <Oled />
        </SettingSection>

        <Divider className="opacity-50" />

        <SettingSection title={t('settings.device.sections.optimizations')}>
          <Swap />
          <SessionLock />
        </SettingSection>
      </div>

      <Divider className="opacity-50" />

      <div className="flex justify-end">
        <Reboot />
      </div>
    </>
  );
};
