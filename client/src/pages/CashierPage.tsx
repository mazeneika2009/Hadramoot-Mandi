import { useCallback, useEffect, useState } from 'react';
import { formatPrice, orderStatuses } from '@shared/config';
import type { DeliveryDriverDto, OrderDto } from '@shared/api';
import { getStoredToken } from '../api/client';
import { orderApi } from '../api/orders';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Alert, Spinner, StatusBadge } from '../components/ui/Feedback';
import { formatDateTime, getErrorMessage } from '../utils/format';

const CashierOrderCard = ({
  order,
  drivers,
  selectedDriverId,
  dispatching,
  onSelectDriver,
  onDispatch,
}: {
  order: OrderDto;
  drivers: DeliveryDriverDto[];
  selectedDriverId: string;
  dispatching: boolean;
  onSelectDriver: (orderId: number, driverId: string) => void;
  onDispatch: (orderId: number) => void;
}) => {
  const orderMeta = orderStatuses[order.orderStatus];

  return (
    <article className="card-surface overflow-hidden">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-200 bg-sand-50/60 px-5 py-4">
        <div>
          <p className="font-display text-xl font-bold text-emerald-deep">
            طلب #{order.id}
          </p>
          <p className="text-xs text-night/45">
            {formatDateTime(order.createdAt)}
          </p>
        </div>
        <StatusBadge label={orderMeta.ar} color={orderMeta.color} />
      </header>

      <div className="grid gap-5 px-5 py-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <ul className="space-y-2">
            {order.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sand-100 text-[10px] font-bold text-emerald-deep">
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
          <div className="mt-3 flex items-center justify-between border-t border-dashed border-sand-200 pt-3">
            <span className="text-xs font-bold text-night/50">الإجمالي</span>
            <span className="font-display text-lg font-bold text-emerald-deep">
              {formatPrice(order.totalAmount)}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-sand-200 bg-sand-50/50 p-4 text-xs leading-6 text-night/60">
          <p>
            <span className="font-bold text-emerald-deep">العميل: </span>
            {order.customerName ?? 'عميل'}
          </p>
          {order.customerPhone ? (
            <p dir="ltr" className="text-right font-semibold">
              {order.customerPhone}
            </p>
          ) : null}
          <p>
            <span className="font-bold text-emerald-deep">العنوان: </span>
            {order.deliveryAddress}
          </p>
          {order.notes ? (
            <p>
              <span className="font-bold text-emerald-deep">ملاحظات: </span>
              {order.notes}
            </p>
          ) : null}
        </div>
      </div>

      <footer className="flex flex-col gap-3 border-t border-sand-200 bg-white px-5 py-4 sm:flex-row sm:items-center">
        <label
          htmlFor={`driver-${order.id}`}
          className="text-xs font-bold text-night/50 sm:w-24"
        >
          مندوب التوصيل
        </label>
        <select
          id={`driver-${order.id}`}
          value={selectedDriverId}
          onChange={(event) => onSelectDriver(order.id, event.target.value)}
          disabled={dispatching || drivers.length === 0}
          className="min-w-0 flex-1 rounded-xl border border-sand-200 bg-white px-3 py-2.5 text-sm font-semibold text-emerald-deep outline-none transition focus:border-emerald-deep disabled:opacity-50"
        >
          <option value="">اختر المندوب</option>
          {drivers.map((driver) => (
            <option key={driver.id} value={String(driver.id)}>
              {driver.name}
              {driver.phone ? ` · ${driver.phone}` : ''}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => onDispatch(order.id)}
          disabled={dispatching || !selectedDriverId}
          className="btn-primary px-5 py-2.5 text-xs"
        >
          {dispatching ? <Spinner className="h-4 w-4" /> : null}
          إسناد وبدء التوصيل
        </button>
      </footer>
    </article>
  );
};

export const CashierPage = () => {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [drivers, setDrivers] = useState<DeliveryDriverDto[]>([]);
  const [selectedDrivers, setSelectedDrivers] = useState<
    Record<number, string>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dispatchingId, setDispatchingId] = useState<number | null>(null);
  const { showToast } = useToast();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const loadData = useCallback(
    async (silent = false) => {
      if (authLoading || !isAuthenticated || !getStoredToken()) return;
      if (!silent) setLoading(true);
      setError(null);
      try {
        const [queue, availableDrivers] = await Promise.all([
          orderApi.listCashier(1, 50),
          orderApi.listDrivers(),
        ]);
        setOrders(queue.items);
        setDrivers(availableDrivers);
      } catch (loadError) {
        if (!silent) setError(getErrorMessage(loadError));
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [authLoading, isAuthenticated],
  );

  useEffect(() => {
    if (authLoading || !isAuthenticated) return;
    void loadData();
    const timer = window.setInterval(() => {
      if (!document.hidden) void loadData(true);
    }, 10_000);
    return () => window.clearInterval(timer);
  }, [authLoading, isAuthenticated, loadData]);

  const handleSelectDriver = (orderId: number, driverId: string) => {
    setSelectedDrivers((current) => ({ ...current, [orderId]: driverId }));
  };

  const handleDispatch = async (orderId: number) => {
    if (dispatchingId !== null) return;
    const driverId = Number(selectedDrivers[orderId]);
    if (!Number.isInteger(driverId) || driverId <= 0) {
      showToast('اختر مندوب التوصيل أولاً', 'error');
      return;
    }

    setDispatchingId(orderId);
    try {
      await orderApi.dispatch(orderId, driverId);
      setOrders((current) => current.filter((order) => order.id !== orderId));
      setSelectedDrivers((current) => {
        const next = { ...current };
        delete next[orderId];
        return next;
      });
      showToast(`تم إسناد الطلب #${orderId} للمندوب وبدأ التوصيل`);
    } catch (dispatchError) {
      showToast(getErrorMessage(dispatchError), 'error');
      void loadData(true);
    } finally {
      setDispatchingId(null);
    }
  };

  if (loading) {
    return (
      <section className="container-page py-10">
        <div className="mx-auto max-w-3xl space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="h-52 animate-pulse rounded-3xl border border-sand-200 bg-white"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container-page py-10">
        <div className="mx-auto max-w-2xl">
          <Alert kind="error">
            <div className="flex flex-col items-start gap-3">
              <span>{error}</span>
              <button
                type="button"
                onClick={() => void loadData()}
                className="btn-secondary px-4 py-2 text-xs"
              >
                إعادة المحاولة
              </button>
            </div>
          </Alert>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-10">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="section-kicker">صفحة الكاشير</p>
          <h1 className="section-title mt-2">طلبات جاهزة للتوصيل</h1>
          <p className="mt-2 text-sm text-night/55">
            تعرض الطلبات التي أنهى المطبخ تجهيزها. اختر مندوب التوصيل ثم اضغط
            "إسناد وبدء التوصيل" ليختفي الطلب من هنا ويظهر في شاشة المندوب.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadData(true)}
          className="btn-secondary px-4 py-2 text-xs"
        >
          تحديث
        </button>
      </div>

      {drivers.length === 0 ? (
        <div className="mt-5">
          <Alert kind="info">
            لا يوجد مندوبو توصيل معتمدون حالياً. تأكد من إعداد حساب المندوب في
            ملف البيئة (DELIVERY_EMAIL) أو من اعتماد الحساب من الإدارة.
          </Alert>
        </div>
      ) : null}

      <div className="mt-6 space-y-4">
        {orders.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-night/45">لا توجد طلبات جاهزة للتسليم حالياً</p>
            <p className="mt-1 text-xs text-night/35">
              ستظهر الطلبات هنا تلقائياً بمجرد أن يعلن المطبخ جاهزيتها.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <CashierOrderCard
                key={order.id}
                order={order}
                drivers={drivers}
                selectedDriverId={selectedDrivers[order.id] ?? ''}
                dispatching={dispatchingId === order.id}
                onSelectDriver={handleSelectDriver}
                onDispatch={handleDispatch}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
