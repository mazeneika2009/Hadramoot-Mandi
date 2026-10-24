import { useCallback, useEffect, useState } from 'react';
import {
  formatPrice,
  isOrderStatus,
  isPaymentStatus,
  orderStatusList,
  orderStatuses,
  paymentStatuses,
} from '@shared/config';
import type {
  OrderDto,
  OrderStatus,
  PaginationMeta,
  PaymentStatus,
} from '@shared/api';
import { orderApi } from '../../api/orders';
import { useToast } from '../../context/ToastContext';
import {
  Alert,
  EmptyState,
  Spinner,
  StatusBadge,
} from '../../components/ui/Feedback';
import { SelectField } from '../../components/ui/FormFields';
import {
  formatDateTime,
  getErrorMessage,
} from '../../utils/format';

type StatusFilter = OrderStatus | 'ALL';
type PaymentFilter = PaymentStatus | 'ALL';

const statusFilterOptions = [
  { value: 'ALL', label: 'كل الحالات' },
  ...orderStatusList.map((status) => ({
    value: status,
    label: orderStatuses[status].ar,
  })),
];

const paymentFilterOptions = [
  { value: 'ALL', label: 'كل حالات الدفع' },
  ...(Object.keys(paymentStatuses) as PaymentStatus[]).map((status) => ({
    value: status,
    label: paymentStatuses[status].ar,
  })),
];

const emptyPagination: PaginationMeta = {
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 1,
};

