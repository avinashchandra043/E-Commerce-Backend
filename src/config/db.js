const mongoose = require("mongoose");

const currentEnvironment = "DEV";
const DEV = "DEV";
const PROD = "PROD";

const environmentConfig = {
  PROD: {
    mongodbUrl:
      "mongodb+srv://avinashchandrabarik01:pZ5KocckSOLsrE1P@cluster0.dmbatnl.mongodb.net/?retryWrites=true&w=majority",
    frontEndUrl: "https://crazycart.netlify.app/",
  },
  DEV: {
    mongodbUrl:
      "mongodb+srv://avinashchandrabarik01:pZ5KocckSOLsrE1P@cluster0.dmbatnl.mongodb.net/?retryWrites=true&w=majority",
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
