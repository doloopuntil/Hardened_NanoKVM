import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';

import { LabelTip } from './label-tip.tsx';

// The label of the hostname rows, with a badge for as long as the new name waits for a reboot,
// and optionally a tooltip.
export const HostnameLabel = ({
  rebootRequired,
  tip
}: {
  rebootRequired: boolean;
  tip?: string;
}) => {
  const { t } = useTranslation();
  const text = t('settings.about.hostname');

  return (
    <span className="flex flex-wrap items-center gap-2">
      {tip ? <LabelTip text={text} tip={tip} /> : text}
      {rebootRequired && (
        <Tag className="m-0" color="gold">
          {t('settings.device.hostname.rebootRequired')}
        </Tag>
      )}
    </span>
  );
};
