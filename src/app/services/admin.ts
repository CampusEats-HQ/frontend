import { api } from '../lib/api'

export const adminService = {
  getDashboard: () =>
    api.get<{
      stats: { liveOrders: number; onlineRiders: number; activeVendors: number; revenueToday: number }
      liveOrders: object[]
      onlineRiders: object[]
    }>('/admin/dashboard'),

  getOrders: (status?: string) =>
    api.get<{ orders: object[] }>(`/admin/orders${status ? `?status=${status}` : ''}`),

  getUnassignedOrders: () =>
    api.get<{ orders: object[] }>('/admin/orders/unassigned'),

  assignRider: (orderId: string, riderId: string) =>
    api.post<{ orderId: string; riderId: string; riderName: string }>(`/admin/orders/${orderId}/assign-rider`, { riderId }),

  getRiders: (status?: 'active' | 'pending' | 'suspended') =>
    api.get<{ riders: object[] }>(`/admin/riders${status ? `?status=${status}` : ''}`),

  approveRider: (id: string) =>
    api.post<{ message: string }>(`/admin/riders/${id}/approve`),

  rejectRider: (id: string, reason?: string) =>
    api.post<{ message: string }>(`/admin/riders/${id}/reject`, { reason }),

  suspendRider: (id: string, reason?: string) =>
    api.post<{ message: string }>(`/admin/riders/${id}/suspend`, { reason }),

  getVendors: () =>
    api.get<{ vendors: object[] }>('/admin/vendors'),

  createVendor: (data: { restaurantName: string; ownerName: string; ownerEmail: string; ownerPhone: string; location: string; bankName: string; accountNumber: string }) =>
    api.post<{ message: string; vendorId: string }>('/admin/vendors', data),

  updateVendorStatus: (id: string, status: 'active' | 'inactive') =>
    api.put<{ id: string; status: string }>(`/admin/vendors/${id}/status`, { status }),

  getAnalytics: (period?: 'week' | 'month') =>
    api.get<object>(`/admin/analytics${period ? `?period=${period}` : ''}`),

  getFinance: () =>
    api.get<{ platformEarningsToday: number; pendingPayouts: number; settledThisWeek: number }>('/admin/finance'),

  getVendorPayouts: () =>
    api.get<{ payouts: object[] }>('/admin/finance/payouts/vendors'),

  getRiderPayouts: () =>
    api.get<{ payouts: object[] }>('/admin/finance/payouts/riders'),

  settlePayout: (id: string) =>
    api.post<{ message: string; reference: string }>(`/admin/finance/payouts/${id}/settle`),

  getSettlements: (period?: 'today' | 'week' | 'month' | 'all') =>
    api.get<{ settlements: object[] }>(`/admin/finance/settlements${period ? `?period=${period}` : ''}`),
}
