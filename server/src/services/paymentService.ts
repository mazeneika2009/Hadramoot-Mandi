import axios from 'axios';
import crypto from 'node:crypto';
import { brand } from '../../../shared/config';
import type { OrderStatus, PaymentStatus } from '../../../shared/api';
import { env } from '../config/env';
import { orderRepository } from '../repositories/orderRepository';
import { userRepository } from '../repositories/userRepository';
import type { OrderRecord } from '../types/domain';
import { ApiError } from '../utils/ApiError';

interface FawaterakInvoiceResponse {
  status?: string;
  data?: {
    url?: string;
    invoiceUrl?: string;
    invoiceKey?: string;
    invoiceId?: number | string;
  };
  message?: string;
}

interface PaymentLink {
  paymentId: string;
  paymentUrl: string;
  invoiceKey: string | null;
}

type JsonRecord = Record<string, unknown>;

const asRecord = (value: unknown): JsonRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as JsonRecord)
    : {};

const readString = (value: unknown): string | null => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  return null;
};

const readNumber = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const splitName = (fullName: string): { first: string; last: string } => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  return {
    first: parts[0] ?? 'Customer',
    last: parts.slice(1).join(' ') || 'Guest',
  };
};

const secureCompare = (expected: string, received: string): boolean => {
  const expectedBuffer = Buffer.from(expected.toLowerCase(), 'utf8');
  const receivedBuffer = Buffer.from(received.toLowerCase(), 'utf8');
  if (expectedBuffer.length !== receivedBuffer.length) return false;
  return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
};

const formatAmount = (value: number): string => value.toFixed(2);

const invoiceApiUrl = (): string =>
  `${env.fawaterak.baseUrl.replace(/\/+$/, '')}/api/v2/createInvoiceLink`;

const buildInvoicePayload = (
  order: OrderRecord,
  customer: { name: string; email: string; phone: string | null },
  items: { name: string; price: number; quantity: number }[],
): JsonRecord => {
  const customerName = splitName(customer.name);
  return {
    cartTotal: formatAmount(order.totalAmount),
    currency: brand.currency.code,
    invoice_number: `HM-${order.id}-${Date.now()}`,
    customer: {
      first_name: customerName.first,
      last_name: customerName.last,
      email: customer.email,
      phone: customer.phone || brand.phone,
      address: order.deliveryAddress,
    },
    redirectionUrls: {
      successUrl: env.fawaterak.successUrl,
      failUrl: env.fawaterak.cancelUrl,
      pendingUrl: env.fawaterak.successUrl,
      webhookUrl: env.fawaterak.callbackUrl,
    },
    cartItems: items.map((item) => ({
      name: item.name,
      price: formatAmount(item.price),
      quantity: String(item.quantity),
    })),
    payLoad: {
      order_id: order.id,
      user_id: order.userId,
    },
    sendEmail: false,
    sendSMS: false,
  };
};

const extractOrderIdFromPayload = (payload: JsonRecord): number | null => {
  const directOrderId = readNumber(payload.order_id ?? payload.orderId);
  if (directOrderId !== null && Number.isInteger(directOrderId)) {
    return directOrderId;
  }

  const payLoad = payload.pay_load ?? payload.payLoad;
  let parsed: unknown = payLoad;
  if (typeof payLoad === 'string') {
    try {
      parsed = JSON.parse(payLoad);
    } catch {
      return null;
    }
  }
  const record = asRecord(parsed);
  const nestedOrderId = readNumber(record.order_id ?? record.orderId);
  return nestedOrderId !== null && Number.isInteger(nestedOrderId)
    ? nestedOrderId
    : null;
};

const resolveOrderFromWebhook = async (
  payload: JsonRecord,
): Promise<OrderRecord> => {
  const invoiceId = readString(payload.invoice_id ?? payload.invoiceId);
  if (invoiceId) {
    const order = await orderRepository.findByPaymentId(invoiceId);
    if (order) return order;
  }

  const orderId = extractOrderIdFromPayload(payload);
  if (orderId !== null) {
    const order = await orderRepository.findById(orderId);
    if (order) return order;
  }

  throw ApiError.notFound('الطلب المرتبط بالإشعار غير موجود');
};

const resolveWebhookStatus = (
  rawStatus: string,
): { paymentStatus: PaymentStatus; orderStatus: OrderStatus | null } | null => {
  switch (rawStatus.toLowerCase()) {
    case 'paid':
    case 'success':
    case 'completed':
    case 'captured':
      return { paymentStatus: 'PAID', orderStatus: 'PREPARING' };
    case 'failed':
    case 'cancelled':
    case 'canceled':
    case 'expired':
    case 'declined':
      return { paymentStatus: 'FAILED', orderStatus: null };
    case 'refunded':
    case 'refund':
      return { paymentStatus: 'REFUNDED', orderStatus: 'CANCELLED' };
    default:
      return null;
  }
};

