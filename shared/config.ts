export interface LocalizedText {
  readonly ar: string;
  readonly en: string;
}

export interface SocialLinks {
  readonly facebook: string;
  readonly instagram: string;
  readonly twitter: string;
  readonly whatsapp: string;
}

export interface BrandConfig {
  readonly name: string;
  readonly nameEn: string;
  readonly tagline: string;
  readonly taglineEn: string;
  readonly description: string;
  readonly establishedYear: number;
  readonly heroImageUrl: string;
  readonly storyImageUrl: string;
  readonly phone: string;
  readonly phoneDisplay: string;
  readonly email: string;
  readonly address: LocalizedText;
  readonly social: SocialLinks;
  readonly workingHours: LocalizedText;
  readonly currency: {
    readonly code: 'EGP';
    readonly symbol: string;
    readonly symbolEn: string;
  };
}

export const brand: BrandConfig = {
  name: 'حضرموت بيت المندي',
  nameEn: 'Hadramout House of Mandi',
  tagline: 'أصالة المندي الحضرمي',
  taglineEn: 'Authentic Hadrami Mandi',
  description:
    'من قلب حضرموت إلى مائدة مصر، نطبخ اللحم الطري على الحجر مع أرز بسمتي معطّر بالبهارات الحضرمية الأصيلة. تجربة مندي لا تُنسى.',
  establishedYear: 2015,
  heroImageUrl:
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=80',
  storyImageUrl:
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
  phone: '+201001234567',
  phoneDisplay: '010 1234 5678',
  email: 'info@hadramout-mandi.com',
  address: {
    ar: 'شارع التحرير، الدقي، الجيزة، مصر',
    en: 'El-Tahrir Street, Dokki, Giza, Egypt',
  },
  social: {
    facebook: 'https://facebook.com/hadramoutmandi',
    instagram: 'https://instagram.com/hadramoutmandi',
    twitter: 'https://twitter.com/hadramoutmandi',
    whatsapp: 'https://wa.me/201001234567',
  },
  workingHours: {
    ar: 'يومياً من 12:00 ظهراً حتى 11:00 مساءً',
    en: 'Daily 12:00 PM - 11:00 PM',
  },
  currency: {
    code: 'EGP',
    symbol: 'ج.م',
    symbolEn: 'EGP',
  },
};

export interface MenuCategory {
  readonly id: string;
  readonly nameAr: string;
  readonly nameEn: string;
  readonly icon: string;
}

export const menuCategories: readonly MenuCategory[] = [
  { id: 'mandi', nameAr: 'مندي', nameEn: 'Mandi', icon: '' },
  { id: 'madhbi', nameAr: 'مدخن', nameEn: 'Madhbi', icon: '' },
  { id: 'mathloutha', nameAr: 'مظلة', nameEn: 'Mathloutha', icon: '' },
  { id: 'appetizers', nameAr: 'مقبلات', nameEn: 'Appetizers', icon: '' },
  { id: 'drinks', nameAr: 'مشروبات', nameEn: 'Drinks', icon: '' },
  { id: 'desserts', nameAr: 'حلويات', nameEn: 'Desserts', icon: '' },
];

export const allCategory: MenuCategory = {
  id: 'all',
  nameAr: 'كل الأطباق',
  nameEn: 'All Dishes',
  icon: '',
};

export interface StatusMeta {
  readonly ar: string;
  readonly en: string;
  readonly color: string;
  readonly step: number;
}

export const orderStatuses = {
  PENDING: { ar: 'في الانتظار', en: 'Pending', color: '#d97706', step: 1 },
  PREPARING: { ar: 'قيد التحضير', en: 'Preparing', color: '#2563eb', step: 2 },
  OUT_FOR_DELIVERY: {
    ar: 'خرج للتوصيل',
    en: 'Out for delivery',
    color: '#7c3aed',
    step: 3,
  },
  DELIVERED: { ar: 'تم التسليم', en: 'Delivered', color: '#059669', step: 4 },
  CANCELLED: { ar: 'ملغي', en: 'Cancelled', color: '#dc2626', step: 0 },
} as const satisfies Record<string, StatusMeta>;

export type OrderStatus = keyof typeof orderStatuses;
export const orderStatusList = Object.keys(orderStatuses) as OrderStatus[];

export const paymentStatuses = {
  PENDING: { ar: 'بانتظار الدفع', en: 'Pending', color: '#d97706', step: 1 },
  PAID: { ar: 'مدفوع', en: 'Paid', color: '#059669', step: 2 },
  FAILED: { ar: 'فشل الدفع', en: 'Failed', color: '#dc2626', step: 0 },
  REFUNDED: { ar: 'مسترد', en: 'Refunded', color: '#6b7280', step: 0 },
} as const satisfies Record<string, StatusMeta>;

export type PaymentStatus = keyof typeof paymentStatuses;

export const reservationStatuses = {
  PENDING: { ar: 'بانتظار التأكيد', en: 'Pending', color: '#d97706', step: 1 },
  CONFIRMED: { ar: 'مؤكد', en: 'Confirmed', color: '#2563eb', step: 2 },
  CANCELLED: { ar: 'ملغي', en: 'Cancelled', color: '#dc2626', step: 0 },
  COMPLETED: { ar: 'مكتمل', en: 'Completed', color: '#059669', step: 3 },
} as const satisfies Record<string, StatusMeta>;

export type ReservationStatus = keyof typeof reservationStatuses;
export const reservationStatusList = Object.keys(
  reservationStatuses,
) as ReservationStatus[];

export const paymentMethods = [
  { id: 'wallet', ar: 'فودافون كاش', en: 'Vodafone Cash' },
  { id: 'fawry', ar: 'فوري', en: 'Fawry' },
  { id: 'card', ar: 'بطاقة بنكية', en: 'Bank card' },
] as const;

export interface PublicAppConfig {
  readonly brand: BrandConfig;
  readonly menuCategories: readonly MenuCategory[];
  readonly orderStatuses: typeof orderStatuses;
  readonly paymentStatuses: typeof paymentStatuses;
  readonly reservationStatuses: typeof reservationStatuses;
  readonly deliveryFee: number;
  readonly maxGuests: number;
  readonly storageKeys: {
    readonly token: string;
    readonly user: string;
    readonly cart: string;
  };
}

export const appConfig: PublicAppConfig = {
  brand,
  menuCategories,
  orderStatuses,
  paymentStatuses,
  reservationStatuses,
  deliveryFee: 0,
  maxGuests: 20,
  storageKeys: {
    token: 'hadramout_token',
    user: 'hadramout_user',
    cart: 'hadramout_cart',
  },
};

export const formatPrice = (value: number): string =>
  `${value.toLocaleString('ar-EG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })} ${brand.currency.symbol}`;

export const categoryName = (categoryId: string): string =>
  menuCategories.find((category) => category.id === categoryId)?.nameAr ??
  categoryId;

export const isOrderStatus = (value: string): value is OrderStatus =>
  value in orderStatuses;

export const isPaymentStatus = (value: string): value is PaymentStatus =>
  value in paymentStatuses;

export const isReservationStatus = (value: string): value is ReservationStatus =>
  value in reservationStatuses;
