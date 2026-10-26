import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';

// The badge of a setting whose change only takes effect after the next reboot.
export const RebootTag = () => {
  const { t } = useTranslation();

  return (
    <Tag className="m-0" color="gold">
      {t('settings.device.rebootRequired')}
    </Tag>
  );
};
