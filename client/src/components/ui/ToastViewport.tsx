import { useToast, type ToastKind } from '../../context/ToastContext';

const toastStyles: Record<ToastKind, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  error: 'border-red-200 bg-red-50 text-red-900',
  info: 'border-sand-300 bg-white text-emerald-deep',
};

export const ToastViewport = () => {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4">
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            className={`animate-rise pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border px-4 py-3 shadow-soft ${toastStyles[toast.kind]}`}
            role={toast.kind === 'error' ? 'alert' : 'status'}
          >
            <p className="flex-1 text-sm font-semibold leading-6">
              {toast.message}
            </p>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="rounded-full px-2 py-1 text-xs font-bold opacity-60 transition hover:bg-black/5 hover:opacity-100"
              aria-label="إغلاق التنبيه"
            >
              إغلاق
            </button>
          </div>
        );
      })}
    </div>
  );
};
