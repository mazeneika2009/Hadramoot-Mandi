import { Link } from 'react-router-dom';
import { brand } from '@shared/config';

const socialLinks = [
  { href: brand.social.facebook, label: 'فيسبوك' },
  { href: brand.social.instagram, label: 'إنستغرام' },
  { href: brand.social.whatsapp, label: 'واتساب' },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-emerald-deep text-sand-100">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/40 bg-white/5 text-gold">
              <span className="font-display text-2xl font-bold">ح</span>
            </span>
            <div>
              <p className="font-display text-2xl font-bold text-white">
                {brand.name}
              </p>
              <p className="text-xs font-semibold tracking-widest text-gold">
                {brand.tagline}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-8 text-sand-100/70">
            {brand.description}
          </p>
          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sand-100/80 transition hover:border-gold/40 hover:bg-gold/10 hover:text-gold"
                aria-label={label}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-white">تواصل معنا</h3>
          <ul className="mt-5 space-y-4 text-sm text-sand-100/75">
            <li className="flex items-start gap-3">
              <span>{brand.address.ar}</span>
            </li>
            <li className="flex items-center gap-3">
              <a
                href={`tel:${brand.phone}`}
                dir="ltr"
                className="transition hover:text-gold"
              >
                {brand.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <a
                href={`mailto:${brand.email}`}
                className="transition hover:text-gold"
              >
                {brand.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span>{brand.workingHours.ar}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-white">
            روابط سريعة
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-sand-100/75">
            <li>
              <Link to="/" className="transition hover:text-gold">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link to="/#menu" className="transition hover:text-gold">
                قائمة الطعام
              </Link>
            </li>
            <li>
              <Link to="/reservations" className="transition hover:text-gold">
                حجز طاولة
              </Link>
            </li>
            <li>
              <Link to="/orders" className="transition hover:text-gold">
                متابعة الطلبات
              </Link>
            </li>
            <li>
              <Link to="/login" className="transition hover:text-gold">
                تسجيل الدخول
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-sand-100/55 sm:flex-row">
          <p>
            © {year} {brand.name}. كل الحقوق محفوظة.
          </p>
          <p>صُنع بشغف للمندي الحضرمي الأصيل</p>
        </div>
      </div>
    </footer>
  );
};