import { useCallback, useEffect, useState } from 'react';
import {
  isReservationStatus,
  reservationStatusList,
  reservationStatuses,
} from '@shared/config';
import type {
  PaginationMeta,
  ReservationDto,
  ReservationStatus,
} from '@shared/api';
import { reservationApi } from '../../api/reservations';
import { useToast } from '../../context/ToastContext';
import {
  Alert,
  EmptyState,
  Spinner,
  StatusBadge,
} from '../../components/ui/Feedback';
import { SelectField } from '../../components/ui/FormFields';
import {
  formatDate,
  formatDateTime,
  formatTime,
  getErrorMessage,
} from '../../utils/format';

type StatusFilter = ReservationStatus | 'ALL';

const statusFilterOptions = [
  { value: 'ALL', label: 'كل الحجوزات' },
  ...reservationStatusList.map((status) => ({
    value: status,
    label: reservationStatuses[status].ar,
  })),
];

const emptyPagination: PaginationMeta = {
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 1,
};

export const AdminReservationsPage = () => {
  const [reservations, setReservations] = useState<ReservationDto[]>([]);
  const [pagination, setPagination] =
    useState<PaginationMeta>(emptyPagination);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const { showToast } = useToast();

  const loadReservations = useCallback(
    async (options: { silent?: boolean } = {}) => {
      if (options.silent) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      try {
        const result = await reservationApi.listAll({
          status: statusFilter === 'ALL' ? undefined : statusFilter,
          page,
          limit: emptyPagination.limit,
        });
        setReservations(result.items);
        setPagination(result.pagination);
      } catch (loadError) {
        setError(getErrorMessage(loadError));
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [page, statusFilter],
  );

  useEffect(() => {
    void loadReservations();
  }, [loadReservations]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      void loadReservations({ silent: true });
    }, 30_000);
    return () => window.clearInterval(interval);
  }, [loadReservations]);

  const handleStatusChange = async (
    reservation: ReservationDto,
    nextStatus: string,
  ) => {
    if (
      !isReservationStatus(nextStatus) ||
      nextStatus === reservation.status
    ) {
      return;
    }
    setUpdatingId(reservation.id);
    try {
      const updated = await reservationApi.updateStatus(
        reservation.id,
        nextStatus,
      );
      setReservations((current) =>
        current.map((item) =>
          item.id === updated.id ? updated : item,
        ),
      );
      showToast(
        `تم تحديث حجز #${reservation.id} إلى ${reservationStatuses[nextStatus].ar}`,
      );
    } catch (updateError) {
      showToast(getErrorMessage(updateError), 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-2xl font-bold text-emerald-deep">
            إدارة الحجوزات
          </h2>
          <p className="mt-1 text-sm text-night/50">
            {pagination.total} حجزاً · التأكيد والإلغاء مباشرة
          </p>
        </div>

        <div className="flex w-full items-end gap-3 sm:w-auto">
          <div className="w-full sm:w-48">
            <SelectField
              label="حالة الحجز"
              value={statusFilter}
              onChange={(event) => {
                const value = event.target.value;
                setStatusFilter(
                  isReservationStatus(value) ? value : 'ALL',
                );
                setPage(1);
              }}
              options={statusFilterOptions}
            />
          </div>
          <button
            type="button"
            onClick={() => void loadReservations({ silent: true })}
            disabled={refreshing}
            className="btn-secondary py-3"
          >
            {refreshing ? <Spinner className="h-4 w-4" /> : null}
            تحديث
          </button>
        </div>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-48 animate-pulse rounded-2xl border border-sand-200 bg-white"
              />
            ))}
          </div>
        ) : error ? (
          <Alert kind="error">
            <div className="flex flex-col items-start gap-3">
              <span>{error}</span>
              <button
                type="button"
                onClick={() => void loadReservations()}
                className="btn-secondary px-4 py-2 text-xs"
              >
                إعادة المحاولة
              </button>
            </div>
          </Alert>
        ) : reservations.length === 0 ? (
          <EmptyState
            title="لا توجد حجوزات مطابقة"
            description="عدّل الفلتر أو انتظر وصول حجوزات جديدة."
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {reservations.map((reservation) => {
              const statusMeta = reservationStatuses[reservation.status];
              return (
                <article
                  key={reservation.id}
                  className="card-surface flex flex-col p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg font-bold text-emerald-deep">
                        حجز #{reservation.id}
                      </p>
                      <p className="mt-1 text-[11px] text-night/35">
                        أُنشئ {formatDateTime(reservation.createdAt)}
                      </p>
                    </div>
                    <StatusBadge
                      label={statusMeta.ar}
                      color={statusMeta.color}
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-sand-100 px-3 py-1.5 font-bold text-emerald-deep">
                      {formatDate(reservation.date)}
                    </span>
                    <span className="rounded-full bg-sand-100 px-3 py-1.5 font-bold text-emerald-deep">
                      {formatTime(reservation.time)}
                    </span>
                    <span className="rounded-full bg-sand-100 px-3 py-1.5 font-bold text-emerald-deep">
                      {reservation.guests} ضيوف
                    </span>
                  </div>

                  <div className="mt-4 space-y-1.5 text-xs text-night/55">
                    <p className="text-sm font-bold text-emerald-deep">
                      {reservation.name}
                    </p>
                    <a
                      href={`tel:${reservation.phone}`}
                      className="flex items-center gap-1.5 transition hover:text-emerald-deep"
                      dir="ltr"
                    >
                      {reservation.phone}
                    </a>
                    {reservation.email ? (
                      <a
                        href={`mailto:${reservation.email}`}
                        className="flex items-center gap-1.5 transition hover:text-emerald-deep"
                        dir="ltr"
                      >
                        {reservation.email}
                      </a>
                    ) : null}
                    {reservation.notes ? (
                      <p className="mt-2 rounded-xl bg-sand-50 p-3 leading-6 text-night/50">
                        {reservation.notes}
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-dashed border-sand-200 pt-4">
                    <p className="text-[11px] text-night/35">
                      {reservation.userId
                        ? 'حساب مسجل'
                        : 'حجز بدون حساب'}
                    </p>
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor={`reservation-status-${reservation.id}`}
                        className="text-xs font-semibold text-night/45"
                      >
                        الحالة
                      </label>
                      <select
                        id={`reservation-status-${reservation.id}`}
                        value={reservation.status}
                        onChange={(event) =>
                          void handleStatusChange(
                            reservation,
                            event.target.value,
                          )
                        }
                        disabled={updatingId === reservation.id}
                        className="rounded-xl border border-sand-200 bg-white px-3 py-2 text-xs font-bold text-emerald-deep outline-none transition focus:border-emerald-deep disabled:opacity-50"
                      >
                        {reservationStatusList.map((status) => (
                          <option key={status} value={status}>
                            {reservationStatuses[status].ar}
                          </option>
                        ))}
                      </select>
                      {updatingId === reservation.id ? (
                        <Spinner className="h-4 w-4 text-emerald-deep" />
                      ) : null}
                    </div>
                  </div>
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
