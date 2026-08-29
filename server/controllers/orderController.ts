import { Request, Response } from 'express';
import { OrderModel } from '../models/Order.js';

export const getOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const orders = await OrderModel.find(userId as string);
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = await OrderModel.create(req.body);
    res.status(201).json({ success: true, data: newOrder });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const updated = await OrderModel.updateStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deleted = await OrderModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, message: 'Order cancelled and deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
