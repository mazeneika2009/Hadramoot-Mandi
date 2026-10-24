import {
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  allCategory,
  menuCategories,
  type MenuCategory,
} from '@shared/config';
import type { MenuItemDto } from '@shared/api';
import { menuApi } from '../../api/menu';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { Alert, EmptyState } from '../ui/Feedback';
import { MenuItemCard, MenuItemSkeleton } from './MenuItemCard';

export const MenuSection = () => {
  const [items, setItems] = useState<MenuItemDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());
  const { addItem } = useCart();
  const { showToast } = useToast();

  const loadMenu = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await menuApi.list({ available: true });
      setItems(result);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'تعذر تحميل قائمة الطعام',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadMenu();
  }, []);

  const categories = useMemo<MenuCategory[]>(
    () => [allCategory, ...menuCategories],
    [],
  );

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        !deferredSearch ||
        item.name.toLowerCase().includes(deferredSearch) ||
        item.nameEn?.toLowerCase().includes(deferredSearch) ||
        item.description?.toLowerCase().includes(deferredSearch);
      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, deferredSearch]);

  const handleAdd = (item: MenuItemDto) => {
    addItem(item);
    showToast(`تمت إضافة ${item.name} إلى السلة`);
  };

  return (
    <section id="menu" className="scroll-mt-24 py-20 sm:py-24">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="section-kicker">قائمة الطعام</p>
            <h2 className="section-title mt-2">نكهات من قلب حضرموت</h2>
            <p className="mt-3 max-w-2xl text-sm leading-8 text-night/55">
              كل طبق يُحضّر يومياً بمكونات طازجة وبهارات حضرمية أصيلة، من المندي
              على الحجر إلى الحلويات التي تختم بها تجربتك.
            </p>
          </div>
          <div className="relative w-full max-w-sm">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="ابحث عن طبقك المفضل..."
              className="field-control bg-white"
              aria-label="البحث في قائمة الطعام"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => {
            const active = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition ${
                  active
                    ? 'border-emerald-deep bg-emerald-deep text-white shadow-lg shadow-emerald-deep/15'
                    : 'border-sand-200 bg-white text-emerald-deep/70 hover:border-emerald-deep/30 hover:text-emerald-deep'
                }`}
              >
                <span aria-hidden="true">{category.icon}</span>
                {category.nameAr}
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <MenuItemSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <Alert kind="error">
              <div className="flex flex-col items-start gap-3">
                <span>{error}</span>
                <button
                  type="button"
                  onClick={() => void loadMenu()}
                  className="btn-secondary px-4 py-2 text-xs"
                >
                  إعادة المحاولة
                </button>
              </div>
            </Alert>
          ) : filteredItems.length === 0 ? (
            <EmptyState
              title="لا توجد أطباق مطابقة"
              description="جرّب تصنيفاً آخر أو ابحث بكلمة مختلفة، فالمندي دائماً في انتظارك."
              action={
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('all');
                    setSearch('');
                  }}
                  className="btn-secondary"
                >
                  عرض كل الأطباق
                </button>
              }
            />
          ) : (
            <>
              <p className="mb-4 text-xs font-semibold text-night/45">
                عرض {filteredItems.length} من الأطباق
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredItems.map((item, index) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    index={index}
                    onAdd={handleAdd}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
