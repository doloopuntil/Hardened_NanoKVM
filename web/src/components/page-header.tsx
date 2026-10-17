import type { ReactNode } from 'react';
import clsx from 'clsx';

import { useIsTouchLayout } from '@/hooks/useResponsiveLayout.ts';
import { LoadBanner } from '@/components/settings-load-group.tsx';

type PageHeaderProps = {
  title: string;
  // what sits on the right of the title, such as a sub-navigation
  children?: ReactNode;
};

// The title of a Settings page, which stays in view while the page scrolls. The load banner of the
// page comes right below it, where the header's cover would not hide it.
export const PageHeader = ({ title, children }: PageHeaderProps) => {
  const isTouchLayout = useIsTouchLayout();

  return (
    <>
      <div
        className={clsx(
          // The shadow has a negative spread, so it is as wide as the header and fades out before
          // its sides: the scroll area clips whatever goes beyond the content width, and a shadow
          // that reached it would end in a hard edge beside the title.
          'sticky top-0 z-20 mb-6 min-w-0 border-0 border-b border-solid border-white/[0.06] bg-settings-panel pb-6 shadow-[0_20px_20px_-20px_rgba(0,0,0,0.5)] backdrop-blur',
          // the desktop layout leaves room above the header for its own title bar
          !isTouchLayout &&
            "before:absolute before:bottom-full before:left-0 before:right-0 before:h-14 before:bg-settings-panel before:content-[''] sm:top-14",
          // the touch layout has no cover above; the header takes the page padding as its own, so
          // the title stays where it is at rest and keeps a strip of header colour above it when stuck
          isTouchLayout && '-mt-4 pt-4'
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="shrink-0 text-base">{title}</div>
          {children && <div className="flex min-w-0 items-center justify-end">{children}</div>}
        </div>
      </div>

      <LoadBanner />
    </>
  );
};
