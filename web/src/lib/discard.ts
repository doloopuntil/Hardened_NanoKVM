import type { KeyboardEvent } from 'react';

// The onKeyDown of a page with unsaved changes: Escape in one of its text fields discards them.
// An open select or a dialog keeps its own Escape, and with nothing to discard the key goes on
// to close the Settings dialog as usual.
export function discardOnEscape(hasChanges: boolean, discard: () => void) {
  return (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Escape' || !hasChanges || event.defaultPrevented) return;

    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;
    // a dialog is portalled out of the page but still bubbles to it in React
    if (!event.currentTarget.contains(target) || target.closest('.ant-select')) return;

    event.stopPropagation();
    discard();
  };
}
