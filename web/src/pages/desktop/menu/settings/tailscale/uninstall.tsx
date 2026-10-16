import { useState } from 'react';
import { Button, Modal } from 'antd';
import { Trash2Icon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/extensions/tailscale.ts';
import { attempt } from '@/lib/feedback.ts';

type UninstallProps = {
  onSuccess: () => void;
};

export const Uninstall = ({ onSuccess }: UninstallProps) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function uninstall() {
    if (isLoading) return;
    setIsLoading(true);

    attempt(() => api.uninstall()).finally(() => {
      setIsModalOpen(false);
      setIsLoading(false);
      onSuccess();
    });
  }

  const title = (
    <div className="flex items-center space-x-1 text-red-500">
      <Trash2Icon size={18} />
      <span>{t('settings.tailscale.uninstall')}</span>
    </div>
  );

  return (
    <>
      <Button danger onClick={() => setIsModalOpen(true)}>
        {t('settings.tailscale.uninstall')}
      </Button>

      <Modal
        title={title}
        open={isModalOpen}
        centered={true}
        okType="danger"
        okText={t('settings.tailscale.okBtn')}
        cancelText={t('settings.tailscale.cancelBtn')}
        onOk={uninstall}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={isLoading}
      >
        <div className="py-5">
          <p className="text-base">{t('settings.tailscale.uninstallDesc')}</p>
        </div>
      </Modal>
    </>
  );
};
