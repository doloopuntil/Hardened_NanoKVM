import { message, Modal, type ModalFuncProps } from 'antd';
import i18n from 'i18next';

const ERROR_SECONDS = 5;

// Transient result of a user action. Persistent or system events use notification.
export const toast = {
  success: (content: string) => message.success(content),
  info: (content: string) => message.info(content),
  warning: (content: string) => message.warning(content),
  error: (content: string, key?: string) => message.error({ content, duration: ERROR_SECONDS, key })
};

const LOAD_FAILED_KEY = 'load-failed';

// One shared toast, however many loads fail at once.
export function toastLoadFailed() {
  message.error({
    key: LOAD_FAILED_KEY,
    content: i18n.t('common.loadFailed'),
    duration: ERROR_SECONDS
  });
}

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

type Rsp = { code: number; msg?: string };

// BadRequest and Conflict messages are written for users; other codes carry raw errors.
const READABLE_CODES = [-1, -409];

function failureText(rsp?: Rsp) {
  const detail = rsp && READABLE_CODES.includes(rsp.code) ? rsp.msg : '';
  return detail ? i18n.t('common.actionFailedDetail', { detail }) : i18n.t('common.actionFailed');
}

// Keyed by text: identical failures at once show a single toast.
function toastFailure(rsp?: Rsp) {
  const text = failureText(rsp);
  toast.error(text, text);
}

// Run an API call; on failure show one error toast and return undefined. Pass
// `quiet` for refreshes nobody asked for, which only log.
export async function attempt<T extends Rsp>(
  call: () => Promise<T>,
  { quiet = false }: { quiet?: boolean } = {}
): Promise<T | undefined> {
  try {
    const rsp = await call();
    if (rsp.code === 0) return rsp;

    console.log(rsp.msg);
    if (!quiet) toastFailure(rsp);
  } catch (err) {
    console.log(err);
    if (!quiet) toastFailure((err as { response?: { data?: Rsp } }).response?.data);
  }

  return undefined;
}
