import express from 'express';
import { getAllPosts, getPostById, createPost, updatePost } from '../controllers/post.controller.js';

const router = express.Router();

router.route('/').get(getAllPosts);
router.route('/:id').get(getPostById).patch(updatePost);
router.route('/createPost').post(createPost);

export default router;