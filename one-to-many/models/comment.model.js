import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  text: String,
  user: String,
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  }
});

export const Comment = mongoose.model('Comment', CommentSchema);
