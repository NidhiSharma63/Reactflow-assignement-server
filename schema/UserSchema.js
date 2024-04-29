import jwt from "jsonwebtoken";
import mongoose from "mongoose";
// creating schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

// create a token
userSchema.methods.generateAuthToken = async function () {
  try {
    const genToken = jwt.sign({ id: this._id.toString() }, process.env.SECREAT_KEY);
    this.token = genToken;
    await this.save();
    return genToken;
  } catch (error) {
    throw new Error(error);
  }
};

// now we need to create collection
const User = new mongoose.model("User", userSchema);
export default User;
