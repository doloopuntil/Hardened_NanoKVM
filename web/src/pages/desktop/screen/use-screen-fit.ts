import type { CSSProperties, RefObject } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import type { Resolution } from '@/types';

type ScreenFit = {
  containerRef: RefObject<HTMLDivElement>;
  mediaStyle: CSSProperties;
};

export function useScreenFit(
  resolution: Resolution | null,
  videoScale: number,
  fallbackStyle: CSSProperties
): ScreenFit {
  const containerRef = useRef<HTMLDivElement>(null);
  const isBigScreen = useMediaQuery({ minWidth: 850 });
  const [fitScale, setFitScale] = useState(1);

  useEffect(() => {
    function updateFitScale() {
      if (isBigScreen || !resolution?.width || !resolution?.height || !containerRef.current) {
        setFitScale(1);
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        return;
      }

      const nextScale = Math.min(rect.width / resolution.width, rect.height / resolution.height, 1);
      setFitScale(Math.max(0.05, nextScale));
    }

    updateFitScale();

    const container = containerRef.current;
    if (typeof ResizeObserver === 'undefined' || !container) {
      window.addEventListener('resize', updateFitScale);
      window.addEventListener('orientationchange', updateFitScale);
      return () => {
        window.removeEventListener('resize', updateFitScale);
        window.removeEventListener('orientationchange', updateFitScale);
      };
    }

    const observer = new ResizeObserver(updateFitScale);
    observer.observe(container);
    window.addEventListener('orientationchange', updateFitScale);

    return () => {
      observer.disconnect();
      window.removeEventListener('orientationchange', updateFitScale);
    };
  }, [isBigScreen, resolution?.height, resolution?.width]);

  useEffect(() => {
    if (isBigScreen || !containerRef.current) return;

    const frame = window.requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;

      container.scrollLeft = Math.max(0, (container.scrollWidth - container.clientWidth) / 2);
      container.scrollTop = Math.max(0, (container.scrollHeight - container.clientHeight) / 2);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [fitScale, isBigScreen, resolution?.height, resolution?.width, videoScale]);

  const mediaStyle = useMemo<CSSProperties>(() => {
    const scale = (isBigScreen ? 1 : fitScale) * videoScale;

    if (!resolution?.width || !resolution?.height) {
      return {
        ...fallbackStyle,
        transform: `scale(${videoScale})`,
        transformOrigin: 'center'
      };
    }

    if (!isBigScreen) {
      return {
        width: Math.max(1, Math.round(resolution.width * scale)),
        height: Math.max(1, Math.round(resolution.height * scale)),
        objectFit: 'cover'
      };
    }

    return {
      width: resolution.width,
      height: resolution.height,
      objectFit: 'cover',
      transform: `scale(${scale})`,
      transformOrigin: 'center'
    };
  }, [fallbackStyle, fitScale, isBigScreen, resolution?.height, resolution?.width, videoScale]);

  return { containerRef, mediaStyle };
}
