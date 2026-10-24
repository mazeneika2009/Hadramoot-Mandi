import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Alert, Spinner } from '../components/ui/Feedback';
import { InputField } from '../components/ui/FormFields';
import { getErrorDetails, getErrorMessage } from '../utils/format';

const safeRedirect = (value: string | null): string | null => {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return null;
  return value;
};

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);
  const { register, isAuthenticated, loading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = safeRedirect(searchParams.get('redirect'));

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate(redirect ?? '/', { replace: true });
    }
  }, [loading, isAuthenticated, navigate, redirect]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setFieldErrors([]);

    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }
    if (password.length < 8) {
      setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
      return;
    }

    setSubmitting(true);
    try {
      const newUser = await register({
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim() || undefined,
      });
      showToast(`تم إنشاء حسابك بنجاح، أهلاً ${newUser.name}`);
      if (redirect) {
        navigate(redirect, { replace: true });
      } else {
        navigate('/#menu', { replace: true });
      }
    } catch (registerError) {
      setError(getErrorMessage(registerError));
      setFieldErrors(getErrorDetails(registerError));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="إنشاء حساب جديد"
      subtitle="خطوة واحدة تفصلك عن الطلب أونلاين، متابعة الطلبات، وحجز طاولتك."
      footer={
        <p>
          لديك حساب بالفعل؟{' '}
          <Link
            to={`/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
            className="font-bold text-emerald-deep underline decoration-gold decoration-2 underline-offset-4"
          >
            سجّل الدخول
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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

        <InputField
          label="الاسم الكامل"
          type="text"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="مثال: محمد أحمد"
          minLength={2}
          required
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="البريد الإلكتروني"
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            dir="ltr"
            className="text-left"
            required
          />
          <InputField
            label="رقم الهاتف"
            type="tel"
            name="phone"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="01012345678"
            dir="ltr"
            className="text-left"
            hint="اختياري، لتسهيل التواصل بخصوص طلبك"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="كلمة المرور"
            type="password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="8 أحرف على الأقل"
            minLength={8}
            required
          />
          <InputField
            label="تأكيد كلمة المرور"
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="أعد كتابة كلمة المرور"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full py-3.5"
        >
          {submitting ? (
            <>
              <Spinner className="h-4 w-4" />
              جارٍ إنشاء الحساب...
            </>
          ) : (
            'إنشاء الحساب'
          )}
        </button>

        <p className="text-center text-[11px] leading-6 text-night/40">
          بإنشاء الحساب أنت توافق على سياسة الخصوصية وشروط الاستخدام.
        </p>
      </form>
    </AuthLayout>
  );
};
