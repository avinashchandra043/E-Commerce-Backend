const Rating = require("../models/rating.model");
const productService = require("../services/product.service");

const createRating = async (req, user) => {
  const ratingValue = Number(req.rating);
  const product = await productService.findProductById(req.productId);
  const rating = new Rating({
    product: product._id,
    user: user._id,
    rating: ratingValue,
    createdAt: new Date(),
  });

  product.ratings.push(rating);
  const totalRating = (product.ratingData.totalRating || 0) + 1;

  const ratingData = {
    totalRating: totalRating,
    avgRating: product.ratingData.totalRating
      ? ((product.ratingData.avgRating || 0) * (totalRating - 1) +
          ratingValue) /
        totalRating
      : ratingValue,
    excellent: product.ratingData.excellent,
    good: product.ratingData.good,
    average: product.ratingData.average,
    poor: product.ratingData.poor,
  };

  if (ratingValue === 5) {
    ratingData.excellent = (ratingData.excellent || 0) + 1;
  } else if (ratingValue >= 4 && ratingValue < 5) {
    ratingData.good = (ratingData.good || 0) + 1;
  } else if (ratingValue >= 2 && ratingValue < 4) {
    ratingData.average = (ratingData.average || 0) + 1;
  } else if (ratingValue >= 1 && ratingValue < 2) {
    ratingData.poor = (ratingData.poor || 0) + 1;
  }
  await productService.updateProduct(product._id, {
    ratingData: ratingData,
    ratings: product.ratings,
  });

  return await rating.save();
};

const getProductRating = async (productId) => {
  return await Rating.find({ product: productId });
};

module.exports = {
  createRating,
  getProductRating,
};
