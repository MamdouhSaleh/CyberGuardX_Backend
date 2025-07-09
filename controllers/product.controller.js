import * as productService from '../services/product.service.js';

export async function getProducts(req, res) {
  try {
    const allProducts = await productService.getAllProducts();
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export async function getProductById(req, res) {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export async function createProduct(req, res) {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).send({ message: 'Product created', product: newProduct });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export async function updateProduct(req, res) {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    if (!updatedProduct) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.status(200).send({ message: 'Product updated', product: updatedProduct });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    if (!deletedProduct) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.status(200).send({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}