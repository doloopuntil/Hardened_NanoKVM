import { Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Head } from '@/components/head.tsx';
import { TotpEnrollment } from '@/components/totp-enrollment.tsx';

/**
 * Standalone enrolment page for the forced case.
 *
 * Reached when `security.require_totp` is set but the account has no
 * enrolment. Login deliberately succeeds in that state -- refusing would leave
 * a headless device unreachable -- so this is where the user is sent to make
 * the policy true.
 */
export const Totp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Head title={t('settings.account.totp.title')} />

      <div className="flex h-screen w-screen flex-col items-center justify-center space-y-5">
        <h2 className="text-xl font-semibold text-neutral-100">
          {t('settings.account.totp.requiredTitle')}
        </h2>
        <p className="m-0 max-w-md text-center text-sm text-neutral-400">
          {t('settings.account.totp.requiredDescription')}
        </p>

        <Card style={{ minWidth: 340, maxWidth: 480 }}>
          <TotpEnrollment onEnrolled={() => navigate('/', { replace: true })} />
        </Card>
      </div>
    </>
  );
};
