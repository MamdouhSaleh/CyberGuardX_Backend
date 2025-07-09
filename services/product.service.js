import Product from '../models/product.model.js';

export async function getAllProducts() {
  return await Product.find();
}

export async function getProductById(id) {
  return await Product.findById(id);
}

export async function createProduct(productData) {
  return await Product.create(productData);
}

export async function updateProduct(id, productData) {
  return await Product.findByIdAndUpdate(id, productData, { new: true });
}

export async function deleteProduct(id) {
  return await Product.findByIdAndDelete(id);
}