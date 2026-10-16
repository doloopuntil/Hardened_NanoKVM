import { Segmented } from 'antd';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';

import * as storage from '@/lib/localstorage.ts';
import type { LayoutMode as LayoutModeValue } from '@/lib/localstorage.ts';
import { layoutModeAtom } from '@/jotai/settings.ts';
import { SettingRow } from '@/components/setting-rows.tsx';

export const LayoutMode = () => {
  const { t } = useTranslation();
  const [layoutMode, setLayoutMode] = useAtom(layoutModeAtom);

  const options = [
    { value: 'auto', label: t('settings.appearance.layoutAuto') },
    { value: 'mobile', label: t('settings.appearance.layoutMobile') }
  ];

  function handleChange(mode: LayoutModeValue) {
    if (mode === layoutMode) return;

    setLayoutMode(mode);
    storage.setLayoutMode(mode);
  }

  return (
    <SettingRow
      label={t('settings.appearance.layoutMode')}
      description={t('settings.appearance.layoutModeDesc')}
    >
      <div className="w-full min-w-0 overflow-x-auto sm:w-auto sm:flex-none">
        <Segmented
          block
          className="settings-segmented-wrap-labels settings-segmented-fit min-w-full"
          value={layoutMode}
          options={options}
          onChange={(value) => handleChange(value as LayoutModeValue)}
        />
      </div>
    </SettingRow>
  );
};
