import { Request, Response } from 'express';
import { ProductModel } from '../models/Product.js';
import { db } from '../config/db.js';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, search, minPrice, maxPrice, minRating, sort } = req.query;
    const products = await ProductModel.find({
      category: category as string,
      search: search as string,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minRating: minRating ? Number(minRating) : undefined,
      sort: sort as string
    });
    res.json({ success: true, count: products.length, data: products });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    const reviews = await db.getReviewsByProduct(product._id);
    res.json({ success: true, data: { ...product, reviews } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await ProductModel.create(req.body);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updated = await ProductModel.findByIdAndUpdate(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await ProductModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully', id: req.params.id });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addProductReview = async (req: Request, res: Response) => {
  try {
    const { userId, userName, rating, comment } = req.body;
    const review = await db.addReview(req.params.id, userId, userName, Number(rating), comment);
    res.status(201).json({ success: true, data: review });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
