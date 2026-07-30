const Review = require('../models/Review');
const asyncHandler = require('../middleware/asyncHandler');

// GET /api/reviews
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({}).sort({ createdAt: -1 });
  res.json(reviews);
});

// POST /api/reviews
const createReview = asyncHandler(async (req, res) => {
  const { name, rating, product, comment } = req.body;

  if (!name || !name.trim() || !comment || !comment.trim()) {
    res.status(400);
    throw new Error('Name and comment are required');
  }

  const ratingNum = Number(rating);
  if (!ratingNum || ratingNum < 1 || ratingNum > 5) {
    res.status(400);
    throw new Error('Rating must be between 1 and 5');
  }

  const review = await Review.create({
    name: name.trim(),
    rating: ratingNum,
    product: product?.trim() || 'Sweet Crumbs Order',
    comment: comment.trim(),
  });

  res.status(201).json(review);
});

module.exports = { getReviews, createReview };