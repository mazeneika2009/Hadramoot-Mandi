import { useEffect, type ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
};

export const Modal = ({
  open,
  title,
  description,
  onClose,
  children,
  size = 'md',
}: ModalProps) => {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-night/60 backdrop-blur-sm"
        aria-label="إغلاق النافذة"
        onClick={onClose}
      />
      <div
        className={`animate-rise relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ${sizes[size]}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="flex items-start justify-between gap-4 border-b border-sand-200 px-6 py-5">
          <div>
            <h2 className="font-display text-2xl font-bold text-emerald-deep">
              {title}
            </h2>
            {description ? (
              <p className="mt-1 text-sm text-night/55">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            className="rounded-full p-2 text-night/50 transition hover:bg-sand-100 hover:text-night"
            onClick={onClose}
            aria-label="إغلاق"
          >
            إغلاق
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
};
