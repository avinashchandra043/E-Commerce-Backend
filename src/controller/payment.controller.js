const paymentService = require("../services/payment.service");

const createPaymentLink = async (req, res) => {
  try {
    const paymentLink = await paymentService.createPaymentLink(req.params.id);
    return res.status(200).send(paymentLink);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const updatePaymentInformation = async (req, res) => {
  try {
    await paymentService.updatePaymentInformation(req.query);
    return res
      .status(200)
      .send({ message: "payment information updated", status: true });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  createPaymentLink,
  updatePaymentInformation,
};
