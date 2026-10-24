import { Link } from 'react-router-dom';
import { brand } from '@shared/config';

export const NotFoundPage = () => (
  <section className="container-page flex min-h-[62vh] items-center justify-center py-16">
    <div className="max-w-lg text-center">
      <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-emerald-deep text-gold">
        <div className="pattern-surface absolute inset-0 rounded-full opacity-25" />
        <span className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-gold font-display text-lg font-bold text-night">
          404
        </span>
      </div>
      <h1 className="mt-7 font-display text-4xl font-bold text-emerald-deep">
        الصفحة غير موجودة
      </h1>
      <p className="mt-3 text-sm leading-8 text-night/55">
        يبدو أن الطبق الذي تبحث عنه نفد من المنيو! عد إلى الصفحة الرئيسية
        واستمتع بأصالة {brand.name}.
      </p>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Link to="/" className="btn-primary">
          العودة للرئيسية
        </Link>
        <Link to="/#menu" className="btn-secondary">
          تصفح المنيو
        </Link>
      </div>
    </div>
  </section>
);
