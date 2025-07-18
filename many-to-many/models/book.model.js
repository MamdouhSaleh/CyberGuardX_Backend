import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: String,
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
});

export const Book = mongoose.model('Book', bookSchema);
