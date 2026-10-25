import { useState } from 'react';

import * as api from '@/api/vm.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';
import { HostnameLabel } from '@/components/hostname-label.tsx';
import { InfoRow } from '@/components/setting-rows.tsx';

// Read-only here; the name is changed in Settings > Device, next to the Reboot button.
export const Hostname = () => {
  const [hostname, setHostname] = useState('');
  const [rebootRequired, setRebootRequired] = useState(false);

  useSettingsLoad(api.getHostname, (rsp) => {
    setHostname(rsp.data?.hostname ?? '');
    setRebootRequired(!!rsp.data?.rebootRequired);
  });

  return (
    <InfoRow
      label={<HostnameLabel rebootRequired={rebootRequired} />}
      value={hostname ? <span className="break-all">{hostname}</span> : undefined}
    />
  );
};
