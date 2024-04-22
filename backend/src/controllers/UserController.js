const User = require("../models/User");
const generateToken = require("../utility/GenerateToken");
const sendError = require("../utility/SendError");

// Register user to the database
exports.signup = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      message: "User created!",
      data: {
        email: user.email,
        name: user.name,
        id: user._id,
        token,
      },
    });
  } catch (error) {
    console.log("signUp() Error", error);
    next(error);
  }
};

// Login user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(sendError(401, "Please enter valid credentials"));
    }

    let query;

    query = User.findOne({ email });

    const user = await query;

    if (!user) {
      return next(sendError(401, "Please provide valid credentials"));
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(sendError(401, "Please provide valid credentials"));
    }

    const token = generateToken(user._id, res, 200);

    res.status(201).json({
      success: true,
      message: "Login successfull!",
      data: {
        email: user.email,
        name: user.name,
        id: user._id,
        token: token,
      },
    });
  } catch (error) {
    console.log("login() Error", error);
    next(error);
  }
};
