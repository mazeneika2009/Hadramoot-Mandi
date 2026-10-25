import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { brand } from '@shared/config';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const navLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/#menu', label: 'المنيو' },
  { to: '/reservations', label: 'حجز طاولة' },
  { to: '/orders', label: 'طلباتي' },
];

const workspaceLinkClass = ({ isActive }: { isActive: boolean }): string =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? 'bg-emerald-deep text-white shadow-sm'
      : 'text-emerald-deep/75 hover:bg-emerald-deep/5 hover:text-emerald-deep'
  }`;

const mobileWorkspaceLinkClass = ({ isActive }: { isActive: boolean }): string =>
  `rounded-xl px-4 py-3 text-sm font-bold transition ${
    isActive
      ? 'bg-emerald-deep text-white'
      : 'text-emerald-deep hover:bg-emerald-deep/5'
  }`;

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, isKitchen, isCashier, logout } =
    useAuth();
  const { itemCount, openCart } = useCart();
  const location = useLocation();

  const workspaceLinks = isAdmin
    ? [
        { to: '/kitchen', label: 'المطبخ' },
        { to: '/cashier', label: 'الكاشير' },
      ]
    : [
        ...(isKitchen ? [{ to: '/kitchen', label: 'المطبخ' }] : []),
        ...(isCashier ? [{ to: '/cashier', label: 'الكاشير' }] : []),
      ];
  const isStaff = isKitchen || isCashier;
  const homePath = isKitchen ? '/kitchen' : isCashier ? '/cashier' : '/';

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-emerald-deep text-sand-100 sm:block">
        <div className="container-page flex items-center justify-between py-2 text-xs">
          <p>{brand.workingHours.ar}</p>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${brand.phone}`}
              className="inline-flex items-center gap-1.5 transition hover:text-gold"
            >
              <span dir="ltr">{brand.phoneDisplay}</span>
            </a>
            <span className="text-sand-100/70">{brand.address.ar}</span>
          </div>
        </div>
      </div>

      <div className="border-b border-sand-200/70 bg-sand-50/90 backdrop-blur-xl">
        <div className="container-page flex h-[72px] items-center justify-between gap-4">
          <Link to={homePath} className="group flex items-center gap-3">
            <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-deep text-gold shadow-lg shadow-emerald-deep/20">
              <span className="absolute inset-1 rounded-xl border border-gold/40" />
              <span className="font-display text-2xl font-bold">ح</span>
            </span>
            <span className="leading-tight">
              <span className="block font-display text-xl font-bold text-emerald-deep transition group-hover:text-[#0b3125]">
                {brand.name}
              </span>
              <span className="block text-[11px] font-semibold tracking-wide text-gold">
                {brand.tagline}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="القائمة الرئيسية">
            {!isStaff
              ? navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-emerald-deep/75 transition hover:bg-emerald-deep/5 hover:text-emerald-deep"
                  >
                    {link.label}
                  </Link>
                ))
              : null}
            {workspaceLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={workspaceLinkClass}
              >
                {link.label}
              </NavLink>
            ))}
            {isAdmin ? (
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold text-gold transition hover:bg-gold/10"
              >
                لوحة التحكم
              </Link>
            ) : null}
          </nav>

          <div className="flex items-center gap-2">
            {!isStaff ? (
              <button
                type="button"
                onClick={openCart}
                className="relative rounded-full border border-emerald-deep/10 bg-white p-3 text-emerald-deep transition hover:border-emerald-deep/30 hover:shadow-sm"
                aria-label="فتح سلة الطلبات"
              >
                سلة
                {itemCount > 0 ? (
                  <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-night">
                    {itemCount}
                  </span>
                ) : null}
              </button>
            ) : null}

            {isAuthenticated ? (
              <div className="hidden items-center gap-2 sm:flex">
                <div className="flex items-center gap-2 rounded-full border border-emerald-deep/10 bg-white px-3 py-2 text-sm">
                  <span className="max-w-28 truncate font-bold text-emerald-deep">
                    {user?.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full p-3 text-night/50 transition hover:bg-red-50 hover:text-red-600"
                  aria-label="تسجيل الخروج"
                  title="تسجيل الخروج"
                >
                  خروج
                </button>
              </div>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Link to="/login" className="btn-ghost px-4 py-2">
                  دخول
                </Link>
                <Link to="/register" className="btn-primary px-4 py-2">
                  إنشاء حساب
                </Link>
              </div>
            )}

            <button
              type="button"
              className="rounded-full border border-emerald-deep/10 bg-white p-3 text-emerald-deep lg:hidden"
              onClick={() => setMobileOpen((current) => !current)}
              aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? 'إغلاق' : 'القائمة'}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="border-t border-sand-200 bg-sand-50 px-4 pb-5 pt-3 lg:hidden">
            <nav className="flex flex-col gap-1" aria-label="قائمة الهاتف">
              {!isStaff
                ? navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="rounded-xl px-4 py-3 text-sm font-bold text-emerald-deep transition hover:bg-emerald-deep/5"
                    >
                      {link.label}
                    </Link>
                  ))
                : null}
              {workspaceLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={mobileWorkspaceLinkClass}
                >
                  {link.label}
                </NavLink>
              ))}
              {isAdmin ? (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-gold transition hover:bg-gold/10"
                >
                  لوحة التحكم
                </Link>
              ) : null}
            </nav>
            <div className="mt-4 border-t border-sand-200 pt-4">
              {isAuthenticated ? (
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-emerald-deep">
                      {user?.name}
                    </p>
                    <p className="text-xs text-night/50">{user?.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={logout}
                    className="btn-secondary px-3 py-2 text-xs"
                  >
                    خروج
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/login" className="btn-secondary">
                    تسجيل الدخول
                  </Link>
                  <Link to="/register" className="btn-primary">
                    إنشاء حساب
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};