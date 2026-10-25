import { useCallback, useEffect, useState } from 'react';
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
import { Alert, Spinner, StatusBadge } from '../components/ui/Feedback';
import { formatDateTime, getErrorMessage } from '../utils/format';

const roundMoney = (value: number): number =>
  Math.round((value + Number.EPSILON) * 100) / 100;

const DeliveryOrderCard = ({
  order,
  showDriver,
  cashValue,
  confirming,
  onCashChange,
  onConfirm,
}: {
  order: OrderDto;
  showDriver: boolean;
  cashValue: string;
  confirming: boolean;
  onCashChange: (orderId: number, value: string) => void;
  onConfirm: (orderId: number) => void;
}) => {
  const orderMeta = orderStatuses[order.orderStatus];
  const paymentMeta = paymentStatuses[order.paymentStatus];
  const alreadyPaid = order.paymentStatus === 'PAID';
  const parsedCash = cashValue.trim() === '' ? null : Number(cashValue);
  const validCash =
    parsedCash !== null &&
    Number.isFinite(parsedCash) &&
    parsedCash >= order.totalAmount;
  const change =
    parsedCash !== null && Number.isFinite(parsedCash)
      ? roundMoney(parsedCash - order.totalAmount)
      : null;

  return (
    <article className="card-surface overflow-hidden">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-200 bg-sand-50/60 px-5 py-4">
        <div>
          <p className="font-display text-xl font-bold text-emerald-deep">
            طلب #{order.id}
          </p>
          <p className="text-xs text-night/45">
            خرج للتوصيل: {formatDateTime(order.dispatchedAt ?? order.updatedAt)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge label={orderMeta.ar} color={orderMeta.color} />
          <StatusBadge label={paymentMeta.ar} color={paymentMeta.color} />
        </div>
      </header>

      <div className="grid gap-5 px-5 py-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="rounded-2xl border border-sand-200 bg-sand-50/50 p-4 text-xs leading-6 text-night/60">
            <p>
              <span className="font-bold text-emerald-deep">العميل: </span>
              {order.customerName ?? 'عميل'}
            </p>
            {order.customerPhone ? (
              <p>
                <span className="font-bold text-emerald-deep">الهاتف: </span>
                <a
                  href={`tel:${order.customerPhone}`}
                  dir="ltr"
                  className="font-semibold text-emerald-deep underline decoration-gold underline-offset-4"
                >
                  {order.customerPhone}
                </a>
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
            {showDriver && order.deliveryUserName ? (
              <p>
                <span className="font-bold text-emerald-deep">المندوب: </span>
                {order.deliveryUserName}
                {order.deliveryUserPhone
                  ? ` · ${order.deliveryUserPhone}`
                  : ''}
              </p>
            ) : null}
          </div>

          <ul className="mt-3 space-y-2">
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
        </div>

        <div className="rounded-2xl border border-sand-200 bg-white p-4">
          <div className="flex items-center justify-between border-b border-dashed border-sand-200 pb-3">
            <span className="text-sm font-bold text-night/55">
              المطلوب تحصيله
            </span>
            <span className="font-display text-xl font-bold text-emerald-deep">
              {formatPrice(order.totalAmount)}
            </span>
          </div>

          {alreadyPaid ? (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-xs font-bold text-emerald-700">
              تم دفع هذا الطلب مسبقاً — لا يوجد مبلغ نقدي مطلوب.
            </div>
          ) : (
            <div className="mt-4 grid gap-3">
              <label className="block">
                <span className="field-label">المبلغ المستلم</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  dir="ltr"
                  value={cashValue}
                  onChange={(event) =>
                    onCashChange(order.id, event.target.value)
                  }
                  className="field-control text-left"
                  placeholder="0.00"
                />
              </label>

              <div
                className={`rounded-xl border px-3 py-2.5 ${
                  change !== null && change < 0
                    ? 'border-red-200 bg-red-50 text-red-700'
                    : 'border-sand-200 bg-sand-50 text-emerald-deep'
                }`}
              >
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-bold">الباقي للعميل</span>
                  <span className="font-display text-lg font-bold">
                    {change === null
                      ? '—'
                      : change < 0
                        ? 'المبلغ غير كافٍ'
                        : formatPrice(change)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => onConfirm(order.id)}
            disabled={confirming || (!alreadyPaid && !validCash)}
            className="btn-primary mt-4 w-full py-3 text-sm"
          >
            {confirming ? <Spinner className="h-4 w-4" /> : null}
            تم التسليم والاستلام
          </button>
        </div>
      </div>
    </article>
  );
};

export const DeliveryPage = () => {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [cashInputs, setCashInputs] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<number | null>(null);
  const { user, isAuthenticated, isAdmin, loading: authLoading } = useAuth();
  const { showToast } = useToast();

  const loadOrders = useCallback(
    async (silent = false) => {
      if (authLoading || !isAuthenticated || !getStoredToken()) return;
      if (!silent) setLoading(true);
      setError(null);
      try {
        const result = await orderApi.listDelivery(1, 50);
        setOrders(result.items);
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
    void loadOrders();
    const timer = window.setInterval(() => {
      if (!document.hidden) void loadOrders(true);
    }, 10_000);
    return () => window.clearInterval(timer);
  }, [authLoading, isAuthenticated, loadOrders]);

  // Seed the cash field with the exact order total once per order so drivers
  // can confirm quickly or type the amount the customer handed them.
  useEffect(() => {
    setCashInputs((current) => {
      let changed = false;
      const next = { ...current };
      for (const order of orders) {
        if (order.paymentStatus !== 'PAID' && next[order.id] === undefined) {
          next[order.id] = order.totalAmount.toFixed(2);
          changed = true;
        }
      }
      return changed ? next : current;
    });
  }, [orders]);

  const handleCashChange = (orderId: number, value: string) => {
    setCashInputs((current) => ({ ...current, [orderId]: value }));
  };

  const handleConfirm = async (orderId: number) => {
    if (confirmingId !== null) return;
    const order = orders.find((item) => item.id === orderId);
    if (!order) return;

    const input = cashInputs[orderId]?.trim() ?? '';
    const cashReceived =
      order.paymentStatus === 'PAID' || input === ''
        ? undefined
        : Number(input);

    if (
      order.paymentStatus !== 'PAID' &&
      (cashReceived === undefined ||
        !Number.isFinite(cashReceived) ||
        cashReceived < order.totalAmount)
    ) {
      showToast('أدخل مبلغاً مستلماً مساوياً لإجمالي الطلب أو أكبر', 'error');
      return;
    }

    setConfirmingId(orderId);
    try {
      const delivered = await orderApi.confirmDelivery(orderId, cashReceived);
      setOrders((current) => current.filter((item) => item.id !== orderId));
      setCashInputs((current) => {
        const next = { ...current };
        delete next[orderId];
        return next;
      });
      showToast(
        delivered.cashChange !== null
          ? `تم تسليم الطلب #${orderId} وتحصيل ${formatPrice(delivered.cashReceived ?? order.totalAmount)}، الباقي ${formatPrice(delivered.cashChange)}`
          : `تم تسليم الطلب #${orderId} وتأكيد الدفع بنجاح`,
      );
    } catch (confirmError) {
      showToast(getErrorMessage(confirmError), 'error');
      void loadOrders(true);
    } finally {
      setConfirmingId(null);
    }
  };

  if (loading) {
    return (
      <section className="container-page py-10">
        <div className="mx-auto max-w-3xl space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-3xl border border-sand-200 bg-white"
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
                onClick={() => void loadOrders()}
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
          <p className="section-kicker">واجهة التوصيل</p>
          <h1 className="section-title mt-2">
            {isAdmin ? 'متابعة التوصيل المباشر' : `طلباتك يا ${user?.name}`}
          </h1>
          <p className="mt-2 text-sm text-night/55">
            {isAdmin
              ? 'كل الطلبات التي خرجت للتوصيل ومندوبوها، مع إمكانية تأكيد التسليم والتحصيل.'
              : 'تظهر هنا الطلبات المسندة إليك فقط. أدخل المبلغ المستلم وتحقق من الباقي ثم أكد التسليم والاستلام.'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadOrders(true)}
          className="btn-secondary px-4 py-2 text-xs"
        >
          تحديث
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {orders.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-night/45">لا توجد طلبات توصيل مسندة إليك حالياً</p>
            <p className="mt-1 text-xs text-night/35">
              ستظهر الطلبات هنا تلقائياً عندما يسندها الكاشير إليك.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <DeliveryOrderCard
                key={order.id}
                order={order}
                showDriver={isAdmin}
                cashValue={cashInputs[order.id] ?? ''}
                confirming={confirmingId === order.id}
                onCashChange={handleCashChange}
                onConfirm={handleConfirm}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
