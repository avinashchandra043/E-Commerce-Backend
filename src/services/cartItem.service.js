const CartItem = require("../models/cartItem.model");
const userService = require("./user.service");

const updateCartItem = async (userId, cartItemId, cartItemData) => {
  try {
    const item = await findCartItemById(cartItemId);
    if (!item) {
      throw new Error("cart Item not found : ", cartItemId);
    }
    const user = await userService.findUserById(item.userId);
    if (!user) {
      throw new Error("user not found : ", userId);
    }
    if (user._id.toString() === userId.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;
      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      throw new Error("You can't update this cart item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeCartItem = async (userId, cartItemId) => {
  try {
    const cartItem = await findCartItemById(cartItemId);
    const user = await userService.findUserById(userId);

    if (user._id.toString() === cartItem.userId.toString()) {
      return await CartItem.findByIdAndDelete(cartItemId);
    } else {
      throw new Error("you can't remove another user's item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const findCartItemById = async (cartItemId) => {
  const cartItem = await CartItem.findById(cartItemId).populate("product");
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error("cartItem not found with id : ", cartItemId);
  }
};

module.exports = { updateCartItem, removeCartItem, findCartItemById };
