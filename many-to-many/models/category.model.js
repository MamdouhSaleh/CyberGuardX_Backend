import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: String,
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

export const Category = mongoose.model('Category', categorySchema);
