import { useState } from 'react';
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';
import { HostnameLabel } from '@/components/hostname-label.tsx';
import { SettingRow } from '@/components/setting-rows.tsx';

import { HOSTNAME_MAX_LENGTH, type HostnameForm } from './use-hostname.ts';

export const Hostname = ({ form }: { form: HostnameForm }) => {
  const { t } = useTranslation();

  const [isMdnsOn, setIsMdnsOn] = useState(false);
  useSettingsLoad(api.getMdnsState, (rsp) => setIsMdnsOn(!!rsp.data?.enabled));

  return (
    <SettingRow
      label={<HostnameLabel rebootRequired={form.isPending} />}
      description={
        isMdnsOn && form.saved
          ? t('settings.device.hostname.reachable', {
              address: `${form.saved.split('.')[0]}.local`
            })
          : t('settings.device.hostname.description')
      }
      inline
    >
      <Input
        className="w-44 text-right sm:w-72"
        status={form.isInvalid && form.isReady ? 'error' : undefined}
        maxLength={HOSTNAME_MAX_LENGTH}
        value={form.input}
        disabled={!form.isReady || form.isSaving}
        onChange={(e) => form.setInput(e.target.value)}
        onPressEnter={form.save}
        onKeyDown={(e) => {
          // Escape drops the draft; with nothing to drop it still closes the dialog
          if (e.key === 'Escape' && form.isDirty) {
            e.stopPropagation();
            form.discard();
          }
        }}
      />
    </SettingRow>
  );
};
