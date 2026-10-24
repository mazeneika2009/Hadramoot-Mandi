import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { brand } from '@shared/config';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export const AuthLayout = ({
  title,
  subtitle,
  children,
  footer,
}: AuthLayoutProps) => (
  <section className="container-page py-12 sm:py-16">
    <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2.5rem] border border-sand-200 bg-white shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
      <div className="relative hidden overflow-hidden bg-emerald-deep p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <img
          src={brand.heroImageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep via-emerald-deep/85 to-emerald-deep/50" />
        <div className="pattern-surface absolute inset-0 opacity-25" />
        <div className="relative">
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold/40 text-xl font-bold text-gold">
              ح
            </span>
            <span>
              <span className="block font-display text-xl font-bold">
                {brand.name}
              </span>
              <span className="text-[10px] tracking-[0.2em] text-gold">
                {brand.tagline}
              </span>
            </span>
          </Link>
          <div className="mt-16">
            <blockquote className="mt-5 font-display text-3xl font-bold leading-snug">
              «المندي الأصيل مش أكلة، المندي حكاية حضرمية على مائدتك.»
            </blockquote>
            <p className="mt-4 text-sm leading-7 text-sand-100/65">
              انضم لعائلة حضرموت واستمتع بطلباتك، حجوزاتك، ومتابعة كل طبق من
              مطبخنا إلى بابك.
            </p>
          </div>
        </div>
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-6 text-sand-100/70 backdrop-blur">
          {brand.address.ar}
          <br />
          <span dir="ltr">{brand.phoneDisplay}</span>
        </div>
      </div>

      <div className="p-6 sm:p-10">
        <div className="mx-auto max-w-md">
          <p className="section-kicker">أهلاً بك في حضرموت</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-emerald-deep sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-7 text-night/55">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-7 border-t border-sand-200 pt-5 text-center text-sm text-night/55">
            {footer}
          </div>
        </div>
      </div>
    </div>
  </section>
);
