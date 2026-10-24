import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  formatPrice,
  orderStatuses,
  paymentStatuses,
} from '@shared/config';
import type { AdminStats, OrderDto } from '@shared/api';
import { orderApi } from '../../api/orders';
import { Alert, PageLoader, StatusBadge } from '../../components/ui/Feedback';
import { formatDateTime, getErrorMessage } from '../../utils/format';

interface StatCard {
  label: string;
  value: string;
  hint: string;
  tone: string;
}

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsResult, ordersResult] = await Promise.all([
        orderApi.stats(),
        orderApi.listAll({ limit: 6 }),
      ]);
      setStats(statsResult);
      setRecentOrders(ordersResult.items);
    } catch (loadError) {
      setError(getErrorMessage(loadError));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadDashboard();
  }, []);

  if (loading) return <PageLoader label="جارٍ تحميل الإحصائيات..." />;
  if (error) {
    return (
      <Alert kind="error">
        <div className="flex flex-col items-start gap-3">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => void loadDashboard()}
            className="btn-secondary px-4 py-2 text-xs"
          >
            إعادة المحاولة
          </button>
        </div>
      </Alert>
    );
  }

  const cards: StatCard[] = [
    {
      label: 'إجمالي الطلبات',
      value: String(stats?.totalOrders ?? 0),
      hint: `${stats?.pendingOrders ?? 0} طلب في الانتظار`,
      tone: 'bg-blue-50 text-blue-700',
    },
    {
      label: 'الإيرادات المحصلة',
      value: formatPrice(stats?.totalRevenue ?? 0),
      hint: 'من الطلبات المدفوعة',
      tone: 'bg-emerald-50 text-emerald-700',
    },
    {
      label: 'قيد التحضير',
      value: String(stats?.preparingOrders ?? 0),
      hint: `${stats?.outForDeliveryOrders ?? 0} خرج للتوصيل`,
      tone: 'bg-amber-50 text-amber-700',
    },
    {
      label: 'الحجوزات',
      value: String(stats?.totalReservations ?? 0),
      hint: `${stats?.totalMenuItems ?? 0} طبق في المنيو`,
      tone: 'bg-violet-50 text-violet-700',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-emerald-deep">
            ملخص تشغيل المطعم
          </p>
          <p className="text-xs text-night/45">
            الأرقام محدثة لحظة فتح الصفحة
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadDashboard()}
          className="btn-secondary px-4 py-2 text-xs"
        >
          تحديث
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="card-surface p-5">
            <p className="text-2xl font-bold text-emerald-deep">
              {card.value}
            </p>
            <p className="mt-1 text-xs font-semibold text-night/45">
              {card.label}
            </p>
            <p className="mt-3 border-t border-dashed border-sand-200 pt-3 text-[11px] text-night/40">
              {card.hint}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="card-surface overflow-hidden">
          <div className="flex items-center justify-between border-b border-sand-200 px-5 py-4">
            <div>
              <h2 className="font-display text-xl font-bold text-emerald-deep">
                أحدث الطلبات
              </h2>
              <p className="text-xs text-night/45">آخر 6 طلبات واردة</p>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs font-bold text-gold transition hover:text-[#a8861b]"
            >
              عرض الكل
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-night/45">
              لا توجد طلبات حتى الآن
            </p>
          ) : (
            <div className="divide-y divide-sand-100">
              {recentOrders.map((order) => {
                const statusMeta = orderStatuses[order.orderStatus];
                const paymentMeta = paymentStatuses[order.paymentStatus];
                return (
                  <div
                    key={order.id}
                    className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
                  >
                    <div>
                      <p className="text-sm font-bold text-emerald-deep">
                        #{order.id} · {order.customerName ?? 'عميل'}
                      </p>
                      <p className="mt-0.5 text-[11px] text-night/40">
                        {formatDateTime(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge
                        label={statusMeta.ar}
                        color={statusMeta.color}
                      />
                      <StatusBadge
                        label={paymentMeta.ar}
                        color={paymentMeta.color}
                      />
                      <span className="text-sm font-bold text-emerald-deep">
                        {formatPrice(order.totalAmount)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Link
            to="/admin/menu"
            className="group flex items-center gap-4 rounded-3xl bg-emerald-deep p-5 text-white transition hover:bg-[#0b3125]"
          >
            <div>
              <p className="font-display text-lg font-bold">إدارة المنيو</p>
              <p className="text-xs text-sand-100/60">
                إضافة وتعديل الأطباق والأسعار
              </p>
            </div>
          </Link>
          <Link
            to="/admin/orders"
            className="group flex items-center gap-4 rounded-3xl bg-white p-5 shadow-sm transition hover:shadow-soft"
          >
            <div>
              <p className="font-display text-lg font-bold text-emerald-deep">
                متابعة الطلبات
              </p>
              <p className="text-xs text-night/45">
                تحديث حالات التحضير والتوصيل
              </p>
            </div>
          </Link>
          <Link
            to="/admin/reservations"
            className="group flex items-center gap-4 rounded-3xl bg-white p-5 shadow-sm transition hover:shadow-soft"
          >
            <div>
              <p className="font-display text-lg font-bold text-emerald-deep">
                حجوزات الطاولات
              </p>
              <p className="text-xs text-night/45">تأكيد وإلغاء الحجوزات</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
