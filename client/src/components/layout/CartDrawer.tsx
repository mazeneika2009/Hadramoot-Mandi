import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '@shared/config';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export const CartDrawer = () => {
  const {
    lines,
    subtotal,
    itemCount,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        className="absolute inset-0 bg-night/55 backdrop-blur-sm"
        aria-label="إغلاق السلة"
        onClick={closeCart}
      />
      <aside className="animate-drawer absolute inset-y-0 left-0 flex w-full max-w-md flex-col bg-sand-50 shadow-2xl">
          <div className="flex items-center justify-between border-b border-sand-200 bg-white px-5 py-4">
            <div>
              <h2 className="font-display text-xl font-bold text-emerald-deep">
                سلة الطلبات
              </h2>
              <p className="text-xs text-night/50">
                {itemCount > 0 ? `${itemCount} صنف في السلة` : 'السلة فارغة'}
              </p>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="rounded-full p-2 text-night/50 transition hover:bg-sand-100 hover:text-night"
              aria-label="إغلاق"
            >
              إغلاق
            </button>
          </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <h3 className="mt-4 text-lg font-bold text-emerald-deep">
              سلتك في انتظار المندي
            </h3>
            <p className="mt-2 text-sm leading-7 text-night/55">
              أضف أطباقك المفضلة من المنيو وابدأ رحلتك مع نكهة حضرموت.
            </p>
            <Link to="/#menu" onClick={closeCart} className="btn-primary mt-6">
              تصفح المنيو
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {lines.map((line) => (
                <div
                  key={line.item.id}
                  className="flex gap-3 rounded-2xl border border-sand-200 bg-white p-3"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-sand-100">
                    {line.item.imageUrl ? (
                      <img
                        src={line.item.imageUrl}
                        alt={line.item.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="truncate text-sm font-bold text-emerald-deep">
                        {line.item.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeItem(line.item.id)}
                        className="rounded-full px-2 py-1 text-xs font-bold text-night/35 transition hover:bg-red-50 hover:text-red-600"
                        aria-label={`حذف ${line.item.name}`}
                      >
                        حذف
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs font-semibold text-gold">
                      {formatPrice(line.item.price)}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-sand-200 p-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(line.item.id, line.quantity - 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full text-emerald-deep transition hover:bg-sand-100"
                          aria-label="تقليل الكمية"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-bold">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(line.item.id, line.quantity + 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full text-emerald-deep transition hover:bg-sand-100"
                          aria-label="زيادة الكمية"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm font-bold text-emerald-deep">
                        {formatPrice(line.item.price * line.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={clearCart}
                className="mx-auto mt-2 block text-xs font-semibold text-night/45 underline decoration-dotted underline-offset-4 transition hover:text-red-600"
              >
                تفريغ السلة
              </button>
            </div>

            <div className="border-t border-sand-200 bg-white px-5 py-5">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between text-night/65">
                  <span>المجموع الفرعي</span>
                  <span className="font-bold text-night">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-night/65">
                  <span>التوصيل</span>
                  <span className="font-bold text-emerald-700">مجاني</span>
                </div>
                <div className="flex items-center justify-between border-t border-dashed border-sand-200 pt-3 text-base">
                  <span className="font-bold text-emerald-deep">الإجمالي</span>
                  <span className="font-display text-2xl font-bold text-emerald-deep">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>
              <Link
                to={isAuthenticated ? '/checkout' : '/login?redirect=%2Fcheckout'}
                onClick={closeCart}
                className="btn-primary mt-5 w-full"
              >
                {isAuthenticated ? 'إتمام الطلب' : 'سجّل الدخول لإتمام الطلب'}
              </Link>
              <p className="mt-3 text-center text-[11px] text-night/45">
                الأسعار النهائية تُحسب من المطعم لضمان الدقة
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};
