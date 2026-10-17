import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { RefreshCwIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { MenuRow } from '@/components/menu-rows.tsx';

export const Reset = () => {
  const { t } = useTranslation();

  const [isPcie, setIsPcie] = useState(true);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    attempt(() => api.getHardware(), { quiet: true }).then((rsp) => {
      if (rsp) setIsPcie(rsp.data?.version === 'PCIE');
    });
  }, []);

  function reset() {
    if (isResetting) return;
    setIsResetting(true);

    attempt(() => api.resetHdmi()).finally(() => {
      setTimeout(() => {
        setIsResetting(false);
      }, 1000);
    });
  }

  return (
    <>
      {isPcie && (
        <MenuRow
          icon={
            <RefreshCwIcon
              className={clsx({ 'animate-spin text-blue-500': isResetting })}
              size={18}
            />
          }
          onClick={reset}
        >
          {t('screen.resetHdmi')}
        </MenuRow>
      )}
    </>
  );
};
