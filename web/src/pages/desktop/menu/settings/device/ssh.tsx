import { useState } from 'react';
import { Switch, Tooltip } from 'antd';
import { CircleAlertIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';

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
    <div className="flex items-center justify-between">
      <div className="flex flex-col space-y-1">
        <div className="flex items-center space-x-2">
          <span>SSH</span>

          <Tooltip
            title={t('settings.device.ssh.tip')}
            className="cursor-pointer"
            placement="right"
            styles={{ root: { maxWidth: '400px' } }}
          >
            <CircleAlertIcon className="text-neutral-500" size={14} />
          </Tooltip>
        </div>
        <span className="text-xs text-neutral-500">{t('settings.device.ssh.description')}</span>
      </div>

      <Switch checked={isEnabled} loading={isLoading} disabled={!isReady} onChange={update} />
    </div>
  );
};
