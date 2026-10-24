import { useState } from 'react';
import { Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt, confirm } from '@/lib/feedback.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';
import { LabelTip } from '@/components/label-tip.tsx';
import { SettingRow } from '@/components/setting-rows.tsx';

export const Overdrive = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [keepAfterUpdate, setKeepAfterUpdate] = useState(false);

  const isReady = useSettingsLoad(api.getOverdrive, (rsp) => {
    setIsAvailable(!!rsp.data?.available);
    setIsEnabled(!!rsp.data?.enabled);
    setIsActive(!!rsp.data?.active);
    setKeepAfterUpdate(!!rsp.data?.keepAfterUpdate);
  });

  function apply(enabled: boolean) {
    if (isLoading) return;
    setIsLoading(true);

    attempt(() => api.setOverdrive({ enabled }))
      .then((rsp) => {
        if (!rsp) return;
        setIsEnabled(enabled);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function applyKeep(keep: boolean) {
    if (isLoading) return;
    setIsLoading(true);

    attempt(() => api.setOverdrive({ keepAfterUpdate: keep }))
      .then((rsp) => {
        if (!rsp) return;
        setKeepAfterUpdate(keep);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onChange(checked: boolean) {
    if (!checked) {
      apply(false);
      return;
    }

    confirm({
      title: t('settings.system.performance.overdrive.confirmTitle'),
      content: t('settings.system.performance.overdrive.confirmText'),
      okText: t('settings.system.performance.overdrive.confirmOk'),
      danger: true,
      onOk: () => apply(true)
    });
  }

  const isPending = isAvailable && isEnabled !== isActive;
  const description = !isReady
    ? t('settings.system.performance.overdrive.description')
    : !isAvailable
      ? t('settings.system.performance.overdrive.unavailable')
      : isPending
        ? t('settings.system.performance.overdrive.pending')
        : t('settings.system.performance.overdrive.description');

  return (
    <>
      <SettingRow
        label={
          <LabelTip
            text={t('settings.system.performance.overdrive.title')}
            tip={t('settings.system.performance.overdrive.tip')}
            warning
          />
        }
        description={description}
        isSwitch
      >
        <Switch
          checked={isEnabled}
          loading={isLoading}
          disabled={!isReady || !isAvailable}
          onChange={onChange}
        />
      </SettingRow>

      <SettingRow
        label={t('settings.system.performance.overdrive.keepTitle')}
        description={t('settings.system.performance.overdrive.keepDescription')}
        isSwitch
      >
        <Switch
          checked={keepAfterUpdate}
          loading={isLoading}
          disabled={!isReady || !isAvailable || !isEnabled}
          onChange={applyKeep}
        />
      </SettingRow>
    </>
  );
};
