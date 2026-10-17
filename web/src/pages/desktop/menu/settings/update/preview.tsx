import { useState } from 'react';
import { Switch, Tooltip } from 'antd';
import { CircleAlertIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/application.ts';
import { attempt } from '@/lib/feedback.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';
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
        <span className="inline-flex items-center gap-1">
          {t('settings.update.preview')}
          <Tooltip
            title={t('settings.update.previewTip')}
            className="cursor-pointer text-orange-400"
            placement="top"
            styles={{ root: { maxWidth: '400px' } }}
          >
            <CircleAlertIcon size={15} />
          </Tooltip>
        </span>
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
