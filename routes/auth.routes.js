import express from 'express';
import { signup, login, getDashboard, getAdminPanel, changeUserRole } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { authorizeRole } from '../middlewares/role.middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/dashboard', verifyToken, getDashboard);
router.get('/admin', verifyToken, authorizeRole('admin'), getAdminPanel);
router.patch('/change-role', verifyToken, authorizeRole('admin'), changeUserRole);

export default router;
