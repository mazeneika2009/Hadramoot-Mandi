import { body, param, query } from 'express-validator';
import {
  appConfig,
  menuCategories,
  orderStatusList,
  reservationStatusList,
} from '../../../shared/config';
import { sanitizeMultilineText, sanitizePlainText } from '../utils/sanitize';

const categoryIds = menuCategories.map((category) => category.id);

export const registerRules = [
  body('name')
    .trim()
    .customSanitizer(sanitizePlainText)
    .isLength({ min: 2, max: 100 })
    .withMessage('الاسم يجب أن يكون بين 2 و 100 حرف'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('البريد الإلكتروني غير صالح')
    .normalizeEmail(),
  body('password')
    .isString()
    .isLength({ min: 8, max: 72 })
    .withMessage('كلمة المرور يجب أن تكون بين 8 و 72 حرفاً'),
  body('phone')
    .optional({ values: 'falsy' })
    .trim()
    .matches(/^\+?[0-9\s-]{7,20}$/)
    .withMessage('رقم الهاتف غير صالح')
    .customSanitizer(sanitizePlainText),
];

export const loginRules = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('البريد الإلكتروني غير صالح')
    .normalizeEmail(),
  body('password').isString().notEmpty().withMessage('كلمة المرور مطلوبة'),
];

export const menuItemRules = [
  body('name')
    .trim()
    .customSanitizer(sanitizePlainText)
    .isLength({ min: 2, max: 255 })
    .withMessage('اسم الطبق غير صالح'),
  body('nameEn')
    .optional({ values: 'falsy' })
    .trim()
    .customSanitizer(sanitizePlainText)
    .isLength({ max: 255 }),
  body('description')
    .optional({ values: 'falsy' })
    .trim()
    .customSanitizer(sanitizeMultilineText)
    .isLength({ max: 2000 })
    .withMessage('وصف الطبق طويل جداً'),
  body('descriptionEn')
    .optional({ values: 'falsy' })
    .trim()
    .customSanitizer(sanitizeMultilineText)
    .isLength({ max: 2000 }),
  body('price')
    .isFloat({ gt: 0, lt: 100000 })
    .withMessage('السعر يجب أن يكون رقماً أكبر من صفر')
    .toFloat(),
  body('category')
    .trim()
    .isIn(categoryIds)
    .withMessage('تصنيف الطبق غير صالح'),
  body('imageUrl')
    .optional({ values: 'falsy' })
    .trim()
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('رابط الصورة غير صالح')
    .isLength({ max: 500 }),
  body('isAvailable').optional().isBoolean().toBoolean(),
];

export const orderRules = [
  body('items')
    .isArray({ min: 1, max: 50 })
    .withMessage('يجب اختيار صنف واحد على الأقل'),
  body('items.*.menuItemId')
    .isInt({ min: 1 })
    .withMessage('معرّف الصنف غير صالح')
    .toInt(),
  body('items.*.quantity')
    .isInt({ min: 1, max: 50 })
    .withMessage('الكمية يجب أن تكون بين 1 و 50')
    .toInt(),
  body('deliveryAddress')
    .trim()
    .customSanitizer(sanitizeMultilineText)
    .isLength({ min: 10, max: 500 })
    .withMessage('عنوان التوصيل يجب أن يكون بين 10 و 500 حرف'),
  body('notes')
    .optional({ values: 'falsy' })
    .trim()
    .customSanitizer(sanitizeMultilineText)
    .isLength({ max: 500 })
    .withMessage('الملاحظات طويلة جداً'),
];

export const orderStatusRules = [
  param('id').isInt({ min: 1 }).withMessage('معرّف الطلب غير صالح').toInt(),
  body('orderStatus')
    .isIn(orderStatusList)
    .withMessage('حالة الطلب غير صالحة'),
];

export const dispatchOrderRules = [
  param('id').isInt({ min: 1 }).withMessage('معرّف الطلب غير صالح').toInt(),
  body('deliveryUserId')
    .isInt({ min: 1 })
    .withMessage('يجب اختيار مندوب توصيل صالح')
    .toInt(),
];

export const confirmDeliveryRules = [
  param('id').isInt({ min: 1 }).withMessage('معرّف الطلب غير صالح').toInt(),
  body('cashReceived')
    .optional({ values: 'null' })
    .isFloat({ min: 0, max: 1000000 })
    .withMessage('المبلغ المستلم غير صالح')
    .toFloat(),
];

export const reservationRules = [
  body('name')
    .trim()
    .customSanitizer(sanitizePlainText)
    .isLength({ min: 2, max: 100 })
    .withMessage('الاسم يجب أن يكون بين 2 و 100 حرف'),
  body('phone')
    .trim()
    .matches(/^\+?[0-9\s-]{7,20}$/)
    .withMessage('رقم الهاتف غير صالح')
    .customSanitizer(sanitizePlainText),
  body('email')
    .optional({ values: 'falsy' })
    .trim()
    .isEmail()
    .withMessage('البريد الإلكتروني غير صالح')
    .normalizeEmail(),
  body('date')
    .isISO8601({ strict: true })
    .withMessage('تاريخ الحجز غير صالح')
    .custom((value: string) => {
      const today = new Date().toISOString().slice(0, 10);
      if (value < today) throw new Error('لا يمكن الحجز في تاريخ ماضي');
      return true;
    }),
  body('time')
    .matches(/^([01]\d|2[0-3]):[0-5]\d$/)
    .withMessage('وقت الحجز غير صالح'),
  body('guests')
    .isInt({ min: 1, max: appConfig.maxGuests })
    .withMessage(`عدد الضيوف يجب أن يكون بين 1 و ${appConfig.maxGuests}`)
    .toInt(),
  body('notes')
    .optional({ values: 'falsy' })
    .trim()
    .customSanitizer(sanitizeMultilineText)
    .isLength({ max: 500 }),
];

export const reservationStatusRules = [
  param('id').isInt({ min: 1 }).withMessage('معرّف الحجز غير صالح').toInt(),
  body('status')
    .isIn(reservationStatusList)
    .withMessage('حالة الحجز غير صالحة'),
];

export const menuIdRules = [
  param('id').isInt({ min: 1 }).withMessage('معرّف الطبق غير صالح').toInt(),
];

export const menuQueryRules = [
  query('category')
    .optional({ values: 'falsy' })
    .isIn(categoryIds)
    .withMessage('تصنيف غير صالح'),
  query('search')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 100 })
    .withMessage('نص البحث طويل جداً'),
  query('available')
    .optional({ values: 'falsy' })
    .isIn(['true', 'false', 'all'])
    .withMessage('قيمة التوفر غير صالحة'),
];

export const orderIdRules = [
  param('id').isInt({ min: 1 }).withMessage('معرّف الطلب غير صالح').toInt(),
];
