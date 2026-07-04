import { Tooltip } from 'antd';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { KeyboardIcon, SmartphoneIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

import { isLocalKeyboardOpenAtom } from '@/jotai/keyboard.ts';
import {
  blurMobileLocalKeyboard,
  focusMobileLocalKeyboard
} from '@/pages/desktop/mobile-local-keyboard';

export const LocalKeyboardButton = () => {
  const { t } = useTranslation();
  const isBigScreen = useMediaQuery({ minWidth: 640 });
  const [isLocalKeyboardOpen, setIsLocalKeyboardOpen] = useAtom(isLocalKeyboardOpenAtom);

  if (isBigScreen) {
    return null;
  }

  function toggleLocalKeyboard() {
    if (isLocalKeyboardOpen) {
      setIsLocalKeyboardOpen(false);
      blurMobileLocalKeyboard();
      return;
    }

    setIsLocalKeyboardOpen(true);
    focusMobileLocalKeyboard();
  }

  return (
    <Tooltip title={t('keyboard.local')} mouseEnterDelay={0.6} placement="bottom">
      <div
        className={clsx(
          'relative flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded text-neutral-300 hover:bg-neutral-700/80 hover:text-white',
          isLocalKeyboardOpen && 'bg-neutral-700/80 text-blue-400'
        )}
        onClick={toggleLocalKeyboard}
      >
        <KeyboardIcon size={18} />
        <SmartphoneIcon
          size={10}
          className="absolute right-[4px] top-[4px] rounded bg-neutral-800"
        />
      </div>
    </Tooltip>
  );
};
