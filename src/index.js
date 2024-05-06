const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://crazycart.netlify.app"],
  })
);

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "welcome to e-commerce api -node", staus: "true" });
});

const authRouters = require("./routes/auth.route");
app.use("/auth", authRouters);

const userRouters = require("./routes/user.route");
app.use("/api/users", userRouters);

const productRouters = require("./routes/product.route");
app.use("/api/products", productRouters);

const adminProductRouters = require("./routes/adminProduct.route");
app.use("/api/admin/products", adminProductRouters);

const cartRouter = require("./routes/cart.route");
app.use("/api/cart", cartRouter);

const cartItemRouter = require("./routes/cartItem.route");
app.use("/api/cart_items", cartItemRouter);

const orderRouter = require("./routes/order.route");
app.use("/api/orders", orderRouter);

const adminOrderRouter = require("./routes/adminOrder.route");
app.use("/api/admin/orders", adminOrderRouter);

const reviewRouter = require("./routes/review.route");
app.use("/api/review", reviewRouter);

const ratingRouter = require("./routes/rating.route");
app.use("/api/rating", ratingRouter);

const paymentRouter = require("./routes/payment.route");
app.use("/api/payments", paymentRouter);

module.exports = app;
