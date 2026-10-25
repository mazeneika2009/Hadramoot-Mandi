import type {
  OrderStatus,
  PaymentStatus,
  ReservationStatus,
  Role,
} from '../../../shared/api';

export interface AuthUser {
  id: number;
  email: string;
  role: Role;
  isApproved?: boolean;
}

export interface UserRecord {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  phone: string | null;
  role: Role;
  createdAt: string;
  isApproved: boolean;
}

export interface MenuItemRecord {
  id: number;
  name: string;
  nameEn: string | null;
  description: string | null;
  descriptionEn: string | null;
  price: number;
  category: string;
  imageUrl: string | null;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderRecord {
  id: number;
  userId: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string | null;
  totalAmount: number;
  deliveryAddress: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  paymentId: string | null;
  paymentUrl: string | null;
  notes: string | null;
  paymentMethod: 'ONLINE' | 'CASH';
  deliveryUserId: number | null;
  deliveryUserName?: string | null;
  deliveryUserPhone?: string | null;
  dispatchedAt: string | null;
  deliveredAt: string | null;
  cashReceived: number | null;
  cashChange: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItemRecord {
  id: number;
  orderId: number;
  menuItemId: number;
  name: string;
  nameEn: string | null;
  imageUrl: string | null;
  quantity: number;
  priceAtPurchase: number;
}

export interface ReservationRecord {
  id: number;
  userId: number | null;
  name: string;
  phone: string;
  email: string | null;
  date: string;
  time: string;
  guests: number;
  status: ReservationStatus;
  notes: string | null;
  createdAt: string;
}

export type { OrderStatus, PaymentStatus, ReservationStatus, Role };
