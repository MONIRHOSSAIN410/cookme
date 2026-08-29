import { Router } from 'express';
import { login, register, getProfile } from '../controllers/authController.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/profile/:id', getProfile);

export default router;
