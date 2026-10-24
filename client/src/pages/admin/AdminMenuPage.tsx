import { useEffect, useState, type FormEvent } from 'react';
import {
  categoryName,
  formatPrice,
  menuCategories,
} from '@shared/config';
import type { MenuItemDto, MenuItemInput } from '@shared/api';
import { menuApi } from '../../api/menu';
import { useToast } from '../../context/ToastContext';
import { Alert, EmptyState, Spinner } from '../../components/ui/Feedback';
import { Modal } from '../../components/ui/Modal';
import { InputField, SelectField, TextareaField } from '../../components/ui/FormFields';
import {
  getErrorDetails,
  getErrorMessage,
} from '../../utils/format';

interface MenuFormState {
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: string;
  category: string;
  imageUrl: string;
  isAvailable: boolean;
}

const emptyForm = (): MenuFormState => ({
  name: '',
  nameEn: '',
  description: '',
  descriptionEn: '',
  price: '',
  category: menuCategories[0]?.id ?? 'mandi',
  imageUrl: '',
  isAvailable: true,
});

const fromMenuItem = (item: MenuItemDto): MenuFormState => ({
  name: item.name,
  nameEn: item.nameEn ?? '',
  description: item.description ?? '',
  descriptionEn: item.descriptionEn ?? '',
  price: String(item.price),
  category: item.category,
  imageUrl: item.imageUrl ?? '',
  isAvailable: item.isAvailable,
});

const categoryOptions = menuCategories.map((category) => ({
  value: category.id,
  label: `${category.icon} ${category.nameAr}`,
}));

