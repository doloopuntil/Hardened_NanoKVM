import type { ReactNode } from 'react';
import { Input } from 'antd';

// A read-only "label ... value" row, as used on the Network page. It is as tall as the
// editable row, so switching between the two does not move the rows around.
export const InfoRow = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex flex-col items-start gap-1 sm:min-h-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
    <span className="shrink-0 text-sm text-neutral-300">{label}</span>
    <span className="w-full break-all text-left text-sm text-neutral-500 sm:w-auto sm:max-w-md sm:text-right">
      {value || '-'}
    </span>
  </div>
);

// The same row with a text input in place of the value.
export const EditableInfoRow = ({
  label,
  value,
  placeholder,
  status,
  inputWidth = 'sm:w-40',
  onChange
}: {
  label: string;
  value: string;
  placeholder: string;
  status?: 'error';
  /** Width from the sm breakpoint up, sized to the longest value the field holds. */
  inputWidth?: string;
  onChange: (value: string) => void;
}) => (
  <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
    <span className="shrink-0 text-sm text-neutral-300">{label}</span>
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      status={status}
      className={`w-full text-right ${inputWidth}`}
    />
  </div>
);

// A labelled setting: the label and an optional caption on the left, the control on the right.
// Below the sm breakpoint the control moves under the label, except for a switch, which stays
// at the right end of the row.
export const SettingRow = ({
  label,
  description,
  error,
  isSwitch = false,
  children
}: {
  label: ReactNode;
  description?: string;
  error?: string;
  isSwitch?: boolean;
  children: ReactNode;
}) => (
  <div
    className={`flex min-w-0 gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${
      isSwitch ? 'items-center justify-between gap-4' : 'flex-col items-stretch'
    }`}
  >
    <div className="flex min-w-0 flex-col space-y-0.5 sm:flex-1">
      <span className="text-sm text-neutral-300">{label}</span>
      {description && (
        <span className="break-words text-xs leading-snug text-neutral-500">{description}</span>
      )}
    </div>
    <div
      className={`flex min-w-0 flex-col sm:shrink-0 sm:items-end ${
        isSwitch ? 'shrink-0 items-end' : 'items-stretch'
      }`}
    >
      {children}
      {error && <div className="mt-1 max-w-72 text-xs text-red-400 sm:text-right">{error}</div>}
    </div>
  </div>
);
