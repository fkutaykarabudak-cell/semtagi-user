import api from '@/utils/api';

export interface Restaurant {
  id: string;
  name: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  minOrderAmount: number;
  deliveryFee: number;
  workingHours: string;
  isOpen: boolean;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  categoryNames?: string[];
}

export const restaurantService = {
  getRestaurants: async (params?: { latitude?: number; longitude?: number; search?: string }) => {
    const response = await api.get('/restaurants', { params });
    return response.data;
  },
  getRestaurantDetails: async (id: string) => {
    const response = await api.get(`/restaurants/${id}`);
    return response.data;
  },
  getMenu: async (restaurantId: string) => {
    const response = await api.get(`/menu/restaurant/${restaurantId}`);
    return response.data;
  },
};
