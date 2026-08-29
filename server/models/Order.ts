import { db } from '../config/db.js';
import { IOrder } from '../types.js';

export const OrderModel = {
  find: async (userId?: string) => {
    return await db.getOrders(userId);
  },
  findById: async (id: string) => {
    return await db.getOrderById(id);
  },
  create: async (data: Omit<IOrder, '_id' | 'orderNumber' | 'createdAt'>) => {
    return await db.createOrder(data);
  },
  updateStatus: async (id: string, status: IOrder['status']) => {
    return await db.updateOrderStatus(id, status);
  },
  findByIdAndDelete: async (id: string) => {
    return await db.deleteOrder(id);
  }
};
