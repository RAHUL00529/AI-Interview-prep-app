const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONDO_URI, {});
    console.log("MongoDb connected");
  } catch (err) {
    console.error("Error connecting MongoDb", err);
    process.exit(1);
  }
};

module.exports = connectDB;
