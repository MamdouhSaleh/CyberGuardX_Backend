import express from 'express';
import * as bookController from '../controllers/book.controller.js';

const router = express.Router();

router.post('/', bookController.createBook);
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBook);

export default router;
