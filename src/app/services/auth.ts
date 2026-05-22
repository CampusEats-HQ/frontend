import { api, setToken, clearToken } from '../lib/api'

export interface CustomerUser {
  id: string
  fullName: string
  email: string
  phone?: string
}

export interface VendorUser {
  id: string
  name: string
  category: string
  location: string
  isOpen: boolean
}

export interface RiderUser {
  id: string
  name: string
  email: string
  phone: string
  rating: number
  totalDeliveries: number
  bankName: string
  accountNumber: string
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: string
}

export const authService = {
  registerCustomer: async (data: { fullName: string; email: string; password: string }) => {
    const res = await api.post<{ token: string; user: CustomerUser }>('/auth/customer/register', data)
    setToken(res.token)
    return res
  },

  loginCustomer: async (data: { email: string; password: string }) => {
    const res = await api.post<{ token: string; user: CustomerUser }>('/auth/customer/login', data)
    setToken(res.token)
    return res
  },

  loginVendor: async (data: { email: string; password: string }) => {
    const res = await api.post<{ token: string; vendor: VendorUser }>('/auth/vendor/login', data)
    setToken(res.token)
    return res
  },

  registerRider: (formData: FormData) =>
    api.post<{ message: string; applicationId: string }>('/auth/rider/register', formData),

  loginRider: async (data: { email: string; password: string }) => {
    const res = await api.post<{ token: string; rider: RiderUser }>('/auth/rider/login', data)
    setToken(res.token)
    return res
  },

  loginAdmin: async (data: { email: string; password: string }) => {
    const res = await api.post<{ token: string; admin: AdminUser }>('/auth/admin/login', data)
    setToken(res.token)
    return res
  },

  verifyOtp: (data: { email: string; otp: string }) =>
    api.post<{ message: string; verified: boolean }>('/auth/verify-otp', data),

  forgotPassword: (data: { email: string }) =>
    api.post<{ message: string }>('/auth/forgot-password', data),

  resetPassword: (data: { email: string; otp: string; newPassword: string }) =>
    api.post<{ message: string }>('/auth/reset-password', data),

  logout: () => clearToken(),
}
