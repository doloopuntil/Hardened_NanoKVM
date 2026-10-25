import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';

// The label of the hostname rows, with a badge for as long as the new name waits for a reboot.
export const HostnameLabel = ({ rebootRequired }: { rebootRequired: boolean }) => {
  const { t } = useTranslation();

  return (
    <span className="flex flex-wrap items-center gap-2">
      {t('settings.about.hostname')}
      {rebootRequired && (
        <Tag className="m-0" color="gold">
          {t('settings.device.hostname.rebootRequired')}
        </Tag>
      )}
    </span>
  );
};
