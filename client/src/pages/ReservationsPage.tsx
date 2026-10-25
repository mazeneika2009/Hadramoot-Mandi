import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
} from 'react';
import { Link } from 'react-router-dom';
import {
  appConfig,
  brand,
  formatPrice,
  reservationStatuses,
} from '@shared/config';
import type { ReservationDto } from '@shared/api';
import { getStoredToken } from '../api/client';
import { reservationApi } from '../api/reservations';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Alert, Spinner, StatusBadge } from '../components/ui/Feedback';
import { InputField, SelectField, TextareaField } from '../components/ui/FormFields';
import {
  formatDate,
  formatTime,
  getErrorDetails,
  getErrorMessage,
  localDateInput,
} from '../utils/format';

const buildTimeOptions = (): { value: string; label: string }[] => {
  const options: { value: string; label: string }[] = [];
  for (let minutes = 12 * 60; minutes <= 22 * 60 + 30; minutes += 30) {
    const hours = Math.floor(minutes / 60);
    const minutePart = minutes % 60;
    const value = `${String(hours).padStart(2, '0')}:${String(minutePart).padStart(2, '0')}`;
    options.push({ value, label: formatTime(value) });
  }
  return options;
};

const timeOptions = buildTimeOptions();

const guestOptions = Array.from(
  { length: appConfig.maxGuests },
  (_, index) => {
    const guests = index + 1;
    return {
      value: String(guests),
      label: guests === 1 ? 'ضيف واحد' : `${guests} ضيوف`,
    };
  },
);

const tomorrow = (): string => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return localDateInput(date);
};

