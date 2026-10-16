import { useState } from 'react';
import { Tooltip } from 'antd';
import { CircleHelpIcon, EthernetPortIcon, WifiIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { formatHardenedVersion } from '@/lib/hardened.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';
import { InfoRow, SettingSection } from '@/components/setting-rows.tsx';

import { Hostname } from './hostname.tsx';

type IP = {
  name: string;
  addr: string;
  version: string;
  type: string;
};

type Info = {
  ips: IP[];
  mdns: string;
  image: string;
  application: string;
  uptime?: number;
  deviceKey: string;
};

function formatUptime(seconds?: number) {
  if (!seconds || seconds < 0) return '-';

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export const Information = () => {
  const { t } = useTranslation();

  const [information, setInformation] = useState<Info>();

  useSettingsLoad(api.getInfo, (rsp) => setInformation(rsp.data));

  return (
    <SettingSection title={t('settings.about.information')}>
      <div className="space-y-3">
        <InfoRow
          alignStart
          label={t('settings.about.ip')}
          value={
            information?.ips && information.ips.length > 0 ? (
              <div className="flex min-w-0 flex-col space-y-1">
                {information.ips.map((ip) => (
                  <div key={ip.addr} className="flex min-w-0 items-center justify-end gap-2">
                    <span className="min-w-0 break-all">{ip.addr}</span>
                    <div className="size-[16px] shrink-0 text-neutral-500">
                      {ip.type === 'Wireless' ? (
                        <WifiIcon size={16} />
                      ) : (
                        <EthernetPortIcon size={16} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : undefined
          }
        />

        {!!information?.mdns && (
          <InfoRow label={t('settings.about.mdns')} value={information.mdns} />
        )}

        <InfoRow
          label={
            <LabelWithTip text={t('settings.about.image')} tip={t('settings.about.imageTip')} />
          }
          value={information?.image}
        />

        <InfoRow
          label={
            <LabelWithTip
              text={t('settings.about.application')}
              tip={t('settings.about.applicationTip')}
            />
          }
          value={information ? formatHardenedVersion(information.application) : undefined}
        />

        <InfoRow label={t('settings.about.uptime')} value={formatUptime(information?.uptime)} />

        <Hostname />
      </div>
    </SettingSection>
  );
};

const LabelWithTip = ({ text, tip }: { text: string; tip: string }) => (
  <span className="flex items-center gap-2">
    {text}
    <Tooltip title={tip} className="cursor-pointer text-neutral-500" placement="right">
      <CircleHelpIcon size={15} />
    </Tooltip>
  </span>
);
