import { Request, Response } from 'express';
import { UserModel } from '../models/User.js';

export const login = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier) {
      return res.status(400).json({ success: false, message: 'Phone or email is required' });
    }

    let user = await UserModel.findByEmailOrPhone(identifier);
    if (!user) {
      // Create account automatically on first sign-in if not exists or default demo user
      user = await UserModel.create('User ' + identifier.split('@')[0], identifier.includes('@') ? identifier : `${identifier}@cookme.store`, identifier);
    }

    res.json({
      success: true,
      message: 'Signed in successfully',
      data: user
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || (!email && !phone)) {
      return res.status(400).json({ success: false, message: 'Name and email or phone are required' });
    }

    const user = await UserModel.create(name, email || `${phone}@cookme.store`, phone || '01700000000');
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: user
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
