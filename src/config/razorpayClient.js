require("dotenv").config();
const Razorpay = require("razorpay");

const apiKey = process.env.RAZOR_PAY_KEY;
const apiSecret = process.env.RAZOR_PAY_SECRET;

const razorpay = new Razorpay({
  key_id: apiKey,
  key_secret: apiSecret,
});

module.exports = razorpay;
