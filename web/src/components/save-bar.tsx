import { Button } from 'antd';

type SaveBarProps = {
  statusText?: string;
  statusKind?: 'error' | 'warning' | 'success' | '';
  label: string;
  loading?: boolean;
  disabled?: boolean;
  // without it the bar shows the status alone
  onSave?: () => void;
};

const statusColors = {
  error: 'text-red-400',
  success: 'text-green-400',
  warning: 'text-yellow-400/80'
};

// The bar that sticks to the bottom of a settings page while it has changes to save. It reaches
// across the padding of the settings panel, which is narrower on the desktop layout than on the
// touch one. The wrapper's solid top padding matches the panel background (the modal colour under
// its 50% neutral-900 layer), so the bar stays visually apart from the last control.
export const SaveBar = ({
  statusText,
  statusKind = 'warning',
  label,
  loading = false,
  disabled = false,
  onSave
}: SaveBarProps) => (
  <div className="sticky bottom-0 z-10 -mx-3 bg-[#1b1b1b] pt-3 [.settings-modal-mobile_&]:-mx-4">
    <div className="flex min-w-0 flex-wrap items-center justify-end gap-3 border-t border-neutral-700/70 bg-neutral-900/95 px-3 py-3 [.settings-modal-mobile_&]:px-4">
      {statusText && (
        <span className={`min-w-0 text-xs ${statusColors[statusKind || 'warning']}`}>
          {statusText}
        </span>
      )}
      {onSave && (
        <Button type="primary" loading={loading} disabled={disabled} onClick={onSave}>
          {label}
        </Button>
      )}
    </div>
  </div>
);
