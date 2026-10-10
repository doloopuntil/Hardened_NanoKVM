import { message, Modal, type ModalFuncProps } from 'antd';
import i18n from 'i18next';

const ERROR_SECONDS = 5;

// Transient result of a user action. Persistent or system events use notification.
export const toast = {
  success: (content: string) => message.success(content),
  info: (content: string) => message.info(content),
  warning: (content: string) => message.warning(content),
  error: (content: string) => message.error({ content, duration: ERROR_SECONDS })
};

type ConfirmOptions = ModalFuncProps & { danger?: boolean };

// Set `danger` for destructive or irreversible actions.
export function confirm({ danger, ...props }: ConfirmOptions) {
  return Modal.confirm({
    centered: true,
    okText: i18n.t('common.confirm'),
    cancelText: i18n.t('common.cancel'),
    okButtonProps: { danger },
    ...props
  });
}
