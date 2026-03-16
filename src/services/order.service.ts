import api from '@/utils/api';

export const orderService = {
  createOrder: async (data: {
    restaurantId: string;
    items: { productId: string; quantity: number }[];
    paymentMethod: string;
    deliveryType: string;
    note?: string;
    addressId?: string;
  }) => {
    const response = await api.post('/orders', data);
    return response.data;
  },
  getUserOrders: async () => {
    const response = await api.get('/orders/my-orders');
    return response.data;
  },
  getOrderDetails: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
};
