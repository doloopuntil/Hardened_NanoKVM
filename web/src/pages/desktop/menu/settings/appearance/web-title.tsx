import { useState } from 'react';
import { Input } from 'antd';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { webTitleAtom } from '@/jotai/settings.ts';
import { useSettingsLoad } from '@/hooks/useSettingsLoad.ts';

export const WebTitle = () => {
  const { t } = useTranslation();
  const [webTitle, setWebTitle] = useAtom(webTitleAtom);

  const [isLoading, setIsLoading] = useState(false);

  const isReady = useSettingsLoad(api.getWebTitle, (rsp) => {
    if (rsp.data?.title) {
      setWebTitle(rsp.data.title);
    }
  });

  function submit() {
    if (isLoading) return;
    setIsLoading(true);

    attempt(() => api.setWebTitle(webTitle)).finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <div className="mt-8 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
      <div className="flex min-w-0 flex-col">
        <span>{t('settings.appearance.webTitle')}</span>
        <span className="text-xs text-neutral-500">{t('settings.appearance.webTitleDesc')}</span>
      </div>

      <div className="w-full sm:w-auto">
        <Input
          disabled={isLoading || !isReady}
          className="w-full sm:w-[180px]"
          value={webTitle}
          onChange={(e) => setWebTitle(e.target.value)}
          onPressEnter={submit}
          onBlur={submit}
          placeholder="NanoKVM"
        />
      </div>
    </div>
  );
};
