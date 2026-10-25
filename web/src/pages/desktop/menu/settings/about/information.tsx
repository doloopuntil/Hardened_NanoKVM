import { useState } from 'react';
import { EthernetPortIcon, WifiIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { getSystemVersion } from '@/api/application.ts';
import * as api from '@/api/vm.ts';
import { formatHardenedVersion } from '@/lib/hardened.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';
import { LabelTip } from '@/components/label-tip.tsx';
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
  const [systemVersion, setSystemVersion] = useState<string>();

  useSettingsLoad(api.getInfo, (rsp) => setInformation(rsp.data));
  useSettingsLoad(getSystemVersion, (rsp) => setSystemVersion(rsp.data?.current?.version));

  return (
    <SettingSection title={t('settings.about.information')}>
      <div className="space-y-3">
        <Hostname />

        {!!information?.mdns && (
          <InfoRow label={t('settings.about.mdns')} value={information.mdns} />
        )}

        <InfoRow
          alignStart={(information?.ips.length ?? 0) > 1}
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

        <InfoRow label={t('settings.update.system.systemVersion')} value={systemVersion} />

        <InfoRow
          label={
            <LabelTip
              text={t('settings.about.application')}
              tip={t('settings.about.applicationTip')}
            />
          }
          value={information ? formatHardenedVersion(information.application) : undefined}
        />

        <InfoRow label={t('settings.about.uptime')} value={formatUptime(information?.uptime)} />
      </div>
    </SettingSection>
  );
};
