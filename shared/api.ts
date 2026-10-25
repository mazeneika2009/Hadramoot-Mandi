import type {
  OrderStatus,
  PaymentStatus,
  ReservationStatus,
} from './config';

export type {
  OrderStatus,
  PaymentStatus,
  ReservationStatus,
} from './config';

export type Role = 'customer' | 'admin' | 'kitchen' | 'cashier' | 'delivery';

export interface UserDto {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: Role;
  createdAt: string;
  isApproved: boolean;
}

export interface MenuItemDto {
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

export interface OrderItemDto {
  id: number;
  menuItemId: number;
  name: string;
  nameEn: string | null;
  imageUrl: string | null;
  quantity: number;
  priceAtPurchase: number;
  lineTotal: number;
}

export interface OrderDto {
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
  items: OrderItemDto[];
  createdAt: string;
  updatedAt: string;
  paymentMethod: 'ONLINE' | 'CASH';
  deliveryUserId: number | null;
  deliveryUserName: string | null;
  deliveryUserPhone: string | null;
  dispatchedAt: string | null;
  deliveredAt: string | null;
  cashReceived: number | null;
  cashChange: number | null;
}

export interface DeliveryDriverDto {
  id: number;
  name: string;
  email: string;
  phone: string | null;
}

export interface DispatchOrderInput {
  deliveryUserId: number;
}

export interface ConfirmDeliveryInput {
  cashReceived?: number;
}

export interface ReservationDto {
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

export interface AuthResponse {
  token: string;
  user: UserDto;
}

export interface MenuFilters {
  category?: string;
  search?: string;
  available?: boolean;
}

export interface CreateOrderItemInput {
  menuItemId: number;
  quantity: number;
}

export interface CreateOrderInput {
  items: CreateOrderItemInput[];
  deliveryAddress: string;
  notes?: string;
  paymentMethod?: 'ONLINE' | 'CASH';
}

export interface CreateReservationInput {
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}

export interface MenuItemInput {
  name: string;
  nameEn?: string;
  description?: string;
  descriptionEn?: string;
  price: number;
  category: string;
  imageUrl?: string;
  isAvailable?: boolean;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Paginated<T> {
  items: T[];
  pagination: PaginationMeta;
}

export interface AdminStats {
  totalOrders: number;
  pendingOrders: number;
  preparingOrders: number;
  outForDeliveryOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  totalMenuItems: number;
  totalReservations: number;
}

export interface ApiSuccess<T> {
  success: true;
  message?: string;
  data: T;
}

export interface ApiFailure {
  success: false;
  message: string;
  code?: string;
  errors?: string[];
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
