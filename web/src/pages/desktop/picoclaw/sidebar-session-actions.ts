import type { Dispatch, SetStateAction } from 'react';
import type { TFunction } from 'i18next';

import {
  closeGateway,
  connectGateway,
  deletePicoclawSession,
  getPicoclawSession,
  listPicoclawSessions,
  picoclawGateway,
  sendChatMessage,
  sendStopMessage,
  type PicoclawSessionListItem
} from '@/api/picoclaw.ts';
import { toast } from '@/lib/feedback.ts';
import { generateUUIDv4 } from '@/lib/picoclaw-gateway.ts';
import type {
  PicoclawChatMessage,
  PicoclawConfigState,
  PicoclawOverlayState,
  PicoclawRunState,
  PicoclawRuntimeStatus,
  PicoclawTakeoverState,
  PicoclawTransportState
} from '@/jotai/picoclaw.ts';

import {
  createErrorMessage,
  createStatusMessage,
  HIDDEN_OVERLAY,
  sessionMessagesToChat
} from './message-utils.ts';
import { canConnectGateway } from './runtime-view.ts';

type RuntimeStatusSetter = Dispatch<SetStateAction<PicoclawRuntimeStatus | null>>;
type MessageSetter = Dispatch<SetStateAction<PicoclawChatMessage[]>>;
type TakeoverSetter = Dispatch<SetStateAction<PicoclawTakeoverState>>;

type PicoclawSidebarSessionActionOptions = {
  t: TFunction;
  transportState: PicoclawTransportState;
  runState: PicoclawRunState;
  config: PicoclawConfigState;
  activeSessionId: string;
  isFreshConversation: boolean;
  isSwitchingSession: boolean;
  // a history list is already loaded
  hasHistory: boolean;
  refreshState: () => Promise<PicoclawRuntimeStatus | null>;
  setMessages: MessageSetter;
  setTakeover: TakeoverSetter;
  setOverlay: Dispatch<SetStateAction<PicoclawOverlayState>>;
  setTransportState: Dispatch<SetStateAction<PicoclawTransportState>>;
  setRunState: Dispatch<SetStateAction<PicoclawRunState>>;
  setHistorySessions: Dispatch<SetStateAction<PicoclawSessionListItem[]>>;
  setActiveSessionId: Dispatch<SetStateAction<string>>;
  setIsFreshConversation: Dispatch<SetStateAction<boolean>>;
  setIsHistoryOpen: Dispatch<SetStateAction<boolean>>;
  setIsModelConfigOpen: Dispatch<SetStateAction<boolean>>;
  setIsLoadingHistory: Dispatch<SetStateAction<boolean>>;
  setIsDeletingSession: Dispatch<SetStateAction<boolean>>;
  setIsSwitchingSession: Dispatch<SetStateAction<boolean>>;
  setRuntimeStatus: RuntimeStatusSetter;
};

