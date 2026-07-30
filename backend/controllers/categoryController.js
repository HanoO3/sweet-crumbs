const Category = require('../models/Category');
const asyncHandler = require('../middleware/asyncHandler');

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

const createCategory = asyncHandler(async (req, res) => {
  const { name, image } = req.body;
  const slug = name.toLowerCase().trim().replace(/\s+/g, '-');

  const category = await Category.create({ name, slug, image });
  res.status(201).json(category);
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name, image } = req.body;
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  category.name = name || category.name;
  category.image = image || category.image;
  if (name) category.slug = name.toLowerCase().trim().replace(/\s+/g, '-');

  const updated = await category.save();
  res.json(updated);
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  await category.deleteOne();
  res.json({ message: 'Category removed' });
});

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };