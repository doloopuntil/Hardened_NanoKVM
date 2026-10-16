import { useCallback, useEffect, useRef, useState } from 'react';
import { Segmented } from 'antd';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { useIsTouchLayout } from '@/hooks/useResponsiveLayout.ts';
import { SaveBar } from '@/components/save-bar.tsx';
import { SettingsLoadGroup } from '@/components/settings-load-group.tsx';

import { Network } from '../network';
import { SystemLog } from '../system-log';
import type { SystemActionHandle, SystemActionState } from './action';
import { idleSystemActionState } from './action';
import { FirewallSettings } from './firewall';
import { TimeSettings } from './time';

type SystemSection = 'network' | 'time' | 'firewall' | 'systemLog';

export const System = () => {
  const { t } = useTranslation();
  const isTouchLayout = useIsTouchLayout();
  const [section, setSection] = useState<SystemSection>('time');
  const [actionState, setActionState] = useState<SystemActionState>(idleSystemActionState);
  const networkRef = useRef<SystemActionHandle>(null);
  const timeRef = useRef<SystemActionHandle>(null);
  const systemLogRef = useRef<SystemActionHandle>(null);

  const updateActionState = useCallback((state: SystemActionState) => {
    setActionState(state);
  }, []);

  useEffect(() => {
    setActionState(idleSystemActionState);
  }, [section]);

  function saveActiveSection() {
    if (section === 'network') {
      void networkRef.current?.save();
      return;
    }
    if (section === 'time') {
      void timeRef.current?.save();
      return;
    }
    if (section === 'systemLog') {
      void systemLogRef.current?.save();
    }
  }

  return (
    <>
      <div
        className={clsx(
          'sticky top-0 z-20 -mx-1 mb-6 min-w-0 border-0 border-b border-solid border-white/[0.06] bg-neutral-900/95 px-1 pb-6 shadow-[0_10px_20px_rgba(0,0,0,0.25)] backdrop-blur',
          // the desktop layout leaves room above the header for its own title bar; the touch layout
          // has none, and the offset there pushes the header down over the first settings
          !isTouchLayout &&
            "before:absolute before:bottom-full before:left-0 before:right-0 before:h-14 before:bg-neutral-900/95 before:content-[''] sm:top-14"
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="shrink-0 text-base">{t('settings.system.title')}</div>
          <div className="flex min-w-0 items-center justify-end">
            <div className="min-w-0 max-w-full overflow-x-auto">
              <Segmented
                size="small"
                className="min-w-max"
                value={section}
                options={[
                  { value: 'time', label: t('settings.system.sections.time') },
                  { value: 'network', label: t('settings.network.title') },
                  { value: 'firewall', label: t('settings.system.sections.firewall') },
                  { value: 'systemLog', label: t('settings.system.sections.systemLog') }
                ]}
                onChange={(value) => setSection(value as SystemSection)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* The load banner is part of the section, below the sticky header; the group of the whole
          tab would put it above the header, where the header's cover hides it. */}
      <SettingsLoadGroup key={section}>
        <div className="min-w-0 overflow-x-hidden">
          {section === 'network' && (
            <Network ref={networkRef} showTitle={false} onActionStateChange={updateActionState} />
          )}
          {section === 'time' && (
            <TimeSettings
              ref={timeRef}
              showFooter={false}
              onActionStateChange={updateActionState}
            />
          )}
          {section === 'firewall' && <FirewallSettings />}
          {section === 'systemLog' && (
            <SystemLog
              ref={systemLogRef}
              showTitle={false}
              showFooter={false}
              onActionStateChange={updateActionState}
            />
          )}
        </div>
      </SettingsLoadGroup>

      {/* outside the section above, whose overflow would keep the bar from sticking */}
      {(actionState.hasPending || actionState.statusText) && (
        <SaveBar
          statusText={actionState.statusText}
          statusKind={actionState.statusKind}
          label={t('settings.system.saveChanges')}
          loading={actionState.isBusy}
          disabled={!actionState.canSave}
          onSave={actionState.hasPending ? saveActiveSection : undefined}
        />
      )}
    </>
  );
};
