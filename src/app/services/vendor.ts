import { api } from '../lib/api'

export interface VendorOrder {
  id: string
  customerName: string
  items: { name: string; quantity: number; price: number }[]
  total: number
  status: 'pending' | 'preparing' | 'ready' | 'completed'
  timestamp: string
  location: string
  riderName: string | null
  specialInstructions: string | null
}

export interface VendorMenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  available: boolean
  prepTime: string
}

export const vendorService = {
  getDashboard: () =>
    api.get<{ isOpen: boolean; todayOrders: number; todayRevenue: number; pendingOrders: number; avgPrepTime: number }>('/vendor/dashboard'),

  getOrders: (status?: string) =>
    api.get<{ orders: VendorOrder[] }>(`/vendor/orders${status ? `?status=${status}` : ''}`),

  updateOrderStatus: (id: string, status: VendorOrder['status']) =>
    api.put<{ id: string; status: string }>(`/vendor/orders/${id}/status`, { status }),

  getMenu: () =>
    api.get<{ items: VendorMenuItem[] }>('/vendor/menu'),

  addMenuItem: (formData: FormData) =>
    api.post<VendorMenuItem>('/vendor/menu', formData),

  updateMenuItem: (id: string, formData: FormData) =>
    api.put<VendorMenuItem>(`/vendor/menu/${id}`, formData),

  deleteMenuItem: (id: string) =>
    api.del<{ message: string }>(`/vendor/menu/${id}`),

  toggleAvailability: (id: string, available: boolean) =>
    api.patch<{ id: string; available: boolean }>(`/vendor/menu/${id}/availability`, { available }),

  setStoreStatus: (isOpen: boolean) =>
    api.put<{ isOpen: boolean }>('/vendor/status', { isOpen }),

  getAnalytics: (period?: 'week' | 'month') =>
    api.get<{ dailySales: object[]; peakHours: object[]; topItems: object[]; orderSources: object[] }>(`/vendor/analytics${period ? `?period=${period}` : ''}`),

  getEarnings: () =>
    api.get<{ thisMonth: number; thisWeek: number; pendingSettlement: number; dailyEarnings: object[]; transactions: object[] }>('/vendor/earnings'),

  getProfile: () =>
    api.get<{ id: string; name: string; category: string; location: string; image: string; contact: string; bankAccount: string; openingTime: string | null; closingTime: string | null }>('/vendor/profile'),

  updateProfile: (data: { name?: string; category?: string; location?: string; contact?: string; openingTime?: string; closingTime?: string } | FormData) =>
    api.put<{ name: string; category: string; location: string; contact: string; openingTime: string | null; closingTime: string | null }>('/vendor/profile', data),
}
