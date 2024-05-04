const Category = require("../models/category.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const Rating = require("../models/rating.model");

const createProduct = async (reqData) => {
  if (!reqData.topLavelCategory) {
    return;
  }

  let topLevel = await Category.findOne({
    name: reqData.topLavelCategory.toLowerCase(),
  });

  if (!topLevel) {
    topLevel = new Category({
      name: reqData.topLavelCategory.toLowerCase(),
      level: 1,
    });

    await topLevel.save();
  }

  let secondLevel = await Category.findOne({
    name: reqData.secondLavelCategory.toLowerCase(),
    parentCategory: topLevel._id,
  });

  if (!secondLevel) {
    secondLevel = new Category({
      name: reqData.secondLavelCategory.toLowerCase(),
      parentCategory: topLevel._id,
      level: 2,
    });

    await secondLevel.save();
  }

  let thirdLevel = await Category.findOne({
    name: reqData.thirdLavelCategory.toLowerCase(),
    parentCategory: secondLevel._id,
  });

  if (!thirdLevel) {
    thirdLevel = new Category({
      name: reqData.thirdLavelCategory.toLowerCase(),
      parentCategory: secondLevel._id,
      level: 3,
    });

    await thirdLevel.save();
  }

  const product = new Product({
    title: reqData.title,
    color: reqData.color,
    description: reqData.description,
    discountedPrice: reqData.discountedPrice,
    discountPercent: Math.floor(
      ((reqData.price - reqData.discountedPrice) / reqData.price) * 100
    ),
    imageUrl: reqData.imageUrl,
    brand: reqData.brand,
    price: reqData.price,
    sizes: reqData.size,
    quantity: reqData.quantity,
    category: thirdLevel._id,
  });

  return await product.save();
};

const deleteProduct = async (productId) => {
  const product = await Product.findProductById(productId);
  if (product) {
    await Product.findByIdAndDelete(productId);
  } else {
    throw new Error("product not found with productId : ", productId);
  }
  return "Product deleted successfully";
};

const updateProduct = async (productId, reqData) => {
  return await Product.findByIdAndUpdate(productId, reqData);
};

const findProductById = async (id) => {
  const product = await Product.findById(id)
    .populate("category")
    .populate("ratings")
    .populate({
      path: "reviews",
      populate: [
        {
          path: "user",
          model: User,
        },
        {
          path: "rating",
          model: Rating,
        },
      ],
    })
    .exec();

  if (!product) {
    throw new Error("Product not found with id : ", id);
  }
  return product;
};

const getAllProducts = async (reqQuery) => {
  let {
    category,
    color,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = reqQuery;

  pageSize = Number(pageSize) || 10;
  minPrice = Number(minPrice);
  maxPrice = Number(maxPrice);
  minDiscount = Number(minDiscount);
  pageNumber = Number(pageNumber) >= 1 ? Number(pageNumber) : 1;

  let query = Product.find().populate("category");

  if (category) {
    const existCategory = await Category.findOne({ name: category });
    if (existCategory) {
      query = query.where("category").equals(existCategory._id);
    } else {
      return { content: [], currentPage: 1, totalPages: 0 };
    }
  }
  if (color) {
    const colorSet = new Set(
      color.split(",").map((color) => color.trim().toLowerCase())
    );
    const colorRegex =
      colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
    query = query.where("color").regex(colorRegex);
  }
  if (sizes) {
    const sizesSet = new Set(sizes);
    query = query.where("sizes.name").in([...sizesSet]);
  }

  if (minPrice && maxPrice) {
    query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
  }

  if (minDiscount) {
    query = query.where("discountPercent").gt(minDiscount);
  }

  if (stock) {
    if (stock === "in_stock") {
      query = query.where("quantity").gt(0);
    } else if (stock === "out_of_stock") {
      query = query.where("quantity").gt(1);
    }
  }

  if (sort) {
    const sortDirection = sort === "price_high" ? -1 : 1;
    query = query.sort({ discountedPrice: sortDirection });
  }

  query = query.select(
    "_id title price discountedPrice discountPercent brand imageUrl ratingData"
  );

  const totalProducts = await Product.countDocuments(query);
  const skip = (pageNumber - 1) * pageSize;
  query = query.skip(skip).limit(pageSize);
  const products = await query.exec();

  const totalPages = Math.ceil(totalProducts / pageSize);
  const currentPage = Math.floor(skip / pageSize) + 1;

  return { content: products, currentPage: pageNumber || 1, totalPages };
};

const createMultipleProduct = async (products) => {
  console.log(">>>>ocmingHere", products);
  for (let product of products) {
    await createProduct(product);
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  findProductById,
  createMultipleProduct,
};
