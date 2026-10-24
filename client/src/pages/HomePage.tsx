import { Link } from 'react-router-dom';
import { brand, formatPrice } from '@shared/config';
import { MenuSection } from '../components/menu/MenuSection';

const features = [
  {
    title: 'طبخ على الحجر',
    text: 'لحم طري يُطهى ببطء في التنور ليحتفظ بعصارته ونكهته المدخنة.',
  },
  {
    title: 'بهارات حضرمية',
    text: 'خلطة توابل أصلية توارثناها جيلاً بعد جيل من قلب حضرموت.',
  },
  {
    title: 'توصيل سريع',
    text: 'طلبك يصل ساخناً إلى باب منزلك في أسرع وقت داخل الجيزة.',
  },
  {
    title: 'دفع آمن',
    text: 'ادفع بالبطاقة أو فودافون كاش أو فوري عبر بوابة فواتيرك الآمنة.',
  },
];

const stats = [
  { value: '+10', label: 'سنوات من الخبرة' },
  { value: '14', label: 'طبقاً حضرمياً' },
  { value: '4.9', label: 'تقييم عملائنا' },
];

export const HomePage = () => {
  return (
    <>
      <section className="relative overflow-hidden bg-emerald-deep">
        <div className="absolute inset-0">
          <img
            src={brand.heroImageUrl}
            alt="مندي حضرمي على الحجر"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-emerald-deep/95 via-emerald-deep/80 to-emerald-deep/35" />
          <div className="pattern-surface absolute inset-0 opacity-35" />
        </div>

        <div className="container-page relative grid min-h-[640px] items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-rise max-w-2xl text-sand-50">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-white/5 px-4 py-2 text-xs font-bold text-gold backdrop-blur">
              منذ {brand.establishedYear} · {brand.address.ar.split('،')[1] ?? brand.address.ar}
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.15] text-white text-shadow sm:text-6xl lg:text-7xl">
              {brand.name}
              <span className="mt-3 block text-3xl font-bold text-gold sm:text-4xl">
                {brand.tagline}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-sand-100/80 sm:text-lg">
              {brand.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/#menu" className="btn-gold px-7 py-3.5 text-base">
                اطلب مندي الآن
              </Link>
              <Link
                to="/reservations"
                className="btn border border-white/25 bg-white/5 px-7 py-3.5 text-base text-white backdrop-blur hover:bg-white/10"
              >
                احجز طاولة
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl font-bold text-gold">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-sand-100/65">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden justify-self-end lg:block">
            <div className="absolute -inset-6 rounded-[3rem] border border-gold/20" />
            <div className="relative w-[340px] overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-md">
              <div className="relative h-72 overflow-hidden rounded-[2rem]">
                <img
                  src={brand.storyImageUrl}
                  alt="طبق مندي دجاج حضرمي"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="px-4 py-5 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
                  طبق اليوم
                </p>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-bold">
                      مندي لحم ضاني
                    </h2>
                    <p className="mt-1 text-xs text-sand-100/65">
                      أرز بسمتي · لحم طري · بهارات حضرمية
                    </p>
                  </div>
                  <p className="whitespace-nowrap font-display text-2xl font-bold text-gold">
                    {formatPrice(320)}
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-8 flex items-center gap-3 rounded-2xl bg-sand-50 px-4 py-3 text-emerald-deep shadow-xl">
              <div>
                <p className="text-xs font-bold">مفتوح الآن</p>
                <p className="text-[10px] text-night/50">حتى 11:00 مساءً</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-10">
        <div className="container-page">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-sand-200 bg-sand-200 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white px-6 py-7">
                <h3 className="font-display text-lg font-bold text-emerald-deep">
                  {feature.title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-night/55">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MenuSection />

      <section className="py-10 sm:py-16">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -right-5 -top-5 h-full w-full rounded-[2.5rem] border-2 border-gold/30" />
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-soft">
              <img
                src={brand.storyImageUrl}
                alt="مطبخ حضرموت بيت المندي"
                className="h-[420px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 right-6 left-6 rounded-2xl bg-white/90 p-4 backdrop-blur">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-deep font-display text-xl font-bold text-gold">
                    {brand.establishedYear}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-emerald-deep">
                      بداية الحكاية
                    </p>
                    <p className="text-xs text-night/55">
                      وصفة جدّنا، وحجر التنور، ورائحة الهيل
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="section-kicker">حكايتنا</p>
            <h2 className="section-title mt-2">
              من حضرموت إلى مائدتك
              <span className="mt-1 block text-gold">بنفس الوصفة الأصلية</span>
            </h2>
            <p className="mt-5 text-sm leading-8 text-night/60">
              بدأت رحلتنا بشغف بسيط: أن نقدّم المندي كما يُطبخ في بيوت حضرموت.
              اخترنا أجود أنواع اللحوم، وطهوناها على الحجر، وأضفنا خلطة البهارات
              التي تتوارثها عائلتنا منذ أجيال. والنتيجة طبق يليق بضيوفنا في مصر.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-sand-200 bg-white p-4">
                <div className="flex items-center gap-2 text-emerald-deep">
                  <p className="text-xs font-bold">موقعنا</p>
                </div>
                <p className="mt-2 text-xs leading-6 text-night/55">
                  {brand.address.ar}
                </p>
              </div>
              <div className="rounded-2xl border border-sand-200 bg-white p-4">
                <div className="flex items-center gap-2 text-emerald-deep">
                  <p className="text-xs font-bold">مواعيد العمل</p>
                </div>
                <p className="mt-2 text-xs leading-6 text-night/55">
                  {brand.workingHours.ar}
                </p>
              </div>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/reservations" className="btn-primary">
                احجز طاولتك
              </Link>
              <a href={`tel:${brand.phone}`} className="btn-secondary">
                اتصل بنا
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-emerald-deep px-6 py-14 text-center text-white sm:px-12">
            <div className="pattern-surface absolute inset-0 opacity-25" />
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
            <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-bold sm:text-4xl">
                زيارتك تشرّفنا
              </h2>
              <p className="mt-3 text-sm leading-8 text-sand-100/70">
                احجز طاولتك مسبقاً واستمتع بأجواء حضرمية دافئة. نفخر باستقبال
                عائلتك وأصدقائك في أي وقت خلال ساعات العمل.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link to="/reservations" className="btn-gold">
                  احجز الآن
                </Link>
                <a
                  href={`tel:${brand.phone}`}
                  className="btn border border-white/20 text-white hover:bg-white/10"
                >
                  <span dir="ltr">{brand.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};