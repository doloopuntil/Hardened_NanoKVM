import { useEffect, useState } from 'react';
import { Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt, confirm } from '@/lib/feedback.ts';
import { LabelTip } from '@/components/label-tip.tsx';
import { SettingRow } from '@/components/setting-rows.tsx';

const REDIRECT_DELAY_SECONDS = 30;

export const Tls = () => {
  const { t } = useTranslation();

  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsEnabled(window.location.protocol === 'https:');
  }, []);

  function requestUpdate() {
    if (isLoading) return;

    const enable = !isEnabled;
    const target = protocolRedirectUrl(enable);

    confirm({
      title: t('settings.network.tls.rebootTitle'),
      content: (
        <div className="space-y-2">
          <p>{t('settings.network.tls.rebootDesc', { seconds: REDIRECT_DELAY_SECONDS })}</p>
          <p className="break-all font-mono text-xs text-neutral-400">{target}</p>
        </div>
      ),
      okText: t('settings.network.tls.rebootOk'),
      cancelText: t('settings.network.tls.rebootCancel'),
      onOk: () => update(enable, target)
    });
  }

  async function update(enable: boolean, target: string) {
    setIsLoading(true);
    const timer = window.setTimeout(() => {
      window.location.assign(target);
    }, REDIRECT_DELAY_SECONDS * 1000);

    const rsp = await attempt(() => api.setTLS(enable));
    if (rsp) {
      setIsEnabled(enable);
      return;
    }

    window.clearTimeout(timer);
    setIsLoading(false);
  }

  function protocolRedirectUrl(enable: boolean) {
    const target = new URL(window.location.href);
    target.protocol = enable ? 'https:' : 'http:';

    if (enable && target.port === '80') {
      target.port = '';
    }
    if (!enable && target.port === '443') {
      target.port = '';
    }

    return target.toString();
  }

  return (
    <SettingRow
      label={<LabelTip text="HTTPS" tip={t('settings.network.tls.tip')} warning />}
      description={t('settings.network.tls.description')}
      isSwitch
    >
      <Switch checked={isEnabled} loading={isLoading} onChange={requestUpdate} />
    </SettingRow>
  );
};
