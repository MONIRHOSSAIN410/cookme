import { db } from '../config/db.js';

export const UserModel = {
  findById: async (id: string) => {
    return await db.getUserById(id);
  },
  findByEmailOrPhone: async (identifier: string) => {
    return await db.getUserByEmailOrPhone(identifier);
  },
  create: async (name: string, email: string, phone: string) => {
    return await db.registerUser(name, email, phone);
  }
};
