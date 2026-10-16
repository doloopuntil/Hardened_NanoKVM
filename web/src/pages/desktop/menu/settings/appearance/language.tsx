import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import languages from '@/i18n/languages.ts';
import { setLanguage } from '@/lib/localstorage.ts';
import { SettingRow } from '@/components/setting-rows.tsx';

export const Language = () => {
  const { t, i18n } = useTranslation();

  const options = languages.map((language) => ({
    value: language.key,
    label: language.name
  }));

  function changeLanguage(value: string) {
    if (i18n.language === value) return;

    i18n.changeLanguage(value);
    setLanguage(value);
  }

  return (
    <SettingRow
      label={t('settings.appearance.language')}
      description={t('settings.appearance.languageDesc')}
      inline
    >
      <Select
        defaultValue={i18n.language}
        className="w-36 max-w-full text-right sm:w-48"
        options={options}
        onSelect={changeLanguage}
      />
    </SettingRow>
  );
};
