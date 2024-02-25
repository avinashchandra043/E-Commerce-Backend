const Review = require("../models/review.model");
const productService = require("./product.service");
const ratingService = require("./rating.service");

const createReview = async (req, user) => {
  const product = await productService.findProductById(req.productId);
  const rating = await ratingService.createRating(req, user);

  const review = new Review({
    user: user._id,
    product: product._id,
    review: req.review,
    rating: rating._id,
    createdAt: new Date(),
  });

  product.reviews.push(review._id);

  await product.save();
  return await review.save();
};

const getAllReview = async (productId) => {
  const product = await productService.findProductById(productId);
  return await Review.find({ product: productId })
    .populate("user")
    .populate("rating");
};

module.exports = {
  createReview,
  getAllReview,
};
