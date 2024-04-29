import mongoose from "mongoose";

const connectDB = async (uri) => {
  return mongoose.connect(uri, {});
};

// module.exports = connectDB;

export default connectDB;
