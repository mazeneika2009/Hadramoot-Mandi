import { useCallback, useEffect, useState } from 'react';
import {
  formatPrice,
  orderStatuses,
  orderStatusList,
} from '@shared/config';
import type { OrderDto, OrderStatus } from '@shared/api';
import { getStoredToken } from '../api/client';
import { orderApi } from '../api/orders';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { StatusBadge } from '../components/ui/Feedback';
import { Alert, Spinner } from '../components/ui/Feedback';
import { formatDateTime } from '../utils/format';

import { getErrorMessage } from '../utils/format';

const CashierOrderRow = ({
  order,
  onStatusChange,
}: {
  order: OrderDto;
  onStatusChange: (orderId: number, newStatus: OrderStatus) => void;
}) => {
  const orderMeta = orderStatuses[order.orderStatus];
  return (
    <div key={order.id} className="card-surface p-4 border-b border-sand-200">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-display text-xl font-bold text-emerald-deep">
            طلب #{order.id}
          </p>
          <p className="text-xs text-night/45">
            {formatDateTime(order.createdAt)}
          </p>
        </div>
        <StatusBadge label={orderMeta.ar} color={orderMeta.color} />
      </div>

      <div className="mt-3 grid gap-2">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-2 text-sm">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-sand-100 text-[10px] font-bold text-emerald-deep">
              {item.quantity}×
            </span>
            <span className="truncate font-semibold text-night/70">
              {item.name}
            </span>
            <span className="font-bold text-emerald-deep">
              {formatPrice(item.lineTotal)}
            </span>
          </div>
        ))}
        <div className="mt-2 font-bold text-emerald-deep">الإجمالي: {formatPrice(order.totalAmount)}</div>
      </div>

      <div className="mt-4">
        <select
          className="rounded-xl border border-sand-200 bg-white px-3 py-2 text-xs font-bold text-emerald-deep outline-none transition focus:border-emerald-deep"
          onChange={(e) => onStatusChange(order.id, e.target.value as OrderStatus)}
        >
          {orderStatusList.map((status) => (
            <option key={status} value={status}>
              {orderStatuses[status].ar}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const CashierPage = () => {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const { showToast } = useToast();

  const { isAuthenticated, loading: authLoading } = useAuth();

  const loadOrders = useCallback(async () => {
    if (authLoading || !isAuthenticated || !getStoredToken()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await orderApi.listCashier(1, 50);
      setOrders(result.items);
    } catch (err) {
      setError(getErrorMessage(err));
      showToast('فشل تحميل طلبات الكاشير', 'error');
    } finally {
      setLoading(false);
    }
  }, [authLoading, isAuthenticated, showToast]);

  useEffect(() => {
    if (authLoading || !isAuthenticated) return;
    void loadOrders();
    const timer = window.setInterval(() => {
      if (!document.hidden) void loadOrders();
    }, 15000);
    return () => window.clearInterval(timer);
  }, [authLoading, isAuthenticated, loadOrders]);

  const handleStatusChange = async (orderId: number, newStatus: OrderStatus) => {
    if (updatingId !== null) return;
    setUpdatingId(orderId);
    try {
      const updated = await orderApi.updateStatus(orderId, newStatus);
      setOrders((current) =>
        current.map((item) => (item.id === updated.id ? updated : item)),
      );
      showToast(`تم تحديث طلب #${orderId} إلى ${orderStatuses[newStatus].ar}`);
    } catch (updateError) {
      showToast(getErrorMessage(updateError), 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <section className="container-page py-10">
        <div className="mx-auto max-w-2xl">
          <div className="h-64 animate-pulse rounded-3xl border border-sand-200 bg-white" />
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
          <p className="section-kicker">صفحة الكاشير</p>
          <h1 className="section-title mt-2">طلبات جاهزة للتسليم</h1>
          <p className="mt-2 text-sm text-night/55">
            تعرض الطلبات التي وضعها المطبخ كجاهزة، ويمكنك تحويلها إلى "خرج للتوصيل" أو "مسلّم".
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadOrders()}
          disabled={loading}
          className="btn-secondary px-4 py-2 text-xs"
        >
          {loading ? <Spinner className="h-4 w-4" /> : null}
          تحديث
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-night/45">لا توجد طلبات جاهزة حالياً</p>
          </div>
        ) : (
          <div>{orders.map((order) => <CashierOrderRow key={order.id} order={order} onStatusChange={handleStatusChange} />)}</div>
        )}
      </div>
    </section>
  );
};