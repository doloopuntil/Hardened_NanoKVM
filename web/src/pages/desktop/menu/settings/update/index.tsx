import { useEffect, useState, type ReactNode } from 'react';
import { Alert, Button, Divider, Spin, Tag } from 'antd';
import { LoaderCircleIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import semver from 'semver';

import * as api from '@/api/application.ts';
import type {
  ApplicationStagedUpdate,
  SystemBootHealth,
  SystemLatest,
  SystemPendingUpdate,
  SystemRollbackInfo,
  SystemStagedUpdate,
  SystemUpdateProgress,
  SystemVersion
} from '@/api/application.ts';
import * as firewallApi from '@/api/system-firewall.ts';
import type { FirewallStatus } from '@/api/system-firewall.ts';
import { attempt, confirm } from '@/lib/feedback.ts';
import { PageHeader } from '@/components/page-header.tsx';
import { InfoRow, SettingSection } from '@/components/setting-rows.tsx';

import { InstallWait } from './install-wait.tsx';
import { ApplicationUpload, LocalKeyRow, SystemUpload } from './local.tsx';

type UpdateProps = {
  setIsLocked: (isClosable: boolean) => void;
};

export const Update = ({ setIsLocked }: UpdateProps) => {
  const { t } = useTranslation();

  const [status, setStatus] = useState('');
  const [currentVersion, setCurrentVersion] = useState('');
  const [latestVersion, setLatestVersion] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [systemStatus, setSystemStatus] = useState('');
  const [systemCurrent, setSystemCurrent] = useState<SystemVersion | null>(null);
  const [systemLatest, setSystemLatest] = useState<SystemLatest | null>(null);
  const [systemStaged, setSystemStaged] = useState<SystemStagedUpdate | null>(null);
  const [systemPending, setSystemPending] = useState<SystemPendingUpdate | null>(null);
  const [systemBootHealth, setSystemBootHealth] = useState<SystemBootHealth | null>(null);
  const [systemRollback, setSystemRollback] = useState<SystemRollbackInfo | null>(null);
  const [systemProgress, setSystemProgress] = useState<SystemUpdateProgress | null>(null);
  const [systemErrMsg, setSystemErrMsg] = useState('');
  const [systemAppUpdateRequired, setSystemAppUpdateRequired] = useState(false);
  const [rawInstallWaiting, setRawInstallWaiting] = useState(false);
  const [firewallStatus, setFirewallStatus] = useState<FirewallStatus | null>(null);
  const [appStaged, setAppStaged] = useState<ApplicationStagedUpdate | null>(null);

  useEffect(() => {
    refreshFirewallStatus();
  }, []);

  // the installed version does not depend on the check, so it shows even when the check fails
  useEffect(() => {
    api
      .getCurrentVersion()
      .then((rsp: any) => {
        if (rsp.code === 0 && rsp.data?.current) setCurrentVersion(rsp.data.current);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    attempt(() => api.getStagedApplication(), { quiet: true }).then((rsp) => {
      if (rsp?.data) setAppStaged(rsp.data);
    });
  }, []);

  const onlineUpdatesBlocked = !!firewallStatus?.paranoidActive;

  async function refreshFirewallStatus() {
    try {
      const rsp = await firewallApi.getStatus();
      const firewall = rsp.code === 0 && rsp.data ? (rsp.data as FirewallStatus) : null;
      setFirewallStatus(firewall);

      if (firewall?.paranoidActive) {
        setStatus('failed');
        setErrMsg(t('settings.update.paranoidBlocked'));
        setSystemStatus('failed');
        setSystemErrMsg(t('settings.update.paranoidBlocked'));
        refreshSystemUpdateStatus();
        return;
      }
    } catch (err) {
      console.log(err);
    }

    checkForUpdates();
    checkSystemUpdates();
  }

  function isVersionAtLeast(current: string, latest: string) {
    if (semver.valid(current) && semver.valid(latest)) {
      return semver.gte(current, latest);
    }

    return current === latest;
  }

  function checkForUpdates() {
    if (onlineUpdatesBlocked) {
      setStatus('failed');
      setErrMsg(t('settings.update.paranoidBlocked'));
      return;
    }
    if (status === 'loading') return;
    setStatus('loading');

    api
      .getVersion()
      .then((rsp: any) => {
        if (rsp.data?.blocked) {
          setStatus('failed');
          setErrMsg(rsp.data.error || t('settings.update.paranoidBlocked'));
          return;
        }
        if (rsp.code !== 0 || !rsp.data) {
          setStatus('failed');
          setErrMsg(t('settings.update.queryFailed'));
          return;
        }

        setCurrentVersion(rsp.data.current);

        if (rsp.data?.latest) {
          setLatestVersion(rsp.data.latest);
          const isLatest = isVersionAtLeast(rsp.data.current, rsp.data.latest);
          setStatus(isLatest ? 'latest' : 'outdated');
        } else {
          setStatus('latest');
        }
      })
      .catch(() => {
        setStatus('failed');
        setErrMsg(t('settings.update.queryFailed'));
      });
  }

  function checkSystemUpdates() {
    if (onlineUpdatesBlocked) {
      setSystemStatus('failed');
      setSystemErrMsg(t('settings.update.paranoidBlocked'));
      refreshSystemUpdateStatus();
      return;
    }
    if (systemStatus === 'loading') return;
    setSystemStatus('loading');
    setSystemErrMsg('');
    setSystemAppUpdateRequired(false);

    api
      .checkSystemUpdate()
      .then((rsp: any) => {
        if (rsp.code !== 0 || !rsp.data) {
          setSystemStatus('failed');
          setSystemErrMsg(t('settings.update.system.queryFailed'));
          return;
        }

        setSystemCurrent(rsp.data.current);
        setSystemLatest(rsp.data.latest || null);
        setSystemAppUpdateRequired(!!rsp.data.appUpdateRequired);

        if (rsp.data.error) {
          setSystemStatus('failed');
          setSystemErrMsg(
            rsp.data.appUpdateRequired && rsp.data.latest?.requiredAppVersion
              ? t('settings.update.system.appUpdateRequired', {
                  version: rsp.data.latest.requiredAppVersion,
                  defaultValue: `Update the application to ${rsp.data.latest.requiredAppVersion} before installing this system update`
                })
              : rsp.data.error.includes('Paranoid Firewall')
                ? t('settings.update.paranoidBlocked')
                : t('settings.update.system.queryFailed')
          );
          return;
        }

        if (rsp.data.latest?.version) {
          const isLatest = isVersionAtLeast(rsp.data.current.version, rsp.data.latest.version);
          setSystemStatus(isLatest ? 'latest' : 'outdated');
        } else {
          setSystemStatus('latest');
        }
      })
      .catch(() => {
        setSystemAppUpdateRequired(false);
        setSystemStatus('failed');
        setSystemErrMsg(t('settings.update.system.queryFailed'));
      })
      .finally(() => {
        refreshSystemUpdateStatus();
      });
  }

  function refreshSystemUpdateStatus() {
    api
      .getSystemUpdateStatus()
      .then((rsp: any) => {
        if (rsp.code !== 0 || !rsp.data) return;
        const progress = rsp.data.progress || null;
        const staged = rsp.data.staged || null;
        const pending = rsp.data.pending || null;

        setSystemCurrent(rsp.data.current);
        setSystemStaged(staged);
        setSystemPending(pending);
        setSystemBootHealth(rsp.data.bootHealth || null);
        setSystemRollback(rsp.data.rollback || null);
        setSystemProgress(progress);

        if (progress?.phase === 'failed') {
          setRawInstallWaiting(false);
          setSystemStatus('failed');
          setSystemErrMsg(progress.message || t('settings.update.system.queryFailed'));
          return;
        }

        if (progress?.operation && progress.phase !== 'done') {
          if (progress.operation === 'install' && pending?.backupId?.startsWith('raw-')) {
            setRawInstallWaiting(true);
          }
          if (progress.operation === 'download') setSystemStatus('downloading');
          else if (progress.operation === 'install') setSystemStatus('installing');
          else if (progress.operation === 'rollback') setSystemStatus('rollingBack');
          else if (progress.operation === 'confirm') setSystemStatus('confirming');
          return;
        }

        if (pending) {
          setSystemStatus('installed');
          return;
        }

        if (staged) {
          setSystemStatus('staged');
        }
      })
      .catch(() => {
        setSystemStaged(null);
        setSystemPending(null);
        setSystemBootHealth(null);
        setSystemRollback(null);
        setSystemProgress(null);
      });
  }

  function downloadSystemUpdate() {
    if (onlineUpdatesBlocked) {
      setSystemStatus('failed');
      setSystemErrMsg(t('settings.update.paranoidBlocked'));
      return;
    }
    if (!systemLatest || systemStatus === 'downloading') return;

    setIsLocked(true);
    setSystemStatus('downloading');
    setSystemErrMsg('');

    api
      .downloadSystemUpdate()
      .then((rsp: any) => {
        if (rsp.code !== 0 || !rsp.data) {
          setSystemStatus('failed');
          setSystemErrMsg(t('settings.update.system.downloadFailed'));
          return;
        }

        setSystemCurrent(rsp.data.current);
        setSystemLatest(rsp.data.latest);
        setSystemStaged(rsp.data.staged);
        setSystemStatus('staged');
      })
      .catch(() => {
        setSystemStatus('failed');
        setSystemErrMsg(t('settings.update.system.downloadFailed'));
      })
      .finally(() => {
        refreshSystemUpdateStatus();
        setIsLocked(false);
      });
  }

  function confirmInstallSystemUpdate() {
    if (!systemStaged || systemStatus === 'installing' || !stagedAppRequirementMet) return;

    confirm({
      danger: !!systemStaged.destructive,
      title: t('settings.update.system.installConfirmTitle'),
      content: systemStaged.destructive ? (
        <div className="space-y-3">
          <div>{t('settings.update.system.rawInstallConfirmDesc')}</div>
          <Alert type="error" showIcon message={t('settings.update.system.rawInstallWarning')} />
        </div>
      ) : (
        t('settings.update.system.installConfirmDesc')
      ),
      okText: t('settings.update.system.install'),
      cancelText: t('settings.update.cancel'),
      onOk: installSystemUpdate
    });
  }

  function installSystemUpdate() {
    setIsLocked(true);
    setSystemStatus('installing');
    setSystemErrMsg('');

    return api
      .installSystemUpdate()
      .then((rsp: any) => {
        if (rsp.code !== 0 || !rsp.data) {
          setSystemStatus('failed');
          setSystemErrMsg(t('settings.update.system.installFailed'));
          return;
        }

        setSystemPending(rsp.data.installed);
        setSystemStatus('installed');
        if (rsp.data.installed?.backupId?.startsWith('raw-')) setRawInstallWaiting(true);
        refreshSystemUpdateStatus();
      })
      .catch(() => {
        setSystemStatus('failed');
        setSystemErrMsg(t('settings.update.system.installFailed'));
      })
      .finally(() => {
        refreshSystemUpdateStatus();
        setIsLocked(false);
      });
  }

  function confirmSystemUpdate() {
    if (!systemPending || systemStatus === 'confirming') return;

    setIsLocked(true);
    setSystemStatus('confirming');
    setSystemErrMsg('');

    api
      .confirmSystemUpdate()
      .then((rsp: any) => {
        if (rsp.code !== 0 || !rsp.data) {
          setSystemStatus('failed');
          setSystemErrMsg(t('settings.update.system.confirmFailed'));
          return;
        }

        setSystemPending(null);
        setSystemBootHealth(null);
        setSystemStatus('confirmed');
        refreshSystemUpdateStatus();
      })
      .catch(() => {
        setSystemStatus('failed');
        setSystemErrMsg(t('settings.update.system.confirmFailed'));
      })
      .finally(() => {
        setIsLocked(false);
      });
  }

  function confirmRollbackSystemUpdate() {
    if (!systemRollback || systemStatus === 'rollingBack') return;

    confirm({
      title: t('settings.update.system.rollbackConfirmTitle'),
      content: t('settings.update.system.rollbackConfirmDesc'),
      okText: t('settings.update.system.rollback'),
      cancelText: t('settings.update.cancel'),
      onOk: rollbackSystemUpdate
    });
  }

  function rollbackSystemUpdate() {
    setIsLocked(true);
    setSystemStatus('rollingBack');
    setSystemErrMsg('');

    return api
      .rollbackSystemUpdate()
      .then((rsp: any) => {
        if (rsp.code !== 0 || !rsp.data) {
          setSystemStatus('failed');
          setSystemErrMsg(t('settings.update.system.rollbackFailed'));
          return;
        }

        setSystemRollback(rsp.data.restored);
        setSystemPending(null);
        setSystemStatus('rolledBack');
        refreshSystemUpdateStatus();
      })
      .catch(() => {
        setSystemStatus('failed');
        setSystemErrMsg(t('settings.update.system.rollbackFailed'));
      })
      .finally(() => {
        refreshSystemUpdateStatus();
        setIsLocked(false);
      });
  }

  function update() {
    if (onlineUpdatesBlocked) {
      setStatus('failed');
      setErrMsg(t('settings.update.paranoidBlocked'));
      return;
    }
    if (status !== 'outdated') return;

    setIsLocked(true);
    setStatus('updating');

    api
      .update()
      .then((rsp: any) => {
        if (rsp.code !== 0) {
          setStatus('failed');
          setErrMsg(t('settings.update.updateFailed'));
        }
      })
      .finally(() => {
        setTimeout(() => {
          setIsLocked(false);
          setErrMsg('');

          window.location.reload();
        }, 12000);
      });
  }

  function confirmInstallStagedApplication() {
    if (!appStaged) return;

    confirm({
      title: t('settings.update.offline.installTitle'),
      content: t('settings.update.offline.installDesc'),
      okText: t('settings.update.system.install'),
      cancelText: t('settings.update.cancel'),
      onOk: installStagedApplication
    });
  }

  // the server restarts on its own; the page reloads once it is back
  async function installStagedApplication() {
    setIsLocked(true);
    setStatus('updating');
    setErrMsg('');

    const rsp = await attempt(() => api.installApplicationUpdate());
    if (!rsp) {
      setStatus('failed');
      setErrMsg(t('settings.update.updateFailed'));
      setIsLocked(false);
      return;
    }

    setAppStaged(null);
    setTimeout(() => {
      setIsLocked(false);
      window.location.reload();
    }, 12000);
  }

  async function discardStagedApplication() {
    const rsp = await attempt(() => api.discardStagedApplication());
    if (rsp) setAppStaged(null);
  }

  function info(label: string, value?: string | null, description?: ReactNode) {
    return value ? (
      <InfoRow key={label} label={label} value={value} description={description} />
    ) : null;
  }

  // the card appears below the upload rows, so bring it into view
  function showStaged(id: string) {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }, 50);
  }

  function handleUploadedApplicationUpdate(data: ApplicationStagedUpdate) {
    setAppStaged(data);
    showStaged('staged-application');
  }

  function handleUploadedSystemUpdate(data: any) {
    setSystemCurrent(data.current);
    setSystemLatest(data.latest);
    setSystemStaged(data.staged);
    setSystemStatus('staged');
    refreshSystemUpdateStatus();
    showStaged('staged-system');
  }

  function formatBytes(value?: number) {
    if (!value) return '';
    if (value >= 1024 * 1024) return `${(value / 1024 / 1024).toFixed(1)} MiB`;
    if (value >= 1024) return `${(value / 1024).toFixed(1)} KiB`;
    return `${value} B`;
  }

  function stagedMatchesLatest(staged: SystemStagedUpdate | null, latest: SystemLatest | null) {
    if (!staged || !latest || staged.signer) return true;

    return (
      staged.version === latest.version &&
      staged.archiveName === latest.name &&
      staged.sha256 === latest.sha256
    );
  }

  const isStagedLatest = stagedMatchesLatest(systemStaged, systemLatest);
  // a signer means the bundle was uploaded, and it is installed from the Offline updates section
  const uploadedSystem = !!systemStaged?.signer;
  const onlineStaged = uploadedSystem ? null : systemStaged;
  const stagedAppRequirementMet =
    !systemStaged?.requiredAppVersion ||
    (!!currentVersion && isVersionAtLeast(currentVersion, systemStaged.requiredAppVersion));
  const canDownloadLatestSystemUpdate =
    !!systemLatest &&
    !onlineUpdatesBlocked &&
    !systemAppUpdateRequired &&
    (!systemStaged || !isStagedLatest) &&
    systemStatus !== 'downloading';
  const showSystemProgress =
    !!systemProgress && !(systemProgress.phase === 'failed' && canDownloadLatestSystemUpdate);

  const refreshButton = (
    <Button key="refresh" onClick={refreshFirewallStatus}>
      {t('settings.update.system.refresh')}
    </Button>
  );
  const releaseNotesButton = (url?: string) =>
    url ? (
      <Button key="release" href={url} target="_blank" rel="noreferrer">
        {t('settings.update.system.releaseNotes')}
      </Button>
    ) : null;
  const downloadButton = (
    <Button
      key="download"
      type="primary"
      disabled={onlineUpdatesBlocked}
      onClick={downloadSystemUpdate}
    >
      {t('settings.update.system.downloadVerify')}
    </Button>
  );
  const rollbackButton = systemRollback ? (
    <Button key="rollback" danger onClick={confirmRollbackSystemUpdate}>
      {t('settings.update.system.rollback')}
    </Button>
  ) : null;
  const installButton = (disabled: boolean) => (
    <Button key="install" danger disabled={disabled} onClick={confirmInstallSystemUpdate}>
      {t('settings.update.system.install')}
    </Button>
  );

  // what the Application section says about its state, as the caption of the version
  const applicationLoading = status === 'loading';
  const applicationBusy = status === 'updating';
  const applicationText = status === 'updating' ? t('settings.update.updating') : '';
  // what the check found, and what it says under the latest version
  const applicationCheck: CheckState =
    status === 'loading'
      ? 'checking'
      : status === 'latest'
        ? 'latest'
        : status === 'outdated' || status === 'updating' || (status === 'failed' && latestVersion)
          ? 'available'
          : status === 'failed'
            ? 'failed'
            : undefined;
  const applicationCheckText =
    status === 'outdated' ? t('settings.update.available') : status === 'failed' ? errMsg : '';

  // what the System section says about its state, and the buttons that go with it
  let systemTitle = '';
  let systemText = '';
  let systemBusy = false;
  let systemError = false;
  let systemButtons: ReactNode[] = [];
  // the captions of the version rows; the status line says it when the row is not there
  let versionCaption = '';
  let stagedCaption = '';
  let pendingCaption = '';
  const captionVersion = (text: string) => {
    if (systemCurrent) versionCaption = text;
    else systemText = text;
  };
  const systemCurrentVersion = systemCurrent?.version;
  if (systemStatus === 'loading') {
    systemBusy = true;
  } else if (systemStatus === 'downloading') {
    systemBusy = true;
    systemText = systemProgress?.message || t('settings.update.system.downloading');
  } else if (
    systemStatus === 'installing' ||
    systemStatus === 'rollingBack' ||
    systemStatus === 'confirming'
  ) {
    systemBusy = true;
    systemText =
      systemStatus === 'confirming'
        ? t('settings.update.system.confirming')
        : systemStatus === 'installing'
          ? systemProgress?.message || t('settings.update.system.installing')
          : t('settings.update.system.rollingBack');
  } else if (systemStatus === 'latest' && systemCurrent) {
    systemButtons = [refreshButton, rollbackButton];
  } else if (systemStatus === 'staged' && uploadedSystem) {
    systemButtons = [refreshButton, rollbackButton];
  } else if (systemStatus === 'staged' && systemStaged && isStagedLatest) {
    stagedCaption = t('settings.update.system.stagedDesc');
    systemButtons = [
      releaseNotesButton(systemLatest?.releaseNotesUrl),
      refreshButton,
      installButton(!stagedAppRequirementMet)
    ];
  } else if (systemStatus === 'staged' && systemStaged && !isStagedLatest && systemLatest) {
    captionVersion(t('settings.update.system.available'));
    systemButtons = [
      releaseNotesButton(systemLatest.releaseNotesUrl),
      downloadButton,
      refreshButton
    ];
  } else if (systemStatus === 'installed' && systemPending) {
    pendingCaption = t('settings.update.system.rebootRequired');
    systemButtons = [refreshButton];
  } else if (systemStatus === 'rolledBack' && systemRollback) {
    systemTitle = t('settings.update.system.rollbackDone');
    systemText = t('settings.update.system.rebootRequired');
    systemButtons = [refreshButton];
  } else if (systemStatus === 'confirmed') {
    systemTitle = t('settings.update.system.confirmed');
    systemText = t('settings.update.system.bootGood');
    systemButtons = [refreshButton];
  } else if (systemStatus === 'outdated' && systemCurrent && systemLatest) {
    captionVersion(t('settings.update.system.available'));
    systemButtons = [
      releaseNotesButton(systemLatest.releaseNotesUrl),
      downloadButton,
      refreshButton,
      rollbackButton
    ];
  } else if (systemStatus === 'failed') {
    systemError = !canDownloadLatestSystemUpdate;
    captionVersion(
      canDownloadLatestSystemUpdate ? t('settings.update.system.available') : systemErrMsg
    );
    systemButtons = [
      refreshButton,
      canDownloadLatestSystemUpdate ? downloadButton : null,
      onlineStaged && isStagedLatest && stagedAppRequirementMet ? installButton(false) : null,
      rollbackButton
    ];
  }
  if (systemPending && systemBootHealth?.healthy && !systemBusy) {
    systemButtons.push(
      <Button key="confirmBoot" type="primary" onClick={confirmSystemUpdate}>
        {t('settings.update.system.confirmBoot')}
      </Button>
    );
  }

  // what the check found for the system, whichever state the update itself is in
  const systemCheck: CheckState =
    systemStatus === 'loading'
      ? 'checking'
      : systemStatus === 'failed' && systemError
        ? 'failed'
        : systemLatest && systemCurrent
          ? isVersionAtLeast(systemCurrent.version, systemLatest.version)
            ? 'latest'
            : 'available'
          : undefined;

  return (
    <>
      <PageHeader title={t('settings.update.title')} />

      <div className="flex min-w-0 flex-col space-y-6">
        {onlineUpdatesBlocked && (
          <Alert
            type="error"
            showIcon
            message={t('settings.update.paranoidBlocked')}
            description={t('settings.update.paranoidBlockedDesc')}
          />
        )}

        <SettingSection title={t('settings.update.application.title')} busy={applicationLoading}>
          <div className="flex flex-col space-y-3">
            <InfoRow
              label={t('settings.update.currentVersion')}
              description={
                applicationBusy || applicationText ? (
                  <span className="inline-flex items-center gap-2">
                    {applicationBusy && (
                      <Spin
                        size="small"
                        indicator={<LoaderCircleIcon className="animate-spin" size={14} />}
                      />
                    )}
                    {applicationText}
                  </span>
                ) : undefined
              }
              value={currentVersion}
            />
            <InfoRow
              label={<LatestLabel check={applicationCheck} />}
              description={
                applicationCheckText ? (
                  <span className={status === 'failed' ? 'text-red-400' : undefined}>
                    {applicationCheckText}
                  </span>
                ) : undefined
              }
              value={latestVersion}
            />
          </div>

          <StatusRow
            buttons={
              applicationBusy || applicationLoading
                ? []
                : [
                    refreshButton,
                    status === 'outdated' ? (
                      <Button
                        key="confirm"
                        type="primary"
                        disabled={onlineUpdatesBlocked}
                        onClick={update}
                      >
                        {t('settings.update.confirm')}
                      </Button>
                    ) : null
                  ]
            }
          />
        </SettingSection>

        <Divider className="opacity-50" />

        <SettingSection title={t('settings.system.title')} busy={systemStatus === 'loading'}>
          <div className="flex flex-col space-y-3">
            <InfoRow label={t('settings.update.currentVersion')} value={systemCurrentVersion} />
            <InfoRow
              label={<LatestLabel check={systemCheck} />}
              description={
                versionCaption ? (
                  <span className={systemError ? 'text-red-400' : undefined}>{versionCaption}</span>
                ) : undefined
              }
              value={systemLatest?.version}
            />
            {info(t('settings.update.system.kernel'), systemCurrent?.kernelVersion)}
            {info(t('settings.update.system.requiredAppVersion'), systemLatest?.requiredAppVersion)}
            {info(t('settings.update.system.stagedVersion'), onlineStaged?.version, stagedCaption)}
            {info(t('settings.update.system.requiredAppVersion'), onlineStaged?.requiredAppVersion)}
            {info(t('settings.update.system.archive'), onlineStaged?.archiveName)}
            {info(t('settings.update.local.signer'), onlineStaged?.signer ?? undefined)}
            {info(
              t('settings.update.system.requiredFree'),
              onlineStaged ? formatBytes(onlineStaged.requiredFreeBytes) : undefined
            )}
            {info(t('settings.update.system.fileCount'), onlineStaged?.fileCount.toString())}
            {info(
              t('settings.update.system.rawImages'),
              onlineStaged?.destructive ? onlineStaged.imageCount.toString() : undefined
            )}
            {showSystemProgress &&
              info(
                t('settings.update.system.progress'),
                `${systemProgress.operation}/${systemProgress.phase}`
              )}
            {showSystemProgress &&
              info(t('settings.update.system.progressMessage'), systemProgress?.message)}
            {info(
              t('settings.update.system.pendingVersion'),
              systemPending?.version,
              pendingCaption
            )}
            {systemBootHealth &&
              info(
                t('settings.update.system.bootHealth'),
                systemBootHealth.healthy
                  ? t('settings.update.system.healthy')
                  : t('settings.update.system.unhealthy')
              )}
            {info(t('settings.update.system.rollbackBackup'), systemRollback?.backupId)}
          </div>

          <StatusRow
            busy={systemBusy && systemStatus !== 'loading'}
            error={systemError}
            title={systemTitle}
            text={systemText}
            buttons={systemButtons}
          />
        </SettingSection>

        <Divider className="opacity-50" />

        <SettingSection title={t('settings.update.offline.section')}>
          <ApplicationUpload
            disabled={applicationLoading || applicationBusy}
            onStaged={handleUploadedApplicationUpdate}
            setBusy={setIsLocked}
          />
          <SystemUpload
            disabled={systemBusy}
            onStaged={handleUploadedSystemUpdate}
            setBusy={setIsLocked}
          />
          <LocalKeyRow />

          <StatusRow busy={applicationBusy} text={applicationText} buttons={[]} />

          {appStaged && (
            <StagedCard
              id="staged-application"
              title={t('settings.update.application.title')}
              rows={[
                info(t('settings.update.system.stagedVersion'), appStaged.version),
                info(t('settings.update.system.archive'), appStaged.name),
                info(t('settings.update.local.signer'), appStaged.signer)
              ]}
              buttons={[
                <Button key="discard" onClick={discardStagedApplication}>
                  {t('common.discard')}
                </Button>,
                <Button
                  key="install"
                  type="primary"
                  danger
                  onClick={confirmInstallStagedApplication}
                >
                  {t('settings.update.system.install')}
                </Button>
              ]}
            />
          )}
          {systemStaged && uploadedSystem && (
            <StagedCard
              id="staged-system"
              title={t('settings.system.title')}
              rows={[
                info(t('settings.update.system.stagedVersion'), systemStaged.version),
                info(
                  t('settings.update.system.requiredAppVersion'),
                  systemStaged.requiredAppVersion
                ),
                info(t('settings.update.system.archive'), systemStaged.archiveName),
                info(t('settings.update.local.signer'), systemStaged.signer),
                info(
                  t('settings.update.system.requiredFree'),
                  formatBytes(systemStaged.requiredFreeBytes)
                ),
                info(t('settings.update.system.fileCount'), systemStaged.fileCount.toString())
              ]}
              buttons={[installButton(!stagedAppRequirementMet || systemBusy)]}
            />
          )}
        </SettingSection>

        <div className="flex justify-end">
          <Button
            type="link"
            size="small"
            href="https://github.com/woffko/Hardened_NanoKVM/blob/main/CHANGELOG.md"
            target="_blank"
          >
            Changelog
          </Button>
        </div>
      </div>

      <InstallWait
        open={rawInstallWaiting}
        onFailed={(message) => {
          setRawInstallWaiting(false);
          setSystemStatus('failed');
          setSystemErrMsg(message);
        }}
      />
    </>
  );
};

type CheckState = 'checking' | 'latest' | 'available' | 'failed' | undefined;

const CHECK_COLORS = {
  checking: 'default',
  latest: 'green',
  available: 'blue',
  failed: 'red'
} as const;

// The label of the latest version, always shown, with a badge for what the check found.
const LatestLabel = ({ check }: { check: CheckState }) => {
  const { t } = useTranslation();

  return (
    <span className="flex items-center gap-2">
      {t('settings.update.latestVersion')}
      {check && (
        <Tag className="m-0" color={CHECK_COLORS[check]}>
          {t(`settings.update.badge.${check}`)}
        </Tag>
      )}
    </span>
  );
};

type StagedCardProps = {
  id: string;
  title: string;
  rows: ReactNode[];
  buttons: ReactNode[];
};

// A verified bundle waiting for its install: what it is, and the buttons to install or drop it.
const StagedCard = ({ id, title, rows, buttons }: StagedCardProps) => {
  const { t } = useTranslation();

  return (
    <div
      id={id}
      className="box-border flex min-w-0 flex-col space-y-3 rounded-lg border border-solid border-neutral-700 p-3"
    >
      <div className="flex min-w-0 flex-col space-y-0.5">
        <span className="text-sm text-neutral-300">{title}</span>
        <span className="text-xs text-neutral-500">{t('settings.update.offline.staged')}</span>
      </div>
      {rows}
      <div className="flex flex-wrap justify-end gap-2">{buttons}</div>
    </div>
  );
};

type StatusRowProps = {
  busy?: boolean;
  error?: boolean;
  title?: string;
  text?: string;
  buttons: ReactNode[];
};

// What a section says about its state, and its buttons, on one row; the buttons wrap under the
// text on a narrow screen.
const StatusRow = ({ busy = false, error = false, title, text, buttons }: StatusRowProps) => {
  const shown = buttons.filter(Boolean);
  if (!busy && !title && !text && shown.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex min-w-0 flex-col space-y-1 sm:flex-1 sm:basis-60">
        {title && <span className="text-sm text-neutral-300">{title}</span>}
        {(busy || text) && (
          <span
            className={`flex items-center gap-2 break-words text-xs ${error ? 'text-red-400' : 'text-neutral-500'}`}
          >
            {busy && (
              <Spin
                size="small"
                indicator={<LoaderCircleIcon className="animate-spin" size={14} />}
              />
            )}
            {text}
          </span>
        )}
      </div>
      {shown.length > 0 && (
        <div className="ml-auto flex min-w-0 flex-wrap justify-end gap-2">{shown}</div>
      )}
    </div>
  );
};
