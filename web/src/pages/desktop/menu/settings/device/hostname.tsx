import { useState } from 'react';
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';
import { HostnameLabel } from '@/components/hostname-label.tsx';
import { SettingRow } from '@/components/setting-rows.tsx';

// The kernel keeps at most 64 bytes of host name.
const MAX_LENGTH = 64;

// A host name, or a fully-qualified one such as host.network.net: dot-separated labels of
// letters, digits and hyphens. The server checks the same rules.
function isValidHostname(name: string) {
  return (
    name.length > 0 &&
    name.length <= MAX_LENGTH &&
    name.split('.').every((label) => /^[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/.test(label))
  );
}

export const Hostname = () => {
  const { t } = useTranslation();

  const [saved, setSaved] = useState('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // the new name is stored at once but the services only pick it up after a reboot; the server
  // remembers that until the next boot
  const [isPending, setIsPending] = useState(false);
  const [isMdnsOn, setIsMdnsOn] = useState(false);

  const isReady = useSettingsLoad(api.getHostname, (rsp) => {
    const name = rsp.data?.hostname ?? '';
    setSaved(name);
    setInput(name);
    setIsPending(!!rsp.data?.rebootRequired);
  });

  useSettingsLoad(api.getMdnsState, (rsp) => setIsMdnsOn(!!rsp.data?.enabled));

  const name = input.trim();
  const isInvalid = !isValidHostname(name);

  function update() {
    if (isLoading || isInvalid || name === saved) return;
    setIsLoading(true);

    attempt(() => api.setHostname(name))
      .then((rsp) => {
        if (!rsp) {
          setInput(saved);
          return;
        }

        setSaved(name);
        setInput(name);
        // changing it back to the name the device booted with needs no reboot
        return attempt(() => api.getHostname(), { quiet: true }).then((state) =>
          setIsPending(!!state?.data?.rebootRequired)
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <SettingRow
      label={<HostnameLabel rebootRequired={isPending} />}
      description={
        isMdnsOn && saved
          ? t('settings.device.hostname.reachable', { address: `${saved.split('.')[0]}.local` })
          : t('settings.device.hostname.description')
      }
      inline
    >
      <Input
        className="w-44 text-right sm:w-72"
        status={isInvalid && isReady ? 'error' : undefined}
        maxLength={MAX_LENGTH}
        value={input}
        disabled={!isReady || isLoading}
        onChange={(e) => setInput(e.target.value)}
        onBlur={update}
        onPressEnter={update}
      />
    </SettingRow>
  );
};
