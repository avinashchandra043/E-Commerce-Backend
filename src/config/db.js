const mongoose = require("mongoose");
require("dotenv").config();

const currentEnvironment = "DEV";
const DEV = "DEV";
const PROD = "PROD";

const environmentConfig = {
  PROD: {
    mongodbUrl: process.env.MONGODB_URI,
    frontEndUrl: "https://crazycart.netlify.app/",
  },
  DEV: {
    mongodbUrl: process.env.MONGODB_URI,
    frontEndUrl: "http://localhost:3000",
  },
};

const getUrls = (enviroment) => {
  switch (enviroment) {
    case DEV:
      return environmentConfig.DEV;
    case PROD:
      return environmentConfig.PROD;
    default:
      return environmentConfig.DEV;
  }
};

const frontEndUrl = getUrls(currentEnvironment).frontEndUrl;

const connectDb = () => {
  return mongoose.connect(getUrls(currentEnvironment).mongodbUrl);
};

module.exports = { connectDb, frontEndUrl };
