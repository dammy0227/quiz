// routes/authRoutes.js
import express from 'express';
import { register, login, logout } from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Optional logout (client can just remove token)
router.post('/logout', logout);

export default router;
