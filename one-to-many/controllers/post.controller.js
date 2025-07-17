import { Post } from '../models/post.model.js';
import { Comment } from '../models/comment.model.js';

export const createPost = async (req, res) => {
    const { title, content } = req.body;
    const post = await Post.create({ title, content });
    res.status(201).json(post);
};

export const getPostComments = async (req, res) => {
    const { postId } = req.params;
    const comments = await Comment.find({ postId });
    res.json(comments);
};

export const getAllPosts = async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
}
export const getPostById = async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
};

export const getPostWithComments = async (req, res) => {
    const { postId } = req.params;
    
    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    const comments = await Comment.find({ postId });
    
    const response = {
        ...post.toObject(),
        comments: comments.map(comment => ({
            id: comment._id,
            text: comment.text,
            user: comment.user
        }))
    };
    
    res.json(response);
};

