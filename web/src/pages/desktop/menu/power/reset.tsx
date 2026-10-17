import { Popconfirm } from 'antd';
import { RotateCcwIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { setGpio } from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { MenuRow } from '@/components/menu-rows.tsx';

import { confirmBackground, confirmOkProps } from './confirm.ts';

type ResetProps = {
  showConfirm: boolean;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

export const Reset = ({ showConfirm, isLoading, setIsLoading }: ResetProps) => {
  const { t } = useTranslation();

  function reset() {
    if (isLoading) return;
    setIsLoading(true);

    attempt(() => setGpio('reset', 800)).finally(() => {
      setIsLoading(false);
    });
  }

  const row = (
    <MenuRow icon={<RotateCcwIcon size={18} />} onClick={showConfirm ? undefined : reset}>
      {t('power.reset')}
    </MenuRow>
  );

  if (!showConfirm) return row;

  return (
    <Popconfirm
      placement="bottomLeft"
      title={t('power.resetConfirm')}
      okText={t('power.okBtn')}
      cancelText={t('power.cancelBtn')}
      okButtonProps={confirmOkProps}
      color={confirmBackground}
      onConfirm={reset}
    >
      {row}
    </Popconfirm>
  );
};
