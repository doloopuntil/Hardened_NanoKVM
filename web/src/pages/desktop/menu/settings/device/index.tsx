import { Divider } from 'antd';
import { useTranslation } from 'react-i18next';

import { PageHeader } from '@/components/page-header.tsx';
import { SaveBar } from '@/components/save-bar.tsx';
import { SettingSection } from '@/components/setting-rows.tsx';

import { Hdmi } from './hdmi.tsx';
import { Hostname } from './hostname.tsx';
import { MouseJiggler } from './mouse-jiggler.tsx';
import { Oled } from './oled.tsx';
import { Poweroff } from './poweroff.tsx';
import { Reboot } from './reboot.tsx';
import { useHostname } from './use-hostname.ts';
import { VirtualDevices } from './virtual-devices.tsx';

export const Device = () => {
  const { t } = useTranslation();
  const hostname = useHostname();

  return (
    <>
      <PageHeader title={t('settings.device.title')} />

      <div className="flex flex-col space-y-6">
        <SettingSection title={t('settings.device.sections.general')}>
          <Hostname form={hostname} />
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
      </div>

      <Divider className="opacity-50" />

      <div className="flex flex-wrap justify-end gap-2">
        <Poweroff />
        <Reboot />
      </div>

      {hostname.isDirty && (
        <SaveBar
          statusText={t('settings.network.dns.unsaved')}
          label={t('settings.system.saveChanges')}
          loading={hostname.isSaving}
          disabled={hostname.isInvalid}
          onSave={hostname.save}
        />
      )}
    </>
  );
};
