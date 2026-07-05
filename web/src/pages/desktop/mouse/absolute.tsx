import { useEffect, useRef } from 'react';
import { useAtomValue } from 'jotai';
import { useMediaQuery } from 'react-responsive';

import { MouseReportAbsolute } from '@/lib/mouse.ts';
import { client, MessageEvent } from '@/lib/websocket.ts';
import { scrollDirectionAtom, scrollIntervalAtom } from '@/jotai/mouse.ts';
import { resolutionAtom } from '@/jotai/screen.ts';

import { emitMobileCursorAbsolute, emitMobileCursorHide } from './mobile-cursor-events.ts';
import { clientPointToScreenRatio, getScreenGeometry } from './screen-geometry.ts';
import { MouseAbsoluteEvent } from './types.ts';

enum MouseButton {
  Left = 0,
  Middle = 1,
  Right = 2,
  Back = 3,
  Forward = 4
}

const HID_ABSOLUTE_MAX = 0x7fff;
const HID_ABSOLUTE_CENTER = Math.round(HID_ABSOLUTE_MAX / 2);

export const Absolute = () => {
  const isMobile = useMediaQuery({ maxWidth: 849 });
  const resolution = useAtomValue(resolutionAtom);
  const scrollDirection = useAtomValue(scrollDirectionAtom);
  const scrollInterval = useAtomValue(scrollIntervalAtom);

  const mouseRef = useRef(new MouseReportAbsolute());
  const lastPosRef = useRef({ x: HID_ABSOLUTE_CENTER, y: HID_ABSOLUTE_CENTER });
  const lastResolutionKeyRef = useRef<string | null>(null);
  const lastScrollTimeRef = useRef(0);

  // For touch events
  const touchStartTimeRef = useRef(0);
  const lastTouchYRef = useRef(0);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPressRef = useRef(false);
  const hasMoveRef = useRef(false);
  const isDraggingRef = useRef(false);
  const pressedButtonRef = useRef<MouseButton | null>(null);
  const touchStartPosRef = useRef({ x: 0, y: 0 });
  const lastTouchPosRef = useRef({ x: 0, y: 0 });

  const TAP_THRESHOLD = 8;
  const DRAG_THRESHOLD = 10;
  const VELOCITY_THRESHOLD = 0.3;

  useEffect(() => {
    const resolutionKey = `${resolution?.width ?? 0}x${resolution?.height ?? 0}`;

    if (lastResolutionKeyRef.current === null) {
      lastResolutionKeyRef.current = resolutionKey;
      return;
    }

    if (lastResolutionKeyRef.current === resolutionKey) {
      return;
    }

    lastResolutionKeyRef.current = resolutionKey;

    if (!isMobile) {
      return;
    }

    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    if (pressedButtonRef.current !== null) {
      handleMouseEvent({ type: 'mouseup', button: pressedButtonRef.current });
    }

    isLongPressRef.current = false;
    hasMoveRef.current = false;
    isDraggingRef.current = false;
    pressedButtonRef.current = null;
    lastPosRef.current = { x: HID_ABSOLUTE_CENTER, y: HID_ABSOLUTE_CENTER };

    handleMouseEvent({ type: 'move', x: HID_ABSOLUTE_CENTER, y: HID_ABSOLUTE_CENTER });
    emitMobileCursorAbsolute(0.5, 0.5);
  }, [isMobile, resolution?.height, resolution?.width]);

  useEffect(() => {
    const screen = document.getElementById('screen') as HTMLElement | null;
    if (!screen) return;
    const screenElement = screen;
    const pointerSurface = document.getElementById('kvm-pointer-surface') as HTMLElement | null;
    const scrollContainer = screenElement.closest('[data-kvm-screen-scroll]') as HTMLElement | null;
    const mouseTarget = screenElement;
    const touchTarget = pointerSurface ?? screen;
    const gestureElements = uniqueElements([touchTarget, screen, scrollContainer]);
    const previousGestureStyles = gestureElements.map((element) => ({
      element,
      touchAction: element.style.touchAction,
      overscrollBehavior: element.style.overscrollBehavior,
      userSelect: element.style.userSelect,
      webkitUserSelect: element.style.webkitUserSelect
    }));
    const touchOptions: AddEventListenerOptions = { passive: false };

    for (const element of gestureElements) {
      element.style.touchAction = 'none';
      element.style.overscrollBehavior = 'contain';
      element.style.userSelect = 'none';
      element.style.webkitUserSelect = 'none';
    }

    mouseTarget.addEventListener('mousedown', handleMouseDown);
    mouseTarget.addEventListener('mouseup', handleMouseUp);
    mouseTarget.addEventListener('mousemove', handleMouseMove);
    mouseTarget.addEventListener('wheel', handleWheel);
    mouseTarget.addEventListener('click', disableEvent);
    mouseTarget.addEventListener('contextmenu', disableEvent);
    touchTarget.addEventListener('touchstart', handleTouchStart, touchOptions);
    touchTarget.addEventListener('touchmove', handleTouchMove, touchOptions);
    touchTarget.addEventListener('touchend', handleTouchEnd, touchOptions);
    touchTarget.addEventListener('touchcancel', handleTouchCancel, touchOptions);

    // Mouse down event
    function handleMouseDown(e: MouseEvent) {
      disableEvent(e);
      handleMouseEvent({ type: 'mousedown', button: e.button });
    }

    // Mouse up event
    function handleMouseUp(e: MouseEvent) {
      disableEvent(e);
      handleMouseEvent({ type: 'mouseup', button: e.button });
    }

    // Mouse move event
    function handleMouseMove(e: MouseEvent) {
      disableEvent(e);
      const { x, y } = getCoordinate(e);
      handleMouseEvent({ type: 'move', x, y });
    }

    // Mouse wheel event
    function handleWheel(e: WheelEvent) {
      disableEvent(e);

      if (Math.floor(e.deltaY) === 0) {
        return;
      }

      const currentTime = Date.now();
      if (currentTime - lastScrollTimeRef.current < scrollInterval) {
        return;
      }

      const deltaY = (e.deltaY > 0 ? 1 : -1) * scrollDirection;
      handleMouseEvent({ type: 'wheel', deltaY });
      lastScrollTimeRef.current = currentTime;
    }

    // Mouse touch start event
    function handleTouchStart(e: TouchEvent) {
      disableEvent(e);

      if (e.touches.length === 0) {
        return;
      }

      const touch = e.touches[0];

      // Reset states
      touchStartTimeRef.current = Date.now();
      lastTouchYRef.current = touch.clientY;
      isLongPressRef.current = false;
      hasMoveRef.current = false;
      isDraggingRef.current = false;
      pressedButtonRef.current = null;
      touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };
      lastTouchPosRef.current = { x: touch.clientX, y: touch.clientY };

      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }

      emitCurrentMobileCursorPosition();

      if (e.touches.length > 1) {
        return;
      }

      // Start long press
      longPressTimerRef.current = setTimeout(() => {
        isLongPressRef.current = true;
        pressedButtonRef.current = MouseButton.Right;
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }

        handleMouseEvent({ type: 'mousedown', button: MouseButton.Right });
      }, 800);
    }

    // Mouse touch move event
    function handleTouchMove(e: TouchEvent) {
      disableEvent(e);

      if (e.touches.length === 0) {
        return;
      }
      const touch = e.touches[0];

      // Handle two-finger scroll first
      if (e.touches.length > 1) {
        emitMobileCursorHide(0);
        const currentTime = Date.now();
        if (currentTime - lastScrollTimeRef.current < scrollInterval) {
          return;
        }

        const deltaY = (touch.clientY - lastTouchYRef.current > 0 ? 1 : -1) * scrollDirection;
        handleMouseEvent({ type: 'wheel', deltaY });

        lastTouchYRef.current = touch.clientY;
        lastScrollTimeRef.current = currentTime;
        return;
      }

      const deltaX = Math.abs(touch.clientX - touchStartPosRef.current.x);
      const deltaY = Math.abs(touch.clientY - touchStartPosRef.current.y);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const timeDelta = Date.now() - touchStartTimeRef.current;
      const velocity = timeDelta > 0 ? distance / timeDelta : 0;

      const shouldStartDrag =
        distance > DRAG_THRESHOLD || (distance > TAP_THRESHOLD && velocity > VELOCITY_THRESHOLD);

      if (shouldStartDrag && !isDraggingRef.current && !isLongPressRef.current) {
        if (!hasMoveRef.current) {
          hasMoveRef.current = true;
        }

        if (longPressTimerRef.current) {
          clearTimeout(longPressTimerRef.current);
          longPressTimerRef.current = null;
        }

        isDraggingRef.current = true;
      }

      if (distance > TAP_THRESHOLD && !hasMoveRef.current) {
        hasMoveRef.current = true;
      }

      if (isDraggingRef.current || isLongPressRef.current) {
        const { x, y, xRatio, yRatio } = getRelativeTouchCoordinate(touch);
        emitMobileCursorAbsolute(xRatio, yRatio);
        handleMouseEvent({ type: 'move', x, y });
      }
    }

    // Mouse touch end event
    function handleTouchEnd(e: TouchEvent) {
      disableEvent(e);

      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }

      if (!hasMoveRef.current && !isLongPressRef.current) {
        handleMouseEvent({ type: 'mousedown', button: MouseButton.Left });
        setTimeout(() => {
          handleMouseEvent({ type: 'mouseup', button: MouseButton.Left });
        }, 50);
      } else if (pressedButtonRef.current !== null) {
        handleMouseEvent({ type: 'mouseup', button: pressedButtonRef.current! });
      }

      isLongPressRef.current = false;
      hasMoveRef.current = false;
      isDraggingRef.current = false;
      pressedButtonRef.current = null;
      emitMobileCursorHide();
    }

    // Mouse touch cancel event
    function handleTouchCancel(e: any) {
      disableEvent(e);

      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }

      if (pressedButtonRef.current !== null) {
        handleMouseEvent({ type: 'mouseup', button: pressedButtonRef.current! });
      }

      isLongPressRef.current = false;
      hasMoveRef.current = false;
      isDraggingRef.current = false;
      pressedButtonRef.current = null;
      emitMobileCursorHide(0);
    }

    // get mouse coordinate
    function getCoordinate(event: any) {
      const { x, y } = clientPointToScreenRatio(mouseTarget, event.clientX, event.clientY);

      const finalX = Math.max(0, Math.min(1, x));
      const finalY = Math.max(0, Math.min(1, y));

      const hexX = Math.round(HID_ABSOLUTE_MAX * finalX);
      const hexY = Math.round(HID_ABSOLUTE_MAX * finalY);

      return { x: hexX, y: hexY, xRatio: finalX, yRatio: finalY };
    }

    function getRelativeTouchCoordinate(touch: Touch) {
      const geometry = getScreenGeometry(screenElement);
      const deltaX =
        geometry && geometry.contentWidth > 0
          ? (touch.clientX - lastTouchPosRef.current.x) / geometry.contentWidth
          : 0;
      const deltaY =
        geometry && geometry.contentHeight > 0
          ? (touch.clientY - lastTouchPosRef.current.y) / geometry.contentHeight
          : 0;
      lastTouchPosRef.current = { x: touch.clientX, y: touch.clientY };

      const currentX = lastPosRef.current.x / HID_ABSOLUTE_MAX;
      const currentY = lastPosRef.current.y / HID_ABSOLUTE_MAX;
      const finalX = Math.max(0, Math.min(1, currentX + deltaX));
      const finalY = Math.max(0, Math.min(1, currentY + deltaY));

      return ratioToCoordinate(finalX, finalY);
    }

    function emitCurrentMobileCursorPosition() {
      emitMobileCursorAbsolute(
        lastPosRef.current.x / HID_ABSOLUTE_MAX,
        lastPosRef.current.y / HID_ABSOLUTE_MAX
      );
    }

    function ratioToCoordinate(xRatio: number, yRatio: number) {
      const finalX = Math.max(0, Math.min(1, xRatio));
      const finalY = Math.max(0, Math.min(1, yRatio));
      const x = Math.round(HID_ABSOLUTE_MAX * finalX);
      const y = Math.round(HID_ABSOLUTE_MAX * finalY);

      return { x, y, xRatio: finalX, yRatio: finalY };
    }

    return () => {
      mouseTarget.removeEventListener('mousemove', handleMouseMove);
      mouseTarget.removeEventListener('mousedown', handleMouseDown);
      mouseTarget.removeEventListener('mouseup', handleMouseUp);
      mouseTarget.removeEventListener('wheel', handleWheel);
      mouseTarget.removeEventListener('click', disableEvent);
      mouseTarget.removeEventListener('contextmenu', disableEvent);
      touchTarget.removeEventListener('touchstart', handleTouchStart);
      touchTarget.removeEventListener('touchmove', handleTouchMove);
      touchTarget.removeEventListener('touchend', handleTouchEnd);
      touchTarget.removeEventListener('touchcancel', handleTouchCancel);
      for (const style of previousGestureStyles) {
        style.element.style.touchAction = style.touchAction;
        style.element.style.overscrollBehavior = style.overscrollBehavior;
        style.element.style.userSelect = style.userSelect;
        style.element.style.webkitUserSelect = style.webkitUserSelect;
      }

      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
    };
  }, [resolution, scrollDirection, scrollInterval]);

  // Mouse event handler
  function handleMouseEvent(event: MouseAbsoluteEvent) {
    let report: Uint8Array;
    const mouse = mouseRef.current;

    switch (event.type) {
      case 'mousedown':
        mouse.buttonDown(event.button);
        report = mouse.buildButtonReport(lastPosRef.current.x, lastPosRef.current.y);
        break;
      case 'mouseup':
        mouse.buttonUp(event.button);
        report = mouse.buildButtonReport(lastPosRef.current.x, lastPosRef.current.y);
        break;
      case 'wheel':
        report = mouse.buildReport(lastPosRef.current.x, lastPosRef.current.y, event.deltaY);
        break;
      case 'move':
        report = mouse.buildReport(event.x, event.y);
        lastPosRef.current = { x: event.x, y: event.y };
        break;
      default:
        report = mouse.buildReport(lastPosRef.current.x, lastPosRef.current.y);
        break;
    }

    sendReport(report);
  }

  function sendReport(report: Uint8Array) {
    const data = new Uint8Array([MessageEvent.Mouse, ...report]);
    client.send(data);
  }

  // disable default events
  function disableEvent(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  return <></>;
};

function uniqueElements(elements: Array<HTMLElement | null>): HTMLElement[] {
  return Array.from(new Set(elements.filter((element): element is HTMLElement => Boolean(element))));
}
