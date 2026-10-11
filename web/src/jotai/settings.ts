import { atom } from 'jotai';

import { getLayoutMode, type LayoutMode } from '@/lib/localstorage.ts';

// menu bar disabled items
export const menuDisabledItemsAtom = atom<string[]>([]);

// track how many submenus are currently open
export const submenuOpenCountAtom = atom(0);

// web title
export const webTitleAtom = atom('');

// menu display mode: 'off' | 'auto' | 'always'
export const menuDisplayModeAtom = atom<string>('auto');

// responsive layout mode: 'auto' | 'mobile'
export const layoutModeAtom = atom<LayoutMode>(getLayoutMode());

// show the remote keyboard lock-status indicator beside the menu bar
export const keyboardLedStatusVisibleAtom = atom(true);

// bumped to ask the settings dialog to close, even while a tab has it locked
export const closeSettingsRequestAtom = atom(0);
