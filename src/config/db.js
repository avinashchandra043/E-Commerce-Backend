const mongoose = require("mongoose");

const mongodbUrl =
  "mongodb+srv://avinashchandrabarik01:pZ5KocckSOLsrE1P@cluster0.dmbatnl.mongodb.net/?retryWrites=true&w=majority";

const frontEndUrl = "http://localhost:3000";

const connectDb = () => {
  return mongoose.connect(mongodbUrl);
};

module.exports = { connectDb, frontEndUrl };
