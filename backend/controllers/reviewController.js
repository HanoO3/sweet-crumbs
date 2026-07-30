const Review = require('../models/Review');

// GET /api/reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/reviews
const createReview = async (req, res) => {
  try {
    const { name, rating, product, comment } = req.body;

    if (!name || !name.trim() || !comment || !comment.trim()) {
      return res.status(400).json({ message: 'Name and comment are required' });
    }

    const ratingNum = Number(rating);
    if (!ratingNum || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const review = await Review.create({
      name: name.trim(),
      rating: ratingNum,
      product: product?.trim() || 'Sweet Crumbs Order',
      comment: comment.trim(),
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getReviews, createReview };