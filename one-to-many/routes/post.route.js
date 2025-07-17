import express from 'express';
import { createPost } from '../controllers/post.controller.js';
import { getPostComments } from '../controllers/post.controller.js';
import { getAllPosts, getPostById } from '../controllers/post.controller.js';
import { getPostWithComments } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/', createPost);
router.get('/:postId/comments', getPostComments);
router.get('/with-comments/:postId', getPostWithComments);
router.get('/', getAllPosts);
router.get('/:postId', getPostById);



export default router;
