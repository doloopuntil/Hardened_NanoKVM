import { useState } from 'react';
import { Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/application.ts';
import { attempt } from '@/lib/feedback.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';
import { LabelTip } from '@/components/label-tip.tsx';
import { SettingRow } from '@/components/setting-rows.tsx';

interface PreviewProps {
  refreshUpdates: () => void;
}

export const Preview = ({ refreshUpdates }: PreviewProps) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const isReady = useSettingsLoad(api.getPreviewUpdates, (rsp) => {
    setIsEnabled(rsp.data.enabled);
  });

  function setPreviewUpdates() {
    if (isLoading) return;
    setIsLoading(true);

    const enable = !isEnabled;

    attempt(() => api.setPreviewUpdates(enable))
      .then((rsp) => {
        if (!rsp) return;

        setIsEnabled(enable);
        refreshUpdates();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <SettingRow
      label={
        <LabelTip
          text={t('settings.update.preview')}
          tip={t('settings.update.previewTip')}
          warning
        />
      }
      description={t('settings.update.previewChannels')}
      isSwitch
    >
      <Switch
        checked={isEnabled}
        loading={isLoading}
        disabled={!isReady}
        onChange={setPreviewUpdates}
      />
    </SettingRow>
  );
};
