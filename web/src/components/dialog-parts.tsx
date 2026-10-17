import type { ReactNode } from 'react';
import { Button, type ButtonProps } from 'antd';

// The parts of a dialog that every dialog of the menu bar shares. The title is the dialog's own
// `title`, and the width is its default; only the text under the title and the button at the
// end are written here.

// A line of grey text under the title, for what the dialog is about.
export const DialogHint = ({ children }: { children: ReactNode }) => (
  <div className="mb-4 text-xs text-neutral-500">{children}</div>
);

// The one main button of a dialog, centred under the content and named after what it does.
export const DialogAction = (props: ButtonProps) => (
  <div className="flex justify-center pt-4">
    <Button type="primary" className="min-w-24" {...props} />
  </div>
);
