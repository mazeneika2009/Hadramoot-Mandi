import type { ReactNode } from 'react';

export const Spinner = ({ className = 'h-5 w-5' }: { className?: string }) => (
  <svg
    className={`animate-spin ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="3"
      opacity="0.25"
    />
    <path
      d="M21 12a9 9 0 0 0-9-9"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export const PageLoader = ({ label = 'جارٍ التحميل...' }: { label?: string }) => (
  <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-emerald-deep">
    <Spinner className="h-9 w-9" />
    <p className="text-sm font-semibold">{label}</p>
  </div>
);

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({
  title,
  description,
  action,
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-sand-300 bg-white/60 px-6 py-14 text-center">
    <h3 className="text-lg font-bold text-emerald-deep">{title}</h3>
    {description ? (
      <p className="mt-2 max-w-md text-sm leading-7 text-night/60">
        {description}
      </p>
    ) : null}
    {action ? <div className="mt-6">{action}</div> : null}
  </div>
);

interface AlertProps {
  kind?: 'error' | 'success' | 'info';
  children: ReactNode;
}

const alertStyles = {
  error: 'border-red-200 bg-red-50 text-red-800',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  info: 'border-sand-300 bg-sand-100 text-emerald-deep',
};

export const Alert = ({ kind = 'info', children }: AlertProps) => {
  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-sm font-semibold leading-6 ${alertStyles[kind]}`}
      role={kind === 'error' ? 'alert' : 'status'}
    >
      <div>{children}</div>
    </div>
  );
};

export const StatusBadge = ({
  label,
  color,
}: {
  label: string;
  color: string;
}) => (
  <span
    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
    style={{ backgroundColor: `${color}18`, color }}
  >
    <span className="status-dot" style={{ backgroundColor: color }} />
    {label}
  </span>
);