export const paymentService = {
  isConfigured(): boolean {
    return env.fawaterak.enabled;
  },

  async createInvoiceForOrder(orderId: number): Promise<PaymentLink> {
    if (!env.fawaterak.enabled) {
      throw new ApiError(
        503,
        'بوابة الدفع فواتيرك غير مفعّلة حالياً، يمكنك متابعة الطلب والدفع لاحقاً',
      );
    }

    const order = await orderRepository.findById(orderId);
    if (!order) throw ApiError.notFound('الطلب غير موجود');
    if (order.paymentStatus === 'PAID') {
      throw ApiError.badRequest('هذا الطلب مدفوع بالفعل');
    }

    const [items, user] = await Promise.all([
      orderRepository.findItemsByOrderId(orderId),
      userRepository.findById(order.userId),
    ]);
    if (!user) throw ApiError.notFound('بيانات العميل غير موجودة');
    if (items.length === 0) throw ApiError.badRequest('الطلب لا يحتوي على أصناف');

    const payload = buildInvoicePayload(
      order,
      { name: user.name, email: user.email, phone: user.phone },
      items.map((item) => ({
        name: item.name,
        price: item.priceAtPurchase,
        quantity: item.quantity,
      })),
    );

    try {
      const response = await axios.post<FawaterakInvoiceResponse>(
        invoiceApiUrl(),
        payload,
        {
          headers: {
            Authorization: `Bearer ${env.fawaterak.apiKey}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          timeout: 20000,
        },
      );

      const data = response.data;
      const paymentUrl = data.data?.url ?? data.data?.invoiceUrl ?? null;
      const invoiceId = readString(data.data?.invoiceId);
      if (
        data.status !== 'success' ||
        !paymentUrl ||
        !invoiceId
      ) {
        throw new Error(data.message || 'Invalid Fawaterak response');
      }

      await orderRepository.updatePaymentInfo(orderId, invoiceId, paymentUrl);
      return {
        paymentId: invoiceId,
        paymentUrl,
        invoiceKey: data.data?.invoiceKey ?? null,
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error('Fawaterak invoice creation failed:', error);
      throw new ApiError(
        502,
        'تعذر إنشاء رابط الدفع، يرجى المحاولة مرة أخرى',
      );
    }
  },

  verifyWebhookSignature(
    payload: JsonRecord,
    signatureHeader: string | undefined,
    rawBody: Buffer | undefined,
  ): void {
    if (!env.fawaterak.webhookEnabled) {
      throw new ApiError(503, 'الويب هوك غير مهيأ على الخادم');
    }

    const secret = env.fawaterak.webhookSecret;
    const hashKey = readString(payload.hashKey ?? payload.hash_key);
    const invoiceId = readString(payload.invoice_id ?? payload.invoiceId);
    const invoiceKey = readString(payload.invoice_key ?? payload.invoiceKey);
    const paymentMethod = readString(
      payload.payment_method ?? payload.paymentMethod,
    );

    if (hashKey && invoiceId && invoiceKey && paymentMethod) {
      const canonical = `InvoiceId=${invoiceId}&InvoiceKey=${invoiceKey}&PaymentMethod=${paymentMethod}`;
      const expected = crypto
        .createHmac('sha256', secret)
        .update(canonical)
        .digest('hex');
      if (secureCompare(expected, hashKey)) return;
    }

    if (signatureHeader) {
      const normalized = signatureHeader.replace(/^sha256=/i, '').trim();
      const message = rawBody ?? Buffer.from(JSON.stringify(payload), 'utf8');
      const expected = crypto
        .createHmac('sha256', secret)
        .update(message)
        .digest('hex');
      if (secureCompare(expected, normalized)) return;
    }

    throw ApiError.unauthorized('توقيع الإشعار غير صالح');
  },

  async handleWebhook(
    payload: JsonRecord,
    signatureHeader: string | undefined,
    rawBody: Buffer | undefined,
  ): Promise<{ orderId: number; paymentStatus: PaymentStatus }> {
    this.verifyWebhookSignature(payload, signatureHeader, rawBody);

    const order = await resolveOrderFromWebhook(payload);
    const reportedAmount = readNumber(payload.amount ?? payload.total);
    if (
      reportedAmount !== null &&
      Math.abs(reportedAmount - order.totalAmount) > 0.01
    ) {
      throw ApiError.badRequest('مبلغ الإشعار لا يطابق قيمة الطلب');
    }

    const rawStatus =
      readString(
        payload.invoice_status ??
          payload.status ??
          payload.payment_status ??
          payload.paymentStatus,
      ) ?? '';
    const resolved = resolveWebhookStatus(rawStatus);

    if (!resolved) {
      return { orderId: order.id, paymentStatus: order.paymentStatus };
    }

    if (order.paymentStatus === 'PAID' && resolved.paymentStatus !== 'PAID') {
      return { orderId: order.id, paymentStatus: order.paymentStatus };
    }

    const nextOrderStatus =
      resolved.orderStatus === 'PREPARING' &&
      order.orderStatus !== 'PENDING'
        ? order.orderStatus
        : resolved.orderStatus ?? order.orderStatus;

    await orderRepository.updateStatuses(
      order.id,
      resolved.paymentStatus,
      nextOrderStatus,
    );

    return { orderId: order.id, paymentStatus: resolved.paymentStatus };
  },

  async retryPayment(
    orderId: number,
    userId: number,
    isAdmin: boolean,
  ): Promise<PaymentLink> {
    const order = await orderRepository.findById(orderId);
    if (!order) throw ApiError.notFound('الطلب غير موجود');
    if (!isAdmin && order.userId !== userId) {
      throw ApiError.forbidden('لا يمكنك الدفع مقابل طلب لا يخصك');
    }
    return this.createInvoiceForOrder(orderId);
  },
};
