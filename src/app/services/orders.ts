import { api } from '../lib/api'

export interface OrderItem {
  name: string
  quantity: number
  price: number
}

export interface PlaceOrderPayload {
  items: { itemId: string; name: string; price: number; quantity: number; restaurantId: string }[]
  deliveryLocation: string
  paymentMethod: 'card' | 'bank' | 'wallet'
  promoCode?: string
}

export interface Order {
  id: string
  date: string
  time: string
  restaurant: string
  restaurantId: string
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  total: number
  status: string
  rider: string
}

export interface OrderTracking {
  id: string
  status: string
  restaurant: string
  items: OrderItem[]
  deliveryLocation: string
  subtotal: number
  deliveryFee: number
  total: number
  steps: { label: string; completed: boolean; active: boolean }[]
  rider: { name: string; phone: string; rating: number }
  estimatedArrival: string
  placedAt: string
}

export interface Address {
  id: string
  label: string
  name: string
  details: string
  isDefault: boolean
}

export interface Notification {
  id: string
  type: 'delivery' | 'order' | 'promo' | 'rating'
  title: string
  message: string
  time: string
  read: boolean
}

export const orderService = {
  place: (payload: PlaceOrderPayload) =>
    api.post<{ orderId: string; status: string; estimatedDeliveryTime: string; subtotal: number; deliveryFee: number; discount: number; total: number }>('/orders', payload),

  getHistory: () =>
    api.get<{ orders: Order[] }>('/orders'),

  getById: (orderId: string) =>
    api.get<OrderTracking>(`/orders/${orderId}`),

  applyPromo: (data: { code: string; subtotal: number }) =>
    api.post<{ valid: boolean; discountPercent?: number; discountAmount?: number; newSubtotal?: number; message?: string }>('/orders/apply-promo', data),

  rate: (orderId: string, data: { foodRating: number; riderRating: number; comment?: string }) =>
    api.post<{ message: string }>(`/orders/${orderId}/rate`, data),

  reorder: (orderId: string) =>
    api.post<{ items: PlaceOrderPayload['items']; restaurantId: string; restaurant: string }>(`/orders/${orderId}/reorder`),
}

export const addressService = {
  getAll: () =>
    api.get<{ addresses: Address[] }>('/addresses'),

  add: (data: { label: string; name: string; details: string }) =>
    api.post<Address>('/addresses', data),

  setDefault: (id: string) =>
    api.put<{ message: string }>(`/addresses/${id}/default`),

  delete: (id: string) =>
    api.del<{ message: string }>(`/addresses/${id}`),
}

export const notificationService = {
  getAll: () =>
    api.get<{ unreadCount: number; notifications: Notification[] }>('/notifications'),

  markAllRead: () =>
    api.put<{ message: string }>('/notifications/read-all'),

  markRead: (id: string) =>
    api.put<{ message: string }>(`/notifications/${id}/read`),
}

export const profileService = {
  get: () =>
    api.get<{ id: string; firstName: string; lastName: string; email: string; phone: string }>('/profile'),

  update: (data: { firstName?: string; lastName?: string; phone?: string }) =>
    api.put<{ id: string; firstName: string; lastName: string; phone: string }>('/profile', data),
}
