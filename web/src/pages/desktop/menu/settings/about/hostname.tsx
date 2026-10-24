import { useState } from 'react';
import { Button, Input, Popconfirm } from 'antd';
import { CheckIcon, ClipboardPenIcon, XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { usePopconfirmColor } from '@/hooks/usePopconfirmColor.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';
import { InfoRow } from '@/components/setting-rows.tsx';

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
  const popconfirmColor = usePopconfirmColor();

  const [isLoading, setIsLoading] = useState(false);
  const [hostname, setHostname] = useState('');

  // 'edited' asks whether to reboot, as the new name only applies after a reboot
  const [editState, setEditState] = useState<'' | 'editing' | 'edited'>('');
  const [input, setInput] = useState('');

  const isReady = useSettingsLoad(api.getHostname, (rsp) => {
    if (rsp.data?.hostname) {
      setHostname(rsp.data.hostname);
    }
  });

  const isInvalid = !isValidHostname(input.trim());

  function showInput() {
    setInput(hostname);
    setEditState('editing');
  }

  function update() {
    const name = input.trim();
    if (name === hostname) {
      setEditState('');
      return;
    }

    if (isLoading || !isValidHostname(name)) return;
    setIsLoading(true);

    attempt(() => api.setHostname(name))
      .then((rsp) => {
        if (!rsp) return;

        setHostname(name);
        setEditState('edited');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function reboot() {
    return attempt(() => api.reboot()).then((rsp) => {
      setEditState('');
      if (rsp) setTimeout(() => window.location.reload(), 30000);
    });
  }

  return (
    <InfoRow
      label={t('settings.about.hostname')}
      value={
        editState === 'editing' ? (
          <div className="flex min-w-0 items-center space-x-1">
            <Input
              disabled={isLoading}
              className="min-w-0 flex-1 text-right sm:w-64 sm:flex-none"
              status={isInvalid ? 'error' : undefined}
              maxLength={MAX_LENGTH}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={update}
            />
            <Button
              size="small"
              icon={<CheckIcon size={14} />}
              disabled={isInvalid}
              onClick={update}
            />
            <Button size="small" icon={<XIcon size={14} />} onClick={() => setEditState('')} />
          </div>
        ) : (
          <Popconfirm
            open={editState === 'edited'}
            placement="bottomRight"
            color={popconfirmColor}
            title={t('settings.about.hostnameReboot')}
            okText={t('settings.device.reboot')}
            cancelText={t('common.cancel')}
            okButtonProps={{ danger: true }}
            onConfirm={reboot}
            onCancel={() => setEditState('')}
            onOpenChange={(open) => !open && setEditState('')}
          >
            <div className="flex min-w-0 items-center justify-end gap-2">
              <span className="min-w-0 break-all">{hostname}</span>
              <div
                className={`size-[16px] shrink-0 text-blue-500 ${
                  isReady ? 'cursor-pointer hover:text-blue-400' : 'cursor-not-allowed opacity-40'
                }`}
                onClick={isReady ? showInput : undefined}
              >
                <ClipboardPenIcon size={16} />
              </div>
            </div>
          </Popconfirm>
        )
      }
    />
  );
};
