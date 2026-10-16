import { useState } from 'react';
import { Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/extensions/tailscale.ts';
import { attempt } from '@/lib/feedback.ts';
import { SettingRow, SettingSection } from '@/components/setting-rows.tsx';

type ServiceProps = {
  onSuccess: () => void;
};

type Loading = '' | 'restarting' | 'stopping';

export const Service = ({ onSuccess }: ServiceProps) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState<Loading>('');

  function run(action: Exclude<Loading, ''>, request: typeof api.restart) {
    if (loading !== '') return;
    setLoading(action);

    attempt(() => request()).finally(() => {
      setLoading('');
      onSuccess();
    });
  }

  return (
    <SettingSection title={t('settings.tailscale.service')}>
      <SettingRow
        label={t('settings.tailscale.restartTitle')}
        description={t('settings.tailscale.restartDesc')}
        inline
      >
        <Popconfirm
          title={t('settings.tailscale.restart')}
          onConfirm={() => run('restarting', api.restart)}
          okText={t('settings.tailscale.okBtn')}
          cancelText={t('settings.tailscale.cancelBtn')}
          placement="topRight"
          disabled={loading !== ''}
        >
          <Button loading={loading === 'restarting'} disabled={loading === 'stopping'}>
            {t('settings.tailscale.restartBtn')}
          </Button>
        </Popconfirm>
      </SettingRow>

      <SettingRow
        label={t('settings.tailscale.stopTitle')}
        description={t('settings.tailscale.stopDesc')}
        inline
      >
        <Popconfirm
          title={t('settings.tailscale.stop')}
          description={t('settings.tailscale.stopDesc')}
          onConfirm={() => run('stopping', api.stop)}
          okText={t('settings.tailscale.okBtn')}
          cancelText={t('settings.tailscale.cancelBtn')}
          placement="topRight"
          disabled={loading !== ''}
        >
          <Button loading={loading === 'stopping'} disabled={loading === 'restarting'}>
            {t('settings.tailscale.stopBtn')}
          </Button>
        </Popconfirm>
      </SettingRow>
    </SettingSection>
  );
};