export const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [pagination, setPagination] =
    useState<PaginationMeta>(emptyPagination);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [paymentFilter, setPaymentFilter] =
    useState<PaymentFilter>('ALL');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { showToast } = useToast();

  const loadOrders = useCallback(
    async (options: { silent?: boolean } = {}) => {
      if (options.silent) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      try {
        const result = await orderApi.listAll({
          status: statusFilter === 'ALL' ? undefined : statusFilter,
          paymentStatus:
            paymentFilter === 'ALL' ? undefined : paymentFilter,
          page,
          limit: emptyPagination.limit,
        });
        setOrders(result.items);
        setPagination(result.pagination);
      } catch (loadError) {
        setError(getErrorMessage(loadError));
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [page, paymentFilter, statusFilter],
  );

  useEffect(() => {
    void loadOrders();
  }, [loadOrders]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      void loadOrders({ silent: true });
    }, 30_000);
    return () => window.clearInterval(interval);
  }, [loadOrders]);

  const handleStatusChange = async (
    order: OrderDto,
    nextStatus: string,
  ) => {
    if (!isOrderStatus(nextStatus) || nextStatus === order.orderStatus) return;
    setUpdatingId(order.id);
    try {
      const updated = await orderApi.updateStatus(order.id, nextStatus);
      setOrders((current) =>
        current.map((item) => (item.id === updated.id ? updated : item)),
      );
      showToast(`تم تحديث طلب #${order.id} إلى ${orderStatuses[nextStatus].ar}`);
    } catch (updateError) {
      showToast(getErrorMessage(updateError), 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h2 className="font-display text-2xl font-bold text-emerald-deep">
            إدارة الطلبات
          </h2>
          <p className="mt-1 text-sm text-night/50">
            {pagination.total} طلباً في السجل · يتحدث تلقائياً كل 30 ثانية
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <div className="w-full sm:w-44">
            <SelectField
              label="حالة الطلب"
              value={statusFilter}
              onChange={(event) => {
                const value = event.target.value;
                setStatusFilter(
                  isOrderStatus(value) ? value : 'ALL',
                );
                setPage(1);
              }}
              options={statusFilterOptions}
            />
          </div>
          <div className="w-full sm:w-44">
            <SelectField
              label="حالة الدفع"
              value={paymentFilter}
              onChange={(event) => {
                const value = event.target.value;
                setPaymentFilter(
                  isPaymentStatus(value) ? value : 'ALL',
                );
                setPage(1);
              }}
              options={paymentFilterOptions}
            />
          </div>
          <button
            type="button"
            onClick={() => void loadOrders({ silent: true })}
            disabled={refreshing}
            className="btn-secondary py-3 sm:self-end"
          >
            {refreshing ? <Spinner className="h-4 w-4" /> : null}
            تحديث
          </button>
        </div>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-28 animate-pulse rounded-2xl border border-sand-200 bg-white"
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
            title="لا توجد طلبات مطابقة"
            description="عدّل الفلاتر أو انتظر وصول طلبات جديدة."
          />
        ) : (
          <div className="space-y-3">
            {orders.map((order) => {
              const statusMeta = orderStatuses[order.orderStatus];
              const paymentMeta = paymentStatuses[order.paymentStatus];
              const isExpanded = expandedId === order.id;
              const itemsCount = order.items.reduce(
                (total, item) => total + item.quantity,
                0,
              );

              return (
                <article
                  key={order.id}
                  className="card-surface overflow-hidden"
                >
                  <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(isExpanded ? null : order.id)
                      }
                      className="min-w-0 flex-1 text-right"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-display text-lg font-bold text-emerald-deep">
                          طلب #{order.id}
                        </p>
                        <StatusBadge
                          label={statusMeta.ar}
                          color={statusMeta.color}
                        />
                        <StatusBadge
                          label={paymentMeta.ar}
                          color={paymentMeta.color}
                        />
                      </div>
                      <p className="mt-1 text-[11px] text-night/40">
                        {formatDateTime(order.createdAt)} · {itemsCount} قطعة
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-night/55">
                        <span className="font-semibold text-emerald-deep">
                          {order.customerName ?? 'عميل'}
                        </span>
                        {order.customerPhone ? (
                          <span className="inline-flex items-center gap-1" dir="ltr">
                            {order.customerPhone}
                          </span>
                        ) : null}
                        <span className="inline-flex items-center gap-1">
                          <span className="line-clamp-1">
                            {order.deliveryAddress}
                          </span>
                        </span>
                      </div>
                    </button>

                    <div className="flex items-center justify-between gap-4 border-t border-dashed border-sand-200 pt-3 lg:border-none lg:pt-0">
                      <p className="text-lg font-bold text-emerald-deep">
                        {formatPrice(order.totalAmount)}
                      </p>
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor={`order-status-${order.id}`}
                          className="text-xs font-semibold text-night/45"
                        >
                          الحالة
                        </label>
                        <select
                          id={`order-status-${order.id}`}
                          value={order.orderStatus}
                          onChange={(event) =>
                            void handleStatusChange(
                              order,
                              event.target.value,
                            )
                          }
                          disabled={
                            updatingId === order.id ||
                            order.orderStatus === 'CANCELLED'
                          }
                          className="rounded-xl border border-sand-200 bg-white px-3 py-2 text-xs font-bold text-emerald-deep outline-none transition focus:border-emerald-deep disabled:opacity-50"
                        >
                          {orderStatusList.map((status) => (
                            <option key={status} value={status}>
                              {orderStatuses[status].ar}
                            </option>
                          ))}
                        </select>
                        {updatingId === order.id ? (
                          <Spinner className="h-4 w-4 text-emerald-deep" />
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {isExpanded ? (
                    <div className="border-t border-sand-200 bg-sand-50/60 px-5 py-4">
                      <div className="grid gap-5 lg:grid-cols-2">
                        <div>
                          <p className="text-xs font-bold text-emerald-deep">
                            الأصناف
                          </p>
                          <ul className="mt-2 space-y-1.5 text-xs text-night/55">
                            {order.items.map((item) => (
                              <li
                                key={item.id}
                                className="flex items-center justify-between gap-3"
                              >
                                <span>
                                  {item.name} × {item.quantity}
                                </span>
                                <span className="font-semibold text-emerald-deep">
                                  {formatPrice(item.lineTotal)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2 text-xs leading-6 text-night/55">
                          <p>
                            <span className="font-bold text-emerald-deep">
                              العميل:{' '}
                            </span>
                            {order.customerName ?? '—'}
                            {order.customerEmail
                              ? ` · ${order.customerEmail}`
                              : ''}
                          </p>
                          <p>
                            <span className="font-bold text-emerald-deep">
                              العنوان:{' '}
                            </span>
                            {order.deliveryAddress}
                          </p>
                          {order.notes ? (
                            <p>
                              <span className="font-bold text-emerald-deep">
                                ملاحظات:{' '}
                              </span>
                              {order.notes}
                            </p>
                          ) : null}
                          {order.paymentId ? (
                            <p dir="ltr" className="text-left">
                              Payment ID: {order.paymentId}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        )}
      </div>

      {!loading && !error && pagination.totalPages > 1 ? (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page <= 1}
            className="btn-secondary px-4 py-2 text-xs"
          >
            السابق
          </button>
          <span className="text-xs font-semibold text-night/50">
            صفحة {pagination.page} من {pagination.totalPages}
          </span>
          <button
            type="button"
            onClick={() =>
              setPage((current) =>
                Math.min(pagination.totalPages, current + 1),
              )
            }
            disabled={page >= pagination.totalPages}
            className="btn-secondary px-4 py-2 text-xs"
          >
            التالي
          </button>
        </div>
      ) : null}
    </div>
  );
};
