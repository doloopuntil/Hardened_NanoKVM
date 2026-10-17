import { Popconfirm } from 'antd';
import { PowerIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';
import { MenuRow } from '@/components/menu-rows.tsx';

type PowerShortProps = {
  showConfirm: boolean;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

export const PowerShort = ({ showConfirm, isLoading, setIsLoading }: PowerShortProps) => {
  const { t } = useTranslation();

  function power() {
    if (isLoading) return;
    setIsLoading(true);

    attempt(() => api.setGpio('power', 800)).finally(() => {
      setIsLoading(false);
    });
  }

  const row = (
    <MenuRow icon={<PowerIcon size={18} />} onClick={showConfirm ? undefined : power}>
      {t('power.powerShort')}
    </MenuRow>
  );

  if (!showConfirm) return row;

  return (
    <Popconfirm
      placement="bottomLeft"
      title={t('power.powerConfirm')}
      okText={t('power.okBtn')}
      cancelText={t('power.cancelBtn')}
      okButtonProps={{ danger: true }}
      onConfirm={power}
      color="#404040"
    >
      {row}
    </Popconfirm>
  );
};
