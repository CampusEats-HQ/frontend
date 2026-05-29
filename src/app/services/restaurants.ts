import { api } from '../lib/api'

export interface Restaurant {
  id: string
  name: string
  category: string
  rating: number
  deliveryTime: string
  deliveryFee: number
  image: string
  isOpen: boolean
  openingTime: string | null
  closingTime: string | null
  sponsored?: boolean
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export interface MenuCategory {
  category: string
  items: MenuItem[]
}

export interface RestaurantDetail extends Restaurant {
  reviewsCount: number
  menu: MenuCategory[]
}

export interface PopularItem {
  id: string
  name: string
  restaurant: string
  restaurantId: string
  price: number
  image: string
}

export const restaurantService = {
  getAll: (params?: { category?: string; search?: string }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString()
    return api.get<{ restaurants: Restaurant[] }>(`/restaurants${query ? `?${query}` : ''}`)
  },

  getById: (id: string) =>
    api.get<RestaurantDetail>(`/restaurants/${id}`),

  getPopularItems: () =>
    api.get<{ items: PopularItem[] }>('/restaurants/popular-items'),

  getDeliveryLocations: () =>
    api.get<{ locations: string[] }>('/delivery-locations'),
}
