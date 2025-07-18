import * as categoryService from '../services/category.service.js';

export async function createCategory(req, res) {
  const category = await categoryService.createCategory(req.body);
  res.status(201).json(category);
}

export async function getCategories(req, res) {
  const categories = await categoryService.getAllCategories();
  res.json(categories);
}

export async function getCategory(req, res) {
  const category = await categoryService.getCategoryById(req.params.id);
  if (!category) return res.status(404).send('Category not found');
  res.json(category);
}
