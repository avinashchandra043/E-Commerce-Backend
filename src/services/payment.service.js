const { frontEndUrl } = require("../config/db");
const razorpay = require("../config/razorpayClient");
const orderService = require("../services/order.service");

const createPaymentLink = async (orderId) => {
  const order = await orderService.findOrderById(orderId);
  const paymentLinkRequest = {
    amount: order.totalDiscountedPrice * 100,
    currency: "INR",
    customer: {
      name: order.user.firstName + "" + order.user.lastName,
      contact: order.user.mobile,
      email: order.user.email,
    },
    notify: { sms: true, email: true },
    reminder_enable: true,
    callback_url: `${frontEndUrl}/payment/${orderId}`,
    callback_method: "get",
  };
  const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
  const paymentLinkId = paymentLink.id;
  const payment_link_url = paymentLink.short_url;
  const resData = {
    paymentLinkId,
    payment_link_url,
  };

  return resData;
};

const updatePaymentInformation = async (reqData) => {
  const paymentId = reqData.payment_id;
  const orderId = reqData.order_id;
  try {
    const order = await orderService.findOrderById(orderId);
    const payment = await razorpay.payments.fetch(paymentId);
    if (payment.status == "captured") {
      order.paymentDetails.paymentId = paymentId;
      order.paymentDetails.status = "COMPLETED";
      order.orderStatus = "PLACED";
      await order.save();
    }

    const resData = { message: "Your order is placed", success: true };
    return resData;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  createPaymentLink,
  updatePaymentInformation,
};
