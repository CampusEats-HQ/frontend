import { api } from '../lib/api'

export interface IncomingOrder {
  id: string
  restaurant: { name: string; location: string }
  customer: { name: string; phone: string; location: string }
  items: string[]
  distance: string
  payout: number
}

export interface ActiveDelivery {
  id: string
  restaurant: { name: string; location: string }
  customer: { name: string; phone: string; location: string }
  items: string[]
  currentStep: number
}

export const riderService = {
  getStats: () =>
    api.get<{ deliveriesToday: number; earningsToday: number; rating: number; earningsThisWeek: number }>('/rider/stats'),

  setOnlineStatus: (isOnline: boolean) =>
    api.put<{ isOnline: boolean }>('/rider/status', { isOnline }),

  getIncomingOrder: () =>
    api.get<{ order: IncomingOrder | null }>('/rider/incoming-order'),

  acceptOrder: (id: string) =>
    api.post<{ delivery: ActiveDelivery }>(`/rider/orders/${id}/accept`),

  rejectOrder: (id: string) =>
    api.post<{ message: string }>(`/rider/orders/${id}/reject`),

  updateDeliveryStep: (step: 1 | 2) =>
    api.put<{ currentStep: number }>('/rider/delivery/step', { step }),

  completeDelivery: () =>
    api.post<{ message: string; earnings: number }>('/rider/delivery/complete'),

  getEarnings: () =>
    api.get<{ earningsThisWeek: number; history: { date: string; deliveries: number; amount: number }[] }>('/rider/earnings'),

  getProfile: () =>
    api.get<{ id: string; name: string; email: string; phone: string; rating: number; totalDeliveries: number; bankName: string; accountNumber: string }>('/rider/profile'),

  updateBank: (data: { bankName: string; accountNumber: string }) =>
    api.put<{ bankName: string; accountNumber: string }>('/rider/bank', data),
}
