import { useState } from 'react';
import { Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';
import { LabelTip } from '@/components/label-tip.tsx';
import { SettingRow } from '@/components/setting-rows.tsx';

export const Mdns = () => {
  const { t } = useTranslation();

  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isReady = useSettingsLoad(api.getMdnsState, (rsp) => {
    setIsEnabled(!!rsp.data?.enabled);
  });

  async function update() {
    if (isLoading) return;
    setIsLoading(true);

    const rsp = await attempt(() => (isEnabled ? api.disableMdns() : api.enableMdns()));
    setIsLoading(false);

    if (!rsp) return;

    setIsEnabled(!isEnabled);
  }

  return (
    <SettingRow
      label={<LabelTip text="mDNS" tip={t('settings.device.mdns.tip')} />}
      description={t('settings.device.mdns.description')}
      isSwitch
    >
      <Switch checked={isEnabled} loading={isLoading} disabled={!isReady} onChange={update} />
    </SettingRow>
  );
};
