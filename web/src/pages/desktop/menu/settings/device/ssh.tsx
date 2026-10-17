import { useState } from 'react';
import { Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';
import { LabelTip } from '@/components/label-tip.tsx';
import { SettingRow } from '@/components/setting-rows.tsx';

export const Ssh = () => {
  const { t } = useTranslation();

  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isReady = useSettingsLoad(api.getSSHState, (rsp) => {
    setIsEnabled(Boolean(rsp.data?.enabled));
  });

  async function update(checked: boolean) {
    if (isLoading) return;
    setIsLoading(true);

    const rsp = await attempt(() => (checked ? api.enableSSH() : api.disableSSH()));
    setIsLoading(false);

    if (!rsp) return;

    if (typeof rsp.data?.enabled === 'boolean') {
      setIsEnabled(rsp.data.enabled);
    } else {
      setIsEnabled(checked);
    }
  }

  return (
    <SettingRow
      label={<LabelTip text="SSH" tip={t('settings.device.ssh.tip')} warning />}
      description={t('settings.device.ssh.description')}
      isSwitch
    >
      <Switch checked={isEnabled} loading={isLoading} disabled={!isReady} onChange={update} />
    </SettingRow>
  );
};
