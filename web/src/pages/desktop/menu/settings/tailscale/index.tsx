import { useState } from 'react';
import { Divider } from 'antd';
import { LoaderCircleIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/extensions/tailscale.ts';
import { useSettingsLoadState } from '@/hooks/useSettingsLoad.ts';

import { Device } from './device.tsx';
import { Header } from './header.tsx';
import { Install } from './install.tsx';
import { Login } from './login.tsx';
import { Run } from './run.tsx';
import type { Status } from './types.ts';

type TailscaleProps = {
  setIsLocked: (isLocked: boolean) => void;
};

export const Tailscale = ({ setIsLocked }: TailscaleProps) => {
  const { t } = useTranslation();

  const [status, setStatus] = useState<Status>();
  const { status: loadStatus, reload } = useSettingsLoadState(api.getStatus, (rsp) =>
    setStatus(rsp.data)
  );
  const isLoading = loadStatus === 'loading';

  return (
    <>
      <Header state={status?.state} onSuccess={reload} />
      <Divider className="opacity-50" />

      {isLoading ? (
        <div className="flex w-full items-center justify-center space-x-2 pt-5 text-neutral-500">
          <LoaderCircleIcon className="animate-spin" size={18} />
          <span>{t('settings.tailscale.loading')}</span>
        </div>
      ) : (
        <>
          {status?.state === 'notInstall' && (
            <Install setIsLocked={setIsLocked} onSuccess={reload} />
          )}

          {status?.state === 'notRunning' && <Run onSuccess={reload} />}

          {status?.state === 'notLogin' && <Login onSuccess={reload} />}

          {(status?.state === 'stopped' || status?.state === 'running') && (
            <Device status={status} onLogout={reload} />
          )}
        </>
      )}
    </>
  );
};
