const Razorpay = require("razorpay");

const apiKey = "rzp_test_NBECbDm9YvBWIn";
const apiSecret = "xDnm6atMWxrzhhxXYDChFqYx";

const razorpay = new Razorpay({
  key_id: apiKey,
  key_secret: apiSecret,
});

module.exports = razorpay;