export const AdminMenuPage = () => {
  const [items, setItems] = useState<MenuItemDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<MenuItemDto | null>(null);
  const [form, setForm] = useState<MenuFormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formDetails, setFormDetails] = useState<string[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<MenuItemDto | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { showToast } = useToast();

  const loadMenu = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await menuApi.listAllForAdmin();
      setItems(result);
    } catch (loadError) {
      setError(getErrorMessage(loadError));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadMenu();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setFormError(null);
    setFormDetails([]);
    setModalOpen(true);
  };

  const openEdit = (item: MenuItemDto) => {
    setEditing(item);
    setForm(fromMenuItem(item));
    setFormError(null);
    setFormDetails([]);
    setModalOpen(true);
  };

  const updateForm = <K extends keyof MenuFormState>(
    key: K,
    value: MenuFormState[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setFormDetails([]);

    const price = Number(form.price);
    if (!form.name.trim()) {
      setFormError('اسم الطبق مطلوب');
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      setFormError('السعر يجب أن يكون رقماً أكبر من صفر');
      return;
    }

    const payload: MenuItemInput = {
      name: form.name.trim(),
      nameEn: form.nameEn.trim() || undefined,
      description: form.description.trim() || undefined,
      descriptionEn: form.descriptionEn.trim() || undefined,
      price,
      category: form.category,
      imageUrl: form.imageUrl.trim() || undefined,
      isAvailable: form.isAvailable,
    };

    setSaving(true);
    try {
      if (editing) {
        await menuApi.update(editing.id, payload);
        showToast('تم تحديث الطبق بنجاح');
      } else {
        await menuApi.create(payload);
        showToast('تم إضافة الطبق بنجاح');
      }
      setModalOpen(false);
      await loadMenu();
    } catch (submitError) {
      setFormError(getErrorMessage(submitError));
      setFormDetails(getErrorDetails(submitError));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await menuApi.delete(deleteTarget.id);
      setItems((current) =>
        current.filter((item) => item.id !== deleteTarget.id),
      );
      showToast('تم حذف الطبق');
      setDeleteTarget(null);
    } catch (deleteError) {
      showToast(getErrorMessage(deleteError), 'error');
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold text-emerald-deep">
            إدارة المنيو
          </h2>
          <p className="mt-1 text-sm text-night/50">
            {items.length} طبقاً · التحكم الكامل في الأسعار والتوفر
          </p>
        </div>
        <button type="button" onClick={openCreate} className="btn-primary">
          إضافة طبق جديد
        </button>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-20 animate-pulse rounded-2xl border border-sand-200 bg-white"
              />
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
        ) : items.length === 0 ? (
          <EmptyState
            title="المنيو فارغ"
            description="أضف أول طبق ليظهر للعملاء في الموقع."
            action={
              <button type="button" onClick={openCreate} className="btn-primary">
                إضافة طبق
              </button>
            }
          />
        ) : (
          <div className="card-surface overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-right text-sm">
                <thead className="bg-sand-50 text-xs text-night/45">
                  <tr>
                    <th className="px-5 py-3.5 font-semibold">الطبق</th>
                    <th className="px-5 py-3.5 font-semibold">التصنيف</th>
                    <th className="px-5 py-3.5 font-semibold">السعر</th>
                    <th className="px-5 py-3.5 font-semibold">الحالة</th>
                    <th className="px-5 py-3.5 font-semibold">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-100">
                  {items.map((item) => (
                    <tr key={item.id} className="transition hover:bg-sand-50/50">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-sand-100">
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="h-full w-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-emerald-deep">
                              {item.name}
                            </p>
                            <p className="mt-0.5 max-w-xs truncate text-[11px] text-night/35">
                              {item.description || 'بدون وصف'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-xs font-semibold text-night/55">
                        {categoryName(item.category)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 font-bold text-emerald-deep">
                        {formatPrice(item.price)}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold ${
                            item.isAvailable
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-red-50 text-red-600'
                          }`}
                        >
                          {item.isAvailable ? 'متوفر' : 'غير متوفر'}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEdit(item)}
                            className="rounded-full px-3 py-2 text-xs font-bold text-emerald-deep/60 transition hover:bg-emerald-deep/5 hover:text-emerald-deep"
                            aria-label={`تعديل ${item.name}`}
                          >
                            تعديل
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(item)}
                            className="rounded-full px-3 py-2 text-xs font-bold text-night/35 transition hover:bg-red-50 hover:text-red-600"
                            aria-label={`حذف ${item.name}`}
                          >
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Modal
        open={modalOpen}
        title={editing ? 'تعديل الطبق' : 'إضافة طبق جديد'}
        description={
          editing
            ? 'حدّث بيانات الطبق وسيظهر التغيير للعملاء فوراً.'
            : 'أضف طبقاً جديداً إلى قائمة الطعام.'
        }
        onClose={() => setModalOpen(false)}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {formError ? (
            <Alert kind="error">
              <div>
                <p>{formError}</p>
                {formDetails.length > 0 ? (
                  <ul className="mt-2 list-inside list-disc text-xs font-medium">
                    {formDetails.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Alert>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <InputField
              label="اسم الطبق بالعربية"
              value={form.name}
              onChange={(event) => updateForm('name', event.target.value)}
              required
            />
            <InputField
              label="اسم الطبق بالإنجليزية"
              value={form.nameEn}
              onChange={(event) => updateForm('nameEn', event.target.value)}
              dir="ltr"
              className="text-left"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              label="التصنيف"
              value={form.category}
              onChange={(event) => updateForm('category', event.target.value)}
              options={categoryOptions}
              required
            />
            <InputField
              label="السعر (ج.م)"
              type="number"
              min="0.01"
              step="0.01"
              value={form.price}
              onChange={(event) => updateForm('price', event.target.value)}
              dir="ltr"
              className="text-left"
              required
            />
          </div>

          <TextareaField
            label="الوصف بالعربية"
            value={form.description}
            onChange={(event) => updateForm('description', event.target.value)}
            maxLength={2000}
          />

          <TextareaField
            label="الوصف بالإنجليزية"
            value={form.descriptionEn}
            onChange={(event) =>
              updateForm('descriptionEn', event.target.value)
            }
            dir="ltr"
            className="text-left"
            maxLength={2000}
          />

          <InputField
            label="رابط الصورة"
            type="url"
            value={form.imageUrl}
            onChange={(event) => updateForm('imageUrl', event.target.value)}
            placeholder="https://images.unsplash.com/..."
            dir="ltr"
            className="text-left"
            hint="رابط مباشر لصورة الطبق بصيغة https"
          />

          {form.imageUrl ? (
            <div className="h-40 overflow-hidden rounded-2xl border border-sand-200 bg-sand-100">
              <img
                src={form.imageUrl}
                alt="معاينة صورة الطبق"
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                }}
              />
            </div>
          ) : null}

          <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-sand-200 px-4 py-3">
            <span>
              <span className="block text-sm font-bold text-emerald-deep">
                متوفر للطلب
              </span>
              <span className="text-xs text-night/45">
                إخفاء الطبق من المنيو دون حذفه
              </span>
            </span>
            <span className="relative">
              <input
                type="checkbox"
                checked={form.isAvailable}
                onChange={(event) =>
                  updateForm('isAvailable', event.target.checked)
                }
                className="peer sr-only"
              />
              <span className="block h-6 w-11 rounded-full bg-sand-300 transition peer-checked:bg-emerald-deep" />
              <span className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:-translate-x-5" />
            </span>
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex-1"
            >
              {saving ? <Spinner className="h-4 w-4" /> : null}
              {editing ? 'حفظ التعديلات' : 'إضافة الطبق'}
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="btn-secondary"
            >
              إلغاء
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        open={Boolean(deleteTarget)}
        title="تأكيد حذف الطبق"
        description="لا يمكن حذف طبق مرتبط بطلبات سابقة."
        onClose={() => setDeleteTarget(null)}
        size="sm"
      >
        <p className="text-sm leading-7 text-night/60">
          هل أنت متأكد من حذف{' '}
          <span className="font-bold text-emerald-deep">
            {deleteTarget?.name}
          </span>
          ؟ يمكنك بدلاً من ذلك جعله غير متوفر من نافذة التعديل.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => void handleDelete()}
            disabled={deleting}
            className="btn flex-1 bg-red-600 text-white hover:bg-red-700"
          >
            {deleting ? <Spinner className="h-4 w-4" /> : null}
            حذف نهائي
          </button>
          <button
            type="button"
            onClick={() => setDeleteTarget(null)}
            className="btn-secondary"
          >
            إلغاء
          </button>
        </div>
      </Modal>
    </div>
  );
};
