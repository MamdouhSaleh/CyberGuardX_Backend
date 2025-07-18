import { Book } from '../models/book.model.js';
import { Category } from '../models/category.model.js';

export async function createBook(data) {
  const book = await Book.create(data);
  await Category.updateMany(
    { _id: { $in: data.categories } },
    { $push: { books: book._id } }
  );
  return book;
}

export async function getAllBooks() {
  return Book.find().populate('categories', 'name');
}

export async function getBookById(id) {
  return Book.findById(id).populate('categories', 'name');
}

export async function getBooksByCategory(categoryId) {
  return Book.find({ categories: categoryId }).populate('categories', 'name');
}
