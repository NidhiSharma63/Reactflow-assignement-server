import bcrypt from "bcrypt";
import User from "../schema/UserSchema.js";

// register user

const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // check if any field is missing or not
    if (!username.trim() || !password.trim()) {
      throw new Error("Missing Username or Password");
    }

    /**
     * check if user is already present to not
     */

    const isAlreadyPresentUser = await User.find({ username });
    if (isAlreadyPresentUser.username) {
      throw new Error("User is already exists");
    }

    // generate hash password with round 10
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashPassword,
    });

    // before saving the user create the toke
    await user.generateAuthToken();

    // create user
    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    if (
      error.message.includes("MongoServerError: E11000 duplicate key error") ||
      error.message.includes("User already exists")
    ) {
      error.message = "User already exists";
    }
    next(error);
  }
};

export { registerUser };
