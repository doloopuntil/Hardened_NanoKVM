import { useState } from 'react';

import * as api from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';

// The kernel keeps at most 64 bytes of host name.
export const HOSTNAME_MAX_LENGTH = 64;

// A host name, or a fully-qualified one such as host.network.net: dot-separated labels of
// letters, digits and hyphens. The server checks the same rules.
function isValidHostname(name: string) {
  return (
    name.length > 0 &&
    name.length <= HOSTNAME_MAX_LENGTH &&
    name.split('.').every((label) => /^[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/.test(label))
  );
}

// The device name as a form: the typed text is a draft until it is saved from the bar at the
// bottom of the page, and leaving the page drops it.
export function useHostname() {
  const [saved, setSaved] = useState('');
  const [input, setInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  // the new name is stored at once but the services only pick it up after a reboot; the server
  // remembers that until the next boot
  const [isPending, setIsPending] = useState(false);

  const isReady = useSettingsLoad(api.getHostname, (rsp) => {
    const name = rsp.data?.hostname ?? '';
    setSaved(name);
    setInput(name);
    setIsPending(!!rsp.data?.rebootRequired);
  });

  const name = input.trim();
  const isInvalid = !isValidHostname(name);
  const isDirty = isReady && name !== saved;

  function save() {
    if (isSaving || isInvalid || !isDirty) return;
    setIsSaving(true);

    attempt(() => api.setHostname(name))
      .then((rsp) => {
        if (!rsp) return;

        setSaved(name);
        setInput(name);
        // changing it back to the name the device booted with needs no reboot
        return attempt(() => api.getHostname(), { quiet: true }).then((state) =>
          setIsPending(!!state?.data?.rebootRequired)
        );
      })
      .finally(() => {
        setIsSaving(false);
      });
  }

  function discard() {
    if (!isSaving) setInput(saved);
  }

  return {
    saved,
    input,
    setInput,
    isReady,
    isSaving,
    isPending,
    isInvalid,
    isDirty,
    save,
    discard
  };
}

export type HostnameForm = ReturnType<typeof useHostname>;
