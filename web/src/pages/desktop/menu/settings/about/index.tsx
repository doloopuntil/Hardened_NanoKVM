import { Divider } from 'antd';
import { useTranslation } from 'react-i18next';

import { PageHeader } from '@/components/page-header.tsx';

import { Community } from './community.tsx';
import { Information } from './information.tsx';

export const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader title={t('settings.about.title')} />

      <Information />
      <Divider className="opacity-50" />

      <Community />
    </>
  );
};
