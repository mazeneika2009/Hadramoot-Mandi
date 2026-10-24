import { categoryName, formatPrice } from '@shared/config';
import type { MenuItemDto } from '@shared/api';

interface MenuItemCardProps {
  item: MenuItemDto;
  onAdd: (item: MenuItemDto) => void;
  index?: number;
}

export const MenuItemCard = ({ item, onAdd, index = 0 }: MenuItemCardProps) => {
  return (
    <article
      className="animate-rise group flex flex-col overflow-hidden rounded-3xl border border-sand-200/70 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft"
      style={{ animationDelay: `${Math.min(index * 45, 300)}ms` }}
    >
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-sand-200 via-sand-100 to-emerald-deep/20">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-night/45 via-transparent to-transparent" />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-emerald-deep backdrop-blur">
          {categoryName(item.category)}
        </span>
        {!item.isAvailable ? (
          <span className="absolute inset-0 flex items-center justify-center bg-night/55 text-sm font-bold text-white">
            غير متوفر حالياً
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-bold leading-snug text-emerald-deep">
              {item.name}
            </h3>
            {item.nameEn ? (
              <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-night/35">
                {item.nameEn}
              </p>
            ) : null}
          </div>
          <span className="whitespace-nowrap rounded-full bg-sand-100 px-3 py-1.5 text-sm font-bold text-emerald-deep">
            {formatPrice(item.price)}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-7 text-night/55">
          {item.description || 'طبق حضرمي أصيل محضّر بعناية في مطبخنا.'}
        </p>

        <button
          type="button"
          onClick={() => onAdd(item)}
          disabled={!item.isAvailable}
          className="btn-primary mt-5 w-full py-2.5"
        >
          أضف إلى السلة
        </button>
      </div>
    </article>
  );
};

export const MenuItemSkeleton = () => (
  <div className="overflow-hidden rounded-3xl border border-sand-200 bg-white">
    <div className="h-52 animate-pulse bg-sand-100" />
    <div className="space-y-3 p-5">
      <div className="h-5 w-2/3 animate-pulse rounded-full bg-sand-100" />
      <div className="h-3 w-full animate-pulse rounded-full bg-sand-100" />
      <div className="h-3 w-5/6 animate-pulse rounded-full bg-sand-100" />
      <div className="h-11 w-full animate-pulse rounded-full bg-sand-100" />
    </div>
  </div>
);

export const MenuPlaceholder = () => (
  <div className="flex h-52 items-center justify-center bg-sand-100 text-emerald-deep/30" />
);
