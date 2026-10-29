import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, notification, Typography } from 'antd';
import clsx from 'clsx';
import {
  ArrowBigDownDashIcon,
  ArrowBigUpDashIcon,
  CableIcon,
  LoaderCircleIcon,
  PackageIcon,
  PackageSearchIcon,
  Trash2Icon
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/storage.ts';
import { getVirtualDevice, updateVirtualDevice } from '@/api/virtual-device.ts';
import { attempt, confirm, toast } from '@/lib/feedback.ts';
import { IMAGE_LIST_CHANGED_EVENT } from '@/lib/image-events.ts';
import { formatBytes } from '@/lib/image-transfer.ts';
import { client } from '@/lib/websocket.ts';

type ImagesProps = {
  isOpen: boolean;
  cdrom: boolean;
  setCdrom: (cdrom: boolean) => void;
  setIsMounted: (isMounted: boolean) => void;
};

export const Images = ({ isOpen, cdrom, setCdrom, setIsMounted }: ImagesProps) => {
  const { t } = useTranslation();
  const [notify, contextHolder] = notification.useNotification();

  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [sizes, setSizes] = useState<Record<string, number>>({});
  const [mountingImage, setMountingImage] = useState('');
  const [mountedImage, setMountedImage] = useState('');
  const [deletingImage, setDeletingImage] = useState('');
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [isDiskShared, setIsDiskShared] = useState(false);
  const [isDiskStateKnown, setIsDiskStateKnown] = useState(false);
  const [isListFailed, setIsListFailed] = useState(false);
  const isLoadingRef = useRef(false);

  // get mounted image
  const getMountedImage = useCallback(() => {
    attempt(() => api.getMountedImage()).then((rsp) => {
      if (!rsp) return;

      const file = rsp.data?.file;
      setMountedImage(file);
      setIsMounted(!!file);
    });
  }, [setIsMounted]);

  // get image list
  const getImages = useCallback(() => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);

    attempt(() => api.getImages())
      .then((rsp) => {
        setIsListFailed(!rsp);
        if (!rsp) return;

        const files = rsp.data?.files;

        if (files?.length > 0) {
          setImages(files);
          setSizes(rsp.data?.sizes ?? {});
          getMountedImage();
        } else {
          setImages([]);
          setSizes({});
        }
      })
      .finally(() => {
        isLoadingRef.current = false;
        setIsLoading(false);
      });
  }, [getMountedImage]);

  // the host writes /data while the virtual disk serves it, so images are
  // read-only here and can only be mounted, not deleted or uploaded
  const getDiskState = useCallback(() => {
    attempt(() => getVirtualDevice()).then((rsp) => {
      setIsDiskStateKnown(!!rsp);
      if (!rsp) return;

      setIsDiskShared(!!rsp.data?.disk);
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      getImages();
      getDiskState();
    }
  }, [getDiskState, getImages, isOpen]);

  useEffect(() => {
    function handleImageListChanged() {
      if (isOpen) {
        getImages();
        getDiskState();
      }
    }

    window.addEventListener(IMAGE_LIST_CHANGED_EVENT, handleImageListChanged);
    return () => window.removeEventListener(IMAGE_LIST_CHANGED_EVENT, handleImageListChanged);
  }, [getDiskState, getImages, isOpen]);

  // mounting an image takes the mass storage device away from the virtual disk,
  // so ask the user before the virtual disk changes on the computer
  function mountImage(image: string) {
    if (mountingImage) return;

    // unmounting leaves the virtual disk alone
    if (mountedImage === image) {
      doMountImage(image);
      return;
    }

    attempt(() => getVirtualDevice()).then((rsp) => {
      if (!rsp) return;

      const diskOn = !!rsp.data?.disk;
      confirm({
        title: t('image.mountTitle'),
        okText: t('image.mountTitle'),
        content: (
          <div className="space-y-1">
            <p>{t(diskOn ? 'image.diskOnWarn' : 'image.diskOffWarn')}</p>
            <Typography.Text code>{fileName(image)}</Typography.Text>
          </div>
        ),
        onOk: () => confirmMountImage(image, diskOn)
      });
    });
  }

  // turn the virtual disk on, then mount
  async function confirmMountImage(image: string, diskOn: boolean) {
    // the media device only exists while the virtual disk is enabled
    if (!diskOn) {
      const rsp = await updateVirtualDevice('disk');
      if (rsp.code !== 0) {
        console.log(rsp.msg);
        openNotification(false, rsp.msg);
        return;
      }
    }

    doMountImage(image);
  }

  // mount/unmount image
  function doMountImage(image: string, force = false) {
    if (mountingImage) return;
    setMountingImage(image);

    client.close();

    const isMounted = mountedImage === image;
    const filename = isMounted ? '' : image;
    const imageCdrom = isImageCdrom(image) && cdrom;
    const nextCdrom = isMounted ? false : imageCdrom;

    api
      .mountImage(filename, nextCdrom, force)
      .then((rsp) => {
        // the computer has locked the medium, so offer to force the eject
        if (rsp.code === api.MEDIA_LOCKED_CODE) {
          confirm({
            danger: true,
            title: t('image.forceEject'),
            content: (
              <div className="space-y-1">
                <p>{t('image.forceEjectConfirm')}</p>
                <Typography.Text code>{fileName(image)}</Typography.Text>
              </div>
            ),
            okText: t('image.forceEject'),
            onOk: () => doMountImage(image, true)
          });
          return;
        }

        if (rsp.code !== 0) {
          console.log(rsp.msg);
          openNotification(isMounted, rsp.msg);
          return;
        }

        setMountedImage(filename);
        setIsMounted(!!filename);
        setCdrom(nextCdrom);
      })
      .finally(() => {
        setMountingImage('');
        client.connect();
        getDiskState();
      });
  }

  // show delete image modal
  function showDeleteModal(e: any, image: string) {
    e.stopPropagation();

    const isMounted = mountedImage === image;
    const isDeleting = deletingImage !== '';

    if (isMounted || isDeleting || isDiskShared || !isDiskStateKnown) {
      return;
    }

    confirm({
      danger: true,
      title: t('image.deleteTitle'),
      content: (
        <div className="space-y-1">
          <p>{t('image.deleteConfirm')}</p>
          <Typography.Text code>{image}</Typography.Text>
        </div>
      ),
      okText: t('common.delete'),
      onOk: () => deleteImage(image)
    });
  }

  // delete image
  function deleteImage(image: string) {
    if (deletingImage) return;
    setDeletingImage(image);

    attempt(() => api.deleteImage(image))
      .then((rsp) => {
        if (!rsp) return;

        getImages();
      })
      .finally(() => {
        setDeletingImage('');
      });
  }

  function confirmReconnectUsbGadget() {
    confirm({
      title: t('image.usbReconnect'),
      content: t('image.usbReconnectConfirm'),
      okText: t('image.usbReconnect'),
      onOk: reconnectUsbGadget
    });
  }

  function reconnectUsbGadget() {
    if (isReconnecting) return;

    setIsReconnecting(true);
    client.close();

    api
      .reconnectUsbGadget()
      .then((rsp) => {
        if (rsp.code !== 0) {
          notify.error({
            message: t('image.usbReconnectFailed'),
            description: rsp.msg || t('image.mountDesc'),
            duration: 10
          });
          return;
        }

        toast.success(t('image.usbReconnectSuccess'));
        getMountedImage();
      })
      .finally(() => {
        setIsReconnecting(false);
        client.connect();
      });
  }

  // show mount/unmount failed notification
  function openNotification(isMounted: boolean, apiMessage?: string) {
    const message = isMounted ? 'image.unmountFailed' : 'image.mountFailed';
    const description = isMounted ? 'image.unmountDesc' : 'image.mountDesc';

    notify.error({
      message: t(message),
      description: apiMessage || t(description),
      duration: 10
    });
  }

  // loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2 py-5 text-neutral-400">
        <LoaderCircleIcon className="animate-spin" size={18} />
        <span className="text-sm">{t('image.loading')}</span>
      </div>
    );
  }

  // empty image
  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center space-x-2 py-5 text-neutral-500">
        <PackageSearchIcon size={18} />
        <span className="text-sm">
          {isListFailed ? t('common.actionFailed') : t('image.empty')}
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="flex max-h-[400px] flex-col overflow-y-auto pb-2">
        {images.map((image) => (
          <div
            key={image}
            className={clsx(
              'group flex cursor-pointer select-none items-center space-x-1 rounded px-1 py-2 hover:bg-neutral-700/70',
              mountedImage === image && 'text-blue-500'
            )}
            onClick={() => mountImage(image)}
          >
            <div className="flex h-[24px] w-[24px] items-center justify-center">
              {mountingImage === image ? (
                <LoaderCircleIcon className="animate-spin" size={18} />
              ) : (
                <PackageIcon size={18} />
              )}
            </div>

            <div className="flex-1 truncate">{image.replace(/^.*[\\/]/, '')}</div>
            {sizes[image] !== undefined && (
              <div className="shrink-0 text-xs text-neutral-500">{formatBytes(sizes[image])}</div>
            )}
            <div
              className={clsx(
                'rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase leading-none',
                isImageCdrom(image)
                  ? 'border-blue-500/50 bg-blue-500/10 text-blue-300'
                  : 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
              )}
            >
              {isImageCdrom(image) ? 'ISO' : 'IMG'}
            </div>

            <div className="flex h-[24px] w-[24px] items-center justify-center rounded">
              {mountedImage === image ? (
                <ArrowBigDownDashIcon size={22} className="hidden text-red-500 group-hover:block" />
              ) : (
                <ArrowBigUpDashIcon size={22} className="hidden text-blue-500 group-hover:block" />
              )}
            </div>

            <Button
              type="text"
              size="small"
              danger
              className="h-[24px] w-[24px] p-0"
              icon={<Trash2Icon size={16} />}
              disabled={mountedImage === image || isDiskShared || !isDiskStateKnown}
              loading={deletingImage === image}
              onClick={(e) => showDeleteModal(e, image)}
            />
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-end border-t border-neutral-700/70 pt-3">
        <Button
          size="small"
          icon={
            isReconnecting ? (
              <LoaderCircleIcon className="animate-spin" size={14} />
            ) : (
              <CableIcon size={14} />
            )
          }
          loading={isReconnecting}
          onClick={confirmReconnectUsbGadget}
        >
          {t('image.usbReconnect')}
        </Button>
      </div>

      {contextHolder}
    </>
  );
};

function fileName(path: string): string {
  return path.replace(/^.*[\\/]/, '');
}

function isImageCdrom(image: string): boolean {
  return image.toLowerCase().endsWith('.iso');
}
