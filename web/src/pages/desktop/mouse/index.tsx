import { useAtomValue } from 'jotai';
import { useMediaQuery } from 'react-responsive';

import { mouseModeAtom } from '@/jotai/mouse.ts';

import { Absolute } from './absolute.tsx';
import { MobileCursorOverlay } from './mobile-cursor-overlay.tsx';
import { Relative } from './relative.tsx';

export const Mouse = () => {
  const isMobile = useMediaQuery({ maxWidth: 849 });
  const mouseMode = useAtomValue(mouseModeAtom);

  if (isMobile) {
    return (
      <>
        <Absolute />
        <MobileCursorOverlay />
      </>
    );
  }

  return <>{mouseMode === 'relative' ? <Relative /> : <Absolute />}</>;
};