export function createPicoclawSidebarSessionActions(options: PicoclawSidebarSessionActionOptions) {
  const {
    t,
    transportState,
    runState,
    config,
    activeSessionId,
    isFreshConversation,
    isSwitchingSession,
    hasHistory,
    refreshState,
    setMessages,
    setTakeover,
    setOverlay,
    setTransportState,
    setRunState,
    setHistorySessions,
    setActiveSessionId,
    setIsFreshConversation,
    setIsHistoryOpen,
    setIsModelConfigOpen,
    setIsLoadingHistory,
    setIsDeletingSession,
    setIsSwitchingSession,
    setRuntimeStatus
  } = options;

  // The list that is already there stays on screen while the new one is fetched.
  async function loadHistorySessions() {
    if (!hasHistory) {
      setIsLoadingHistory(true);
    }
    try {
      const response = await listPicoclawSessions({ limit: 100 });
      if (response.code === 0) {
        setHistorySessions(response.data || []);
        return response.data || [];
      }
      return [];
    } finally {
      setIsLoadingHistory(false);
    }
  }

  async function handleSend(content: string) {
    let ready = transportState === 'connected' && runState === 'idle';

    if (!ready) {
      const nextRuntimeStatus = await refreshState();
      if (!canConnectGateway(nextRuntimeStatus ?? null)) {
        return;
      }

      try {
        await connectGateway();
        ready = true;
      } catch {
        ready = false;
      }
    }

    if (!ready) {
      return;
    }

    const id = generateUUIDv4();
    setIsFreshConversation(false);
    setMessages((current) => [
      ...current,
      {
        id,
        kind: 'user',
        text: content,
        createdAt: Date.now()
      }
    ]);

    sendChatMessage(content, {
      id,
      maxSteps: config.maxSteps,
      maxRuntimeMs: config.maxRuntimeMs
    });
  }

  async function handleNewConversation() {
    if (isFreshConversation) {
      return;
    }

    const closePromise = closeGateway();
    setIsHistoryOpen(false);
    setIsModelConfigOpen(false);
    setMessages([]);
    setTakeover({
      active: false,
      sessionId: undefined,
      reason: 'new_conversation'
    });
    setOverlay(HIDDEN_OVERLAY);
    setTransportState('disconnected');
    setRunState('idle');

    const nextSessionId = picoclawGateway.rotateSession();
    setActiveSessionId(nextSessionId);
    setIsFreshConversation(true);

    await closePromise;
    const nextRuntimeStatus = await refreshState();
    if (!canConnectGateway(nextRuntimeStatus ?? null)) {
      return;
    }

    setMessages((current) => [...current, createStatusMessage(t('picoclaw.status.connecting'))]);
    try {
      await connectGateway(nextSessionId);
    } catch {
      // handled by gateway events
    }
  }

  function handleStop() {
    sendStopMessage();
    setMessages((current) => [...current, createStatusMessage(t('picoclaw.status.stopped'))]);
  }

  async function handleOpenHistory() {
    setIsModelConfigOpen(false);
    setIsHistoryOpen(true);
    await loadHistorySessions();
  }

  function handleCloseHistory() {
    setIsHistoryOpen(false);
  }

  async function handleSelectHistorySession(sessionId: string) {
    if (isSwitchingSession) {
      return;
    }

    if (sessionId === activeSessionId) {
      setIsHistoryOpen(false);
      return;
    }

    setIsSwitchingSession(true);
    try {
      const response = await getPicoclawSession(sessionId);
      if (response.code !== 0) {
        const errorMessage =
          (response as { message?: string; msg?: string }).message ||
          (response as { message?: string; msg?: string }).msg ||
          t('picoclaw.history.loadFailed');
        toast.error(errorMessage);
        setMessages((current) => [
          ...current,
          createErrorMessage({
            code: 'SESSION_LOAD_FAILED',
            message: errorMessage,
            raw: response
          })
        ]);
        return;
      }

      const loadedMessages = sessionMessagesToChat(response.data.id, response.data.messages || []);

      const closePromise = closeGateway();
      setMessages(loadedMessages);
      setActiveSessionId(sessionId);
      setIsFreshConversation(false);
      setIsHistoryOpen(false);
      setTakeover({
        active: false,
        sessionId,
        reason: 'history_selected'
      });
      setOverlay(HIDDEN_OVERLAY);
      setTransportState('disconnected');
      setRunState('idle');
      // The chat is switched. Connecting can take a while, and the history is not locked for it.
      setIsSwitchingSession(false);

      await closePromise;
      const nextRuntimeStatus = await refreshState();
      setRuntimeStatus((current) =>
        current
          ? {
              ...current,
              current_session: sessionId
            }
          : current
      );

      if (!canConnectGateway(nextRuntimeStatus ?? null)) {
        return;
      }

      try {
        await connectGateway(sessionId);
      } catch {
        // handled by gateway events
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : t('picoclaw.history.loadFailed');
      toast.error(errorMessage);
      setMessages((current) => [
        ...current,
        createErrorMessage({
          code: 'SESSION_LOAD_FAILED',
          message: errorMessage,
          raw: error
        })
      ]);
    } finally {
      setIsSwitchingSession(false);
    }
  }

  async function handleDeleteHistorySession(sessionId: string) {
    setIsDeletingSession(true);
    try {
      const response = await deletePicoclawSession(sessionId);
      if (response.code === 0) {
        setHistorySessions((current) => current.filter((session) => session.id !== sessionId));
        return;
      }

      const errorMessage =
        (response as { message?: string; msg?: string }).message ||
        (response as { message?: string; msg?: string }).msg ||
        t('picoclaw.history.deleteFailed');
      toast.error(errorMessage);
      setMessages((current) => [
        ...current,
        createErrorMessage({
          code: 'SESSION_DELETE_FAILED',
          message: errorMessage,
          raw: response
        })
      ]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : t('picoclaw.history.deleteFailed');
      toast.error(errorMessage);
      setMessages((current) => [
        ...current,
        createErrorMessage({
          code: 'SESSION_DELETE_FAILED',
          message: errorMessage,
          raw: error
        })
      ]);
    } finally {
      setIsDeletingSession(false);
    }
  }

  return {
    handleSend,
    handleNewConversation,
    handleStop,
    handleOpenHistory,
    handleCloseHistory,
    handleSelectHistorySession,
    handleDeleteHistorySession
  };
}
