import { useEffect, useState } from 'react';
import { Button, Divider, Modal, Segmented, Tooltip } from 'antd';
import clsx from 'clsx';
import { useSetAtom } from 'jotai';
import { DiscIcon, HardDriveIcon, TriangleAlertIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/storage.ts';
import { attempt } from '@/lib/feedback.ts';
import { IMAGE_LIST_CHANGED_EVENT } from '@/lib/image-events.ts';
import { isKeyboardEnableAtom } from '@/jotai/keyboard.ts';
import { submenuOpenCountAtom } from '@/jotai/settings.ts';
import { useImageStorage } from '@/hooks/useImageStorage.ts';

import { AddImage } from './add-image.tsx';
import { Images } from './images.tsx';
import { Tips } from './tips.tsx';

export const Image = () => {
  const { t } = useTranslation();
  const setSubmenuOpenCount = useSetAtom(submenuOpenCountAtom);
  const setIsKeyboardEnable = useSetAtom(isKeyboardEnableAtom);
  const storage = useImageStorage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [mode, setMode] = useState('mass-storage');

  const modes = [
    {
      value: 'mass-storage',
      label: (
        <div className="flex items-center space-x-1">
          <HardDriveIcon size={16} />
          <span>Mass Storage</span>
        </div>
      )
    },
    {
      value: 'cd-rom',
      label: (
        <div className="flex items-center space-x-1">
          <DiscIcon size={16} />
          <span>CD ROM</span>
        </div>
      )
    }
  ];

  useEffect(() => {
    getImageState();

    const handleImageUpdated = () => {
      getImageState();
    };
    window.addEventListener(IMAGE_LIST_CHANGED_EVENT, handleImageUpdated);

    return () => {
      window.removeEventListener(IMAGE_LIST_CHANGED_EVENT, handleImageUpdated);
    };
  }, []);

  // readers of the mounted image and of the CD-ROM flag: the icon state and the
  // mode selector here, and the same state in the mount panel
  function getImageState() {
    attempt(() => api.getMountedImage(), { quiet: true }).then((rsp) => {
      if (rsp) setIsMounted(!!rsp.data?.file);
    });

    attempt(() => api.getCdRom(), { quiet: true }).then((rsp) => {
      if (rsp) setMode(rsp.data?.cdrom === 1 ? 'cd-rom' : 'mass-storage');
    });
  }

  function toggleModal(open: boolean) {
    setIsModalOpen(open);
    // typing in the add form must not reach the host
    setIsKeyboardEnable(!open);
    if (open) storage.refresh();
    setSubmenuOpenCount((count) => (open ? count + 1 : Math.max(0, count - 1)));
  }

  return (
    <>
      <Tooltip title={t('image.title')} placement="bottom" mouseEnterDelay={0.6}>
        <div
          className={clsx(
            'flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded hover:bg-neutral-700',
            isMounted ? 'text-blue-500' : 'text-neutral-300 hover:text-white'
          )}
          onClick={() => toggleModal(true)}
        >
          <DiscIcon size={18} />
        </div>
      </Tooltip>

      <Modal
        title={
          <div className="flex items-center space-x-1">
            <span>{t('image.title')}</span>
            <Tips />
          </div>
        }
        open={isModalOpen}
        centered
        footer={null}
        onCancel={() => toggleModal(false)}
      >
        <div className="flex flex-col space-y-6">
          {!storage.isWritable && storage.isDiskShared && (
            <div className="flex items-start space-x-2 rounded border border-solid border-amber-500/40 bg-amber-500/10 p-3">
              <TriangleAlertIcon size={18} className="mt-0.5 shrink-0 text-amber-400" />
              <div className="flex flex-col items-start space-y-2">
                <span className="text-sm text-amber-200">{t('download.diskShared')}</span>
                <Button
                  type="primary"
                  size="small"
                  loading={storage.isDisablingDisk}
                  onClick={storage.disableDisk}
                >
                  {t('download.diskOff')}
                </Button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span>{t('image.mountMode')}</span>
            <Segmented value={mode} options={modes} disabled={isMounted} onChange={setMode} />
          </div>

          <Divider style={{ margin: '24px 0 0 0' }} />

          <Images
            isOpen={isModalOpen}
            cdrom={mode === 'cd-rom'}
            setCdrom={(nextCdrom) => setMode(nextCdrom ? 'cd-rom' : 'mass-storage')}
            setIsMounted={setIsMounted}
            isDiskShared={storage.isDiskShared}
            isDiskStateKnown={storage.isDiskStateKnown}
            refreshDiskState={storage.refresh}
          >
            <AddImage
              isOpen={isModalOpen}
              isWritable={storage.isWritable}
              isRemoteEnabled={storage.isRemoteEnabled}
              isDiskShared={storage.isDiskShared}
            />
          </Images>
        </div>
      </Modal>
    </>
  );
};
