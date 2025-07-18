import express from 'express';
import * as categoryController from '../controllers/category.controller.js';

const router = express.Router();

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);

export default router;
