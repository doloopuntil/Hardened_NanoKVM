import type { ReactNode } from 'react';
import { Divider } from 'antd';
import { useTranslation } from 'react-i18next';

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
      <div className="text-base">{t('settings.device.title')}</div>
      <Divider className="opacity-50" />

      <div className="flex flex-col space-y-6">
        <Section title={t('settings.device.sections.connectivity')}>
          <Ssh />
          <Mdns />
        </Section>

        <Divider className="opacity-50" />

        <Section title={t('settings.device.sections.hostConnection')}>
          <VirtualDevices />
        </Section>

        <Divider className="opacity-50" />

        <Section title={t('settings.device.sections.inputOutput')}>
          <MouseJiggler />
          <Hdmi />
          <Oled />
        </Section>

        <Divider className="opacity-50" />

        <Section title={t('settings.device.sections.optimizations')}>
          <Swap />
          <SessionLock />
        </Section>
      </div>

      <Divider className="opacity-50" />

      <Reboot />
    </>
  );
};

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="flex min-w-0 flex-col space-y-6">
    <div className="text-neutral-400">{title}</div>
    {children}
  </div>
);
