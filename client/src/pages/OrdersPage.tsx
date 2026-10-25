import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  formatPrice,
  orderStatuses,
  paymentStatuses,
} from '@shared/config';
import type { OrderDto } from '@shared/api';
import { getStoredToken } from '../api/client';
import { orderApi } from '../api/orders';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Alert, EmptyState, Spinner, StatusBadge } from '../components/ui/Feedback';
import { OrderStatusTimeline } from '../components/orders/OrderStatusTimeline';
import { formatDateTime, getErrorMessage } from '../utils/format';

const PaymentAction = ({
  order,
  onRetry,
  paying,
}: {
  order: OrderDto;
  onRetry: (orderId: number) => void;
  paying: boolean;
}) => {
  if (order.paymentStatus === 'PAID') return null;

  if (order.paymentUrl) {
    return (
      <a href={order.paymentUrl} className="btn-gold px-4 py-2 text-xs">
        إتمام الدفع
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onRetry(order.id)}
      disabled={paying}
      className="btn-secondary px-4 py-2 text-xs"
    >
      {paying ? <Spinner className="h-4 w-4" /> : null}
      {paying ? 'جارٍ التحضير...' : 'إعادة محاولة الدفع'}
    </button>
  );
};

export const OrdersPage = () => {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payingOrderId, setPayingOrderId] = useState<number | null>(null);
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const paymentNoticeShown = useRef(false);

  const { isAuthenticated, loading: authLoading } = useAuth();

  const loadOrders = useCallback(async (silent = false) => {
    // Guard: do not fetch if the auth state is still settling, the user is not
    // authenticated, or no token is available yet.
    if (authLoading || !isAuthenticated || !getStoredToken()) return;
    if (!silent) setLoading(true);
    setRefreshing(true);
    setError(null);
    try {
      const result = await orderApi.listMine();
      setOrders(result.items);
    } catch (loadError) {
      if (!silent) setError(getErrorMessage(loadError));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [isAuthenticated, authLoading]);

  useEffect(() => {
    // Only start loading orders once the auth state is stable.
    if (!isAuthenticated || authLoading) return;
    void loadOrders();
    const timer = window.setInterval(() => {
      if (!document.hidden) void loadOrders(true);
    }, 30000);
    return () => window.clearInterval(timer);
  }, [isAuthenticated, authLoading, loadOrders]);

  useEffect(() => {
    if (searchParams.get('payment') === 'success' && !paymentNoticeShown.current) {
      paymentNoticeShown.current = true;
      showToast('تم استلام إشعار الدفع، قد يستغرق تحديث الحالة لحظات', 'info');
      void loadOrders(true);
    }
  }, [searchParams, showToast, loadOrders]);

  const handleRetryPayment = async (orderId: number) => {
    setPayingOrderId(orderId);
    try {
      const url = await orderApi.retryPayment(orderId);
      window.location.assign(url);
    } catch (retryError) {
      showToast(getErrorMessage(retryError), 'error');
    } finally {
      setPayingOrderId(null);
    }
  };

  return (
    <section className="container-page py-10 sm:py-14">
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="section-kicker">طلباتي</p>
          <h1 className="section-title mt-2">تابع طلبك لحظة بلحظة</h1>
          <p className="mt-2 text-sm text-night/55">
            كل تحديث من المطبخ يظهر هنا تلقائياً. حدّث الصفحة إذا أردت التحقق
            فوراً.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadOrders()}
          disabled={refreshing}
          className="btn-secondary px-4 py-2.5 text-xs"
        >
          {refreshing ? <Spinner className="h-4 w-4" /> : null}
          تحديث
        </button>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-48 animate-pulse rounded-3xl border border-sand-200 bg-white"
              />
            ))}
          </div>
        ) : error ? (
          <Alert kind="error">
            <div className="flex flex-col items-start gap-3">
              <span>{error}</span>
              <button
                type="button"
                onClick={() => void loadOrders()}
                className="btn-secondary px-4 py-2 text-xs"
              >
                إعادة المحاولة
              </button>
            </div>
          </Alert>
        ) : orders.length === 0 ? (
          <EmptyState
            title="لا توجد طلبات بعد"
            description="ابدأ تجربتك الحضرمية واطلب أول طبق من قائمتنا."
            action={
              <Link to="/#menu" className="btn-primary">
                اطلب الآن
              </Link>
            }
          />
        ) : (
          <div className="space-y-5">
            {orders.map((order) => {
              const orderMeta = orderStatuses[order.orderStatus];
              const paymentMeta = paymentStatuses[order.paymentStatus];
              return (
                <article key={order.id} className="card-surface overflow-hidden">
                  <header className="flex flex-wrap items-center justify-between gap-4 border-b border-sand-200 bg-sand-50/60 px-5 py-4 sm:px-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <div>
                        <p className="font-display text-xl font-bold text-emerald-deep">
                          طلب #{order.id}
                        </p>
                        <p className="text-xs text-night/45">
                          {formatDateTime(order.createdAt)}
                        </p>
                      </div>
                      <StatusBadge label={orderMeta.ar} color={orderMeta.color} />
                      <StatusBadge
                        label={paymentMeta.ar}
                        color={paymentMeta.color}
                      />
                    </div>
                    <PaymentAction
                      order={order}
                      onRetry={(orderId) => void handleRetryPayment(orderId)}
                      paying={payingOrderId === order.id}
                    />
                  </header>

                  <div className="grid gap-6 px-5 py-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
                    <div>
                      <OrderStatusTimeline status={order.orderStatus} />
                      <div className="mt-5 text-xs leading-6 text-night/55">
                        <span>{order.deliveryAddress}</span>
                      </div>
                      {order.notes ? (
                        <p className="mt-2 rounded-xl bg-sand-50 px-3 py-2 text-xs leading-6 text-night/55">
                          ملاحظات: {order.notes}
                        </p>
                      ) : null}
                    </div>

                    <div className="rounded-2xl border border-sand-200 bg-white p-4">
                      <ul className="space-y-2.5">
                        {order.items.map((item) => (
                          <li
                            key={item.id}
                            className="flex items-center justify-between gap-3 text-sm"
                          >
                            <span className="flex min-w-0 items-center gap-2">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sand-100 text-[10px] font-bold text-emerald-deep">
                                {item.quantity}×
                              </span>
                              <span className="truncate font-semibold text-night/70">
                                {item.name}
                              </span>
                            </span>
                            <span className="whitespace-nowrap font-bold text-emerald-deep">
                              {formatPrice(item.lineTotal)}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex items-center justify-between border-t border-dashed border-sand-200 pt-3">
                        <span className="text-sm font-bold text-night/60">
                          الإجمالي
                        </span>
                        <span className="font-display text-xl font-bold text-emerald-deep">
                          {formatPrice(order.totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
