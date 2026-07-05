export type ScreenGeometry = {
  elementLeft: number;
  elementTop: number;
  elementWidth: number;
  elementHeight: number;
  contentLeft: number;
  contentTop: number;
  contentWidth: number;
  contentHeight: number;
};

type MediaSize = {
  width: number;
  height: number;
};

export function getScreenGeometry(screen: Element): ScreenGeometry | null {
  const rect = screen.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return null;

  const fallback = {
    elementLeft: rect.left,
    elementTop: rect.top,
    elementWidth: rect.width,
    elementHeight: rect.height,
    contentLeft: rect.left,
    contentTop: rect.top,
    contentWidth: rect.width,
    contentHeight: rect.height
  };

  const mediaSize = getMediaSize(screen);
  if (!mediaSize || mediaSize.width <= 0 || mediaSize.height <= 0) {
    return fallback;
  }

  const objectFit = window.getComputedStyle(screen).objectFit || 'fill';
  if (objectFit === 'fill') {
    return fallback;
  }

  const scale = getObjectFitScale(objectFit, rect.width, rect.height, mediaSize);
  const contentWidth = mediaSize.width * scale;
  const contentHeight = mediaSize.height * scale;

  return {
    elementLeft: rect.left,
    elementTop: rect.top,
    elementWidth: rect.width,
    elementHeight: rect.height,
    contentLeft: rect.left + (rect.width - contentWidth) / 2,
    contentTop: rect.top + (rect.height - contentHeight) / 2,
    contentWidth,
    contentHeight
  };
}

export function clientPointToScreenRatio(
  screen: Element,
  clientX: number,
  clientY: number
): { x: number; y: number } {
  const geometry = getScreenGeometry(screen);
  if (!geometry) return { x: 0, y: 0 };

  return {
    x: (clientX - geometry.contentLeft) / geometry.contentWidth,
    y: (clientY - geometry.contentTop) / geometry.contentHeight
  };
}

export function screenRatioToClientPoint(
  screen: Element,
  xRatio: number,
  yRatio: number
): { x: number; y: number } | null {
  const geometry = getScreenGeometry(screen);
  if (!geometry) return null;

  return {
    x: clamp(
      geometry.contentLeft + geometry.contentWidth * clamp01(xRatio),
      geometry.elementLeft,
      geometry.elementLeft + geometry.elementWidth
    ),
    y: clamp(
      geometry.contentTop + geometry.contentHeight * clamp01(yRatio),
      geometry.elementTop,
      geometry.elementTop + geometry.elementHeight
    )
  };
}

function getObjectFitScale(
  objectFit: string,
  elementWidth: number,
  elementHeight: number,
  mediaSize: MediaSize
): number {
  const containScale = Math.min(elementWidth / mediaSize.width, elementHeight / mediaSize.height);

  if (objectFit === 'cover') {
    return Math.max(elementWidth / mediaSize.width, elementHeight / mediaSize.height);
  }

  if (objectFit === 'none') {
    return 1;
  }

  if (objectFit === 'scale-down') {
    return Math.min(1, containScale);
  }

  return containScale;
}

function getMediaSize(screen: Element): MediaSize | null {
  if (screen instanceof HTMLVideoElement && screen.videoWidth > 0 && screen.videoHeight > 0) {
    return { width: screen.videoWidth, height: screen.videoHeight };
  }

  if (screen instanceof HTMLImageElement && screen.naturalWidth > 0 && screen.naturalHeight > 0) {
    return { width: screen.naturalWidth, height: screen.naturalHeight };
  }

  if (screen instanceof HTMLCanvasElement && screen.width > 0 && screen.height > 0) {
    return { width: screen.width, height: screen.height };
  }

  return null;
}

function clamp01(value: number): number {
  return clamp(value, 0, 1);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
