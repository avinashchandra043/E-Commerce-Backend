const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  rating: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ratings",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Reveiw = mongoose.model("reviews", reviewSchema);

module.exports = Reveiw;
