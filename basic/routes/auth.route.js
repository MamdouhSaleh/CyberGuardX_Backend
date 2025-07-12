import express from 'express';
import { register, login, protectedRoute } from '../controllers/auth.controller.js';
import { verifyToken, validateUser, validateEmail, validatePassword } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', validateUser, validateEmail, validatePassword, register);
router.post('/login', validateUser, login);
router.get('/protected', verifyToken, protectedRoute);

export default router;
