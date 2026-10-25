import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Alert, Spinner } from '../components/ui/Feedback';
import { InputField } from '../components/ui/FormFields';
import { getErrorDetails, getErrorMessage } from '../utils/format';

const roleHome = (role?: string): string => {
  if (role === 'admin') return '/admin';
  if (role === 'kitchen') return '/kitchen';
  if (role === 'cashier') return '/cashier';
  return '/orders';
};

const safeRedirect = (value: string | null): string | null => {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return null;
  return value;
};

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);
  const { login, isAuthenticated, loading, user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = safeRedirect(searchParams.get('redirect'));
  const showPendingNotice = searchParams.get('pending') === '1';

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate(redirect ?? roleHome(user?.role), { replace: true });
    }
  }, [loading, isAuthenticated, navigate, redirect, user?.role]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setFieldErrors([]);

    try {
      const loggedIn = await login({ email: email.trim(), password });
      showToast(`أهلاً بعودتك يا ${loggedIn.name}`);
      // Navigation is handled by the effect above once auth state is committed.
    } catch (loginError) {
      setError(getErrorMessage(loginError));
      setFieldErrors(getErrorDetails(loginError));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="تسجيل الدخول"
      subtitle="سجّل دخولك لمتابعة طلباتك، إتمام الشراء، وحجز طاولتك بسهولة."
      footer={
        <p>
          ليس لديك حساب؟{' '}
          <Link
            to={`/register${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
            className="font-bold text-emerald-deep underline decoration-gold decoration-2 underline-offset-4"
          >
            أنشئ حساباً جديداً
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {showPendingNotice ? (
          <Alert kind="info">
            حسابك قيد المراجعة، يرجى انتظار موافقة الإدارة قبل تسجيل الدخول.
          </Alert>
        ) : null}

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

        <div>
          <div className="flex items-center justify-between">
            <span className="field-label">كلمة المرور</span>
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="mb-2 text-xs font-bold text-emerald-deep/55 transition hover:text-emerald-deep"
            >
              {showPassword ? 'إخفاء' : 'إظهار'}
            </button>
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            className="field-control"
            dir="ltr"
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
              جارٍ تسجيل الدخول...
            </>
          ) : (
            'تسجيل الدخول'
          )}
        </button>

        <p className="text-center text-[11px] leading-6 text-night/40">
          بالدخول أنت توافق على استخدام بياناتك لإتمام طلباتك وحجوزاتك فقط.
        </p>
      </form>
    </AuthLayout>
  );
};
