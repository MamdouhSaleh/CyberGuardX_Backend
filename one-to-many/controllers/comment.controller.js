import { Comment } from '../models/comment.model.js';

export const createComment = async (req, res) => {
  const { text, user, postId } = req.body;
  const comment = await Comment.create({ text, user, postId });
  res.status(201).json(comment);
};
