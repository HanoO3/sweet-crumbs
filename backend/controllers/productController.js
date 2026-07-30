const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');

const getProducts = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  let filter = {};

  if (category) filter.category = category;
  if (search && search.trim()) {
    const sanitized = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    filter.$or = [
      { name: { $regex: sanitized, $options: 'i' } },
      { description: { $regex: sanitized, $options: 'i' } },
    ];
  }

  const products = await Product.find(filter).populate('category', 'name slug');
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category', 'name slug');
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock, isFeatured } = req.body;

  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    isFeatured: isFeatured || false,
    image: req.file ? req.file.path : '',
  });

  res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const { name, description, price, category, stock, isFeatured } = req.body;

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.category = category || product.category;
  product.stock = stock !== undefined ? stock : product.stock;
  product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
  if (req.file) product.image = req.file.path;

  const updated = await product.save();
  res.json(updated);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  await product.deleteOne();
  res.json({ message: 'Product removed' });
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};