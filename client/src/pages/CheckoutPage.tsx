import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  appConfig,
  brand,
  formatPrice,
  paymentMethods,
} from '@shared/config';
import type { OrderDto } from '@shared/api';
import { orderApi } from '../api/orders';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Alert, EmptyState, Spinner } from '../components/ui/Feedback';
import { TextareaField } from '../components/ui/FormFields';
import { getErrorMessage } from '../utils/format';

export const CheckoutPage = () => {
  const { user } = useAuth();
  const { lines, subtotal, clearCart } = useCart();
  const { showToast } = useToast();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string>(
    paymentMethods[0].id,
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdOrder, setCreatedOrder] = useState<OrderDto | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (deliveryAddress.trim().length < 10) {
      setError('يرجى كتابة عنوان تفصيلي لا يقل عن 10 أحرف');
      return;
    }
    if (lines.length === 0) {
      setError('سلتك فارغة، أضف بعض الأطباق أولاً');
      return;
    }

    setSubmitting(true);
    try {
      const normalizedPaymentMethod = paymentMethod === 'cash' ? 'CASH' : 'ONLINE';
      const order = await orderApi.create({
        items: lines.map((line) => ({
          menuItemId: line.item.id,
          quantity: line.quantity,
        })),
        deliveryAddress: deliveryAddress.trim(),
        notes: notes.trim() || undefined,
        paymentMethod: normalizedPaymentMethod,
      });
      setCreatedOrder(order);
      clearCart();
      showToast('تم إنشاء طلبك بنجاح');
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setSubmitting(false);
    }
  };

  if (createdOrder) {
    return (
      <section className="container-page py-14 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="card-surface overflow-hidden text-center">
            <div className="bg-emerald-deep px-6 py-10 text-white">
              <h1 className="font-display text-3xl font-bold">
                تم استلام طلبك
              </h1>
              <p className="mt-2 text-sm text-sand-100/70">
                سنبدأ تحضير طلبك في أسرع وقت. يمكنك متابعة الحالة لحظة بلحظة.
              </p>
            </div>
            <div className="px-6 py-8">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-sand-50 p-4">
                  <p className="text-xs text-night/45">رقم الطلب</p>
                  <p className="mt-1 font-display text-xl font-bold text-emerald-deep">
                    #{createdOrder.id}
                  </p>
                </div>
                <div className="rounded-2xl bg-sand-50 p-4">
                  <p className="text-xs text-night/45">الإجمالي</p>
                  <p className="mt-1 font-display text-xl font-bold text-emerald-deep">
                    {formatPrice(createdOrder.totalAmount)}
                  </p>
                </div>
                <div className="rounded-2xl bg-sand-50 p-4">
                  <p className="text-xs text-night/45">التوصيل</p>
                  <p className="mt-1 text-sm font-bold text-emerald-deep">
                    {createdOrder.deliveryAddress.slice(0, 32)}
                    {createdOrder.deliveryAddress.length > 32 ? '...' : ''}
                  </p>
                </div>
              </div>

              {createdOrder.paymentUrl ? (
                <div className="mt-6 space-y-3">
                  <a
                    href={createdOrder.paymentUrl}
                    className="btn-gold w-full py-3.5"
                  >
                    ادفع الآن عبر فواتيرك
                  </a>
                  <p className="text-xs leading-6 text-night/45">
                    سيتم تحويلك إلى صفحة دفع آمنة تدعم فودافون كاش، فوري،
                    والبطاقات البنكية.
                  </p>
                </div>
              ) : (
                <div className="mt-6">
                  <Alert kind="info">
                    تم حفظ طلبك بنجاح، وبوابة الدفع الإلكتروني غير مفعّلة حالياً.
                    يمكنك متابعة الطلب وستظهر خيارات الدفع عند توفرها.
                  </Alert>
                </div>
              )}

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link to="/orders" className="btn-primary">
                  متابعة الطلب
                </Link>
                <Link to="/#menu" className="btn-secondary">
                  مواصلة التسوق
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="container-page py-16">
        <div className="mx-auto max-w-2xl">
          <EmptyState
            title="سلتك فارغة"
            description="أضف أطباقك المفضلة من المنيو ثم عد لإتمام الطلب."
            action={
              <Link to="/#menu" className="btn-primary">
                تصفح المنيو
              </Link>
            }
          />
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-10 sm:py-14">
      <div className="mb-8">
        <p className="section-kicker">إتمام الطلب</p>
        <h1 className="section-title mt-2">خطوة أخيرة للمندي</h1>
        <p className="mt-2 text-sm text-night/55">
          أدخل بيانات التوصيل واختر طريقة الدفع، وسنتولى الباقي.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="space-y-6">
          {error ? <Alert kind="error">{error}</Alert> : null}

          <div className="card-surface p-6">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="font-display text-xl font-bold text-emerald-deep">
                  بيانات التوصيل
                </h2>
                <p className="text-xs text-night/45">
                  هذه البيانات سيستخدمها فريق التوصيل للوصول إليك
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-sand-200 bg-sand-50 px-4 py-3">
                <p className="text-[10px] font-semibold text-night/45">
                  الاسم
                </p>
                <p className="mt-0.5 text-sm font-bold text-emerald-deep">
                  {user?.name}
                </p>
              </div>
              <div className="rounded-2xl border border-sand-200 bg-sand-50 px-4 py-3">
                <p className="text-[10px] font-semibold text-night/45">
                  رقم الهاتف
                </p>
                <p dir="ltr" className="mt-0.5 text-right text-sm font-bold text-emerald-deep">
                  {user?.phone || 'غير مسجل'}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <TextareaField
                label="عنوان التوصيل بالتفصيل"
                value={deliveryAddress}
                onChange={(event) => setDeliveryAddress(event.target.value)}
                placeholder="المدينة، الحي، الشارع، رقم العقار، الدور، وعلامة مميزة"
                minLength={10}
                maxLength={500}
                required
              />
            </div>

            <div className="mt-5">
              <TextareaField
                label="ملاحظات للطلب"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="أي تعليمات خاصة؟ (اختياري)"
                maxLength={500}
              />
            </div>
          </div>

          <div className="card-surface p-6">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="font-display text-xl font-bold text-emerald-deep">
                  طريقة الدفع
                </h2>
                <p className="text-xs text-night/45">
                  الدفع يتم عبر بوابة فواتيرك الآمنة
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border px-4 py-3 transition ${
                    paymentMethod === method.id
                      ? 'border-emerald-deep bg-emerald-deep/[0.04]'
                      : 'border-sand-200 hover:border-sand-300'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                        paymentMethod === method.id
                          ? 'border-emerald-deep'
                          : 'border-sand-300'
                      }`}
                    >
                      {paymentMethod === method.id ? (
                        <span className="h-2 w-2 rounded-full bg-emerald-deep" />
                      ) : null}
                    </span>
                    <span className="text-sm font-bold text-emerald-deep">
                      {method.ar}
                    </span>
                  </span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                    className="sr-only"
                  />
                  <span className="text-[10px] font-semibold text-night/35">
                    فواتيرك
                  </span>
                </label>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-sand-50 px-4 py-3 text-xs leading-6 text-night/50">
              لن نحتفظ ببيانات بطاقتك. تتم كل العمليات على صفحة الدفع الآمنة
              الخاصة بفواتيرك.
            </div>
          </div>
        </div>

        <aside className="card-surface sticky top-28 overflow-hidden">
          <div className="border-b border-sand-200 bg-sand-50 px-6 py-5">
            <h2 className="font-display text-xl font-bold text-emerald-deep">
              ملخص الطلب
            </h2>
            <p className="mt-0.5 text-xs text-night/45">
              {lines.length} صنف · {brand.name}
            </p>
          </div>
          <div className="max-h-[42vh] space-y-3 overflow-y-auto px-6 py-5">
            {lines.map((line) => (
              <div key={line.item.id} className="flex items-start gap-3">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-sand-100">
                  {line.item.imageUrl ? (
                    <img
                      src={line.item.imageUrl}
                      alt={line.item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-emerald-deep">
                    {line.item.name}
                  </p>
                  <p className="text-xs text-night/45">
                    {line.quantity} × {formatPrice(line.item.price)}
                  </p>
                </div>
                <p className="whitespace-nowrap text-sm font-bold text-emerald-deep">
                  {formatPrice(line.item.price * line.quantity)}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-sand-200 px-6 py-5">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-night/60">
                <span>المجموع الفرعي</span>
                <span className="font-bold text-night">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-night/60">
                <span>رسوم التوصيل</span>
                <span className="font-bold text-emerald-700">
                  {appConfig.deliveryFee === 0
                    ? 'مجاني'
                    : formatPrice(appConfig.deliveryFee)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-dashed border-sand-200 pt-3">
                <span className="font-bold text-emerald-deep">الإجمالي</span>
                <span className="font-display text-2xl font-bold text-emerald-deep">
                  {formatPrice(subtotal + appConfig.deliveryFee)}
                </span>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary mt-5 w-full py-3.5"
            >
              {submitting ? (
                <>
                  <Spinner className="h-4 w-4" />
                  جارٍ إنشاء الطلب...
                </>
              ) : (
                'تأكيد الطلب'
              )}
            </button>
            <p className="mt-3 text-center text-[10px] leading-5 text-night/40">
              بالضغط على تأكيد الطلب يتم حساب السعر النهائي من قاعدة بيانات
              المطعم.
            </p>
          </div>
        </aside>
      </form>
    </section>
  );
};