export const ReservationsPage = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { showToast } = useToast();
  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [date, setDate] = useState(tomorrow());
  const [time, setTime] = useState('19:00');
  const [guests, setGuests] = useState('2');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);
  const [createdReservation, setCreatedReservation] =
    useState<ReservationDto | null>(null);
  const [myReservations, setMyReservations] = useState<ReservationDto[]>([]);

  useEffect(() => {
    if (!user) return;
    setName((current) => current || user.name);
    setPhone((current) => current || user.phone || '');
    setEmail((current) => current || user.email);
  }, [user]);

  const loadMyReservations = useCallback(async () => {
    if (authLoading || !isAuthenticated || !getStoredToken()) return;
    try {
      const result = await reservationApi.listMine();
      setMyReservations(result.items);
    } catch {
      setMyReservations([]);
    }
  }, [authLoading, isAuthenticated]);

  useEffect(() => {
    if (authLoading || !isAuthenticated) return;
    void loadMyReservations();
  }, [authLoading, isAuthenticated, loadMyReservations]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setFieldErrors([]);
    setSubmitting(true);

    try {
      const reservation = await reservationApi.create({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        date,
        time,
        guests: Number(guests),
        notes: notes.trim() || undefined,
      });
      setCreatedReservation(reservation);
      setNotes('');
      showToast('تم استلام طلب الحجز، سنؤكده هاتفياً قريباً');
      void loadMyReservations();
    } catch (submitError) {
      setError(getErrorMessage(submitError));
      setFieldErrors(getErrorDetails(submitError));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container-page py-10 sm:py-14">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-emerald-deep px-6 py-10 text-white sm:px-10">
        <div className="pattern-surface absolute inset-0 opacity-25" />
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
            حجز طاولة
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            احجز مكانك على مائدة حضرموت
          </h1>
          <p className="mt-4 text-sm leading-8 text-sand-100/70">
            اختر التاريخ والوقت وعدد الضيوف، وسنتواصل معك لتأكيد الحجز. نستقبل
            العائلات والمجموعات في أجواء حضرمية دافئة.
          </p>
        </div>
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="card-surface p-6 sm:p-8">
          {createdReservation ? (
            <div className="text-center">
              <h2 className="font-display text-2xl font-bold text-emerald-deep">
                تم إرسال طلب الحجز
              </h2>
              <p className="mt-2 text-sm leading-7 text-night/55">
                حجزك رقم #{createdReservation.id} بتاريخ{' '}
                {formatDate(createdReservation.date)} الساعة{' '}
                {formatTime(createdReservation.time)} لعدد{' '}
                {createdReservation.guests} ضيوف. سنؤكد الحجز هاتفياً.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setCreatedReservation(null)}
                  className="btn-primary"
                >
                  حجز طاولة أخرى
                </button>
                <Link to="/#menu" className="btn-secondary">
                  تصفح المنيو
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div>
                  <h2 className="font-display text-xl font-bold text-emerald-deep">
                    بيانات الحجز
                  </h2>
                  <p className="text-xs text-night/45">
                    الحقول المعلّمة بـ * مطلوبة
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
                {error ? (
                  <Alert kind="error">
                    <div>
                      <p>{error}</p>
                      {fieldErrors.length > 0 ? (
                        <ul className="mt-2 list-inside list-disc text-xs font-medium">
                          {fieldErrors.map((detail) => (
                            <li key={detail}>{detail}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </Alert>
                ) : null}

                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField
                    label="الاسم الكامل"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    minLength={2}
                    required
                  />
                  <InputField
                    label="رقم الهاتف"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="01012345678"
                    dir="ltr"
                    className="text-left"
                    required
                  />
                </div>

                <InputField
                  label="البريد الإلكتروني"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  dir="ltr"
                  className="text-left"
                  hint="اختياري، لإرسال تأكيد الحجز"
                />

                <div className="grid gap-5 sm:grid-cols-3">
                  <InputField
                    label="التاريخ"
                    type="date"
                    value={date}
                    min={localDateInput()}
                    onChange={(event) => setDate(event.target.value)}
                    required
                  />
                  <SelectField
                    label="الوقت"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    options={timeOptions}
                    required
                  />
                  <SelectField
                    label="عدد الضيوف"
                    value={guests}
                    onChange={(event) => setGuests(event.target.value)}
                    options={guestOptions}
                    required
                  />
                </div>

                <TextareaField
                  label="ملاحظات"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="مناسبة خاصة؟ طلبات جلوس معينة؟ أخبرنا."
                  maxLength={500}
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full py-3.5"
                >
                  {submitting ? (
                    <>
                      <Spinner className="h-4 w-4" />
                      جارٍ إرسال الحجز...
                    </>
                  ) : (
                    'إرسال طلب الحجز'
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        <aside className="space-y-5">
          <div className="card-surface overflow-hidden">
            <div className="h-40 overflow-hidden">
              <img
                src={brand.storyImageUrl}
                alt="أجواء حضرموت بيت المندي"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-4 p-6 text-sm">
              <div className="flex items-start gap-3">
                <div>
                  <p className="font-bold text-emerald-deep">العنوان</p>
                  <p className="mt-0.5 text-xs leading-6 text-night/55">
                    {brand.address.ar}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div>
                  <p className="font-bold text-emerald-deep">مواعيد العمل</p>
                  <p className="mt-0.5 text-xs leading-6 text-night/55">
                    {brand.workingHours.ar}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div>
                  <p className="font-bold text-emerald-deep">للتأكيد والاستفسار</p>
                  <a
                    href={`tel:${brand.phone}`}
                    dir="ltr"
                    className="mt-0.5 block text-xs font-semibold text-night/55 transition hover:text-emerald-deep"
                  >
                    {brand.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-sand-100 p-6">
            <p className="font-display text-lg font-bold text-emerald-deep">
              حجزك يشمل
            </p>
            <ul className="mt-3 space-y-2 text-xs leading-6 text-night/55">
              <li>· طاولة محجوزة باسمك حتى 15 دقيقة من الموعد.</li>
              <li>· إمكانية طلب الأطباق مسبقاً لتكون جاهزة عند وصولك.</li>
              <li>· تأكيد هاتفي خلال ساعات العمل.</li>
            </ul>
            <p className="mt-4 text-[11px] text-night/40">
              متوسط سعر الوجبة للفرد {formatPrice(250)} تقريباً.
            </p>
          </div>
        </aside>
      </div>

      {isAuthenticated && myReservations.length > 0 ? (
        <div className="mt-12">
          <h2 className="font-display text-2xl font-bold text-emerald-deep">
            حجوزاتي
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {myReservations.map((reservation) => {
              const meta = reservationStatuses[reservation.status];
              return (
                <article
                  key={reservation.id}
                  className="rounded-2xl border border-sand-200 bg-white p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display text-lg font-bold text-emerald-deep">
                      حجز #{reservation.id}
                    </p>
                    <StatusBadge label={meta.ar} color={meta.color} />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-night/65">
                    {formatDate(reservation.date)} ·{' '}
                    {formatTime(reservation.time)}
                  </p>
                  <p className="mt-1 text-xs text-night/45">
                    {reservation.guests} ضيوف · {reservation.name}
                  </p>
                  {reservation.notes ? (
                    <p className="mt-2 text-xs leading-6 text-night/45">
                      {reservation.notes}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
};
