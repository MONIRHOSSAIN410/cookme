import { db } from '../config/db.js';
import { IProduct } from '../types.js';

export const ProductModel = {
  find: async (filter?: any) => {
    return await db.getProducts(filter);
  },
  findById: async (id: string) => {
    return await db.getProductById(id);
  },
  create: async (data: Omit<IProduct, '_id' | 'createdAt'>) => {
    return await db.createProduct(data);
  },
  findByIdAndUpdate: async (id: string, updates: Partial<IProduct>) => {
    return await db.updateProduct(id, updates);
  },
  findByIdAndDelete: async (id: string) => {
    return await db.deleteProduct(id);
  }
};
