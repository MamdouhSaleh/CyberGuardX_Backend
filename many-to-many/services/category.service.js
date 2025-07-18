import { Category } from '../models/category.model.js';
import { Book } from '../models/book.model.js';

export async function createCategory(data) {
  const category = await Category.create(data);
  await Book.updateMany(
    { _id: { $in: data.books || [] } },
    { $push: { categories: category._id } }
  );
  await category.populate('books', 'title');
  return category;
}

export async function getAllCategories() {
  return Category.find().populate('books', 'title');
}

export async function getCategoryById(id) {
  try {
    return await Category.findById(id).populate('books', 'title');
  } catch (error) {
    return null; 
  }
}
