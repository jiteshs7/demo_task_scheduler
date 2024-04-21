const jwt = require("jsonwebtoken");

const User = require("../models/User");
const sendError = require("../utility/SendError");

const isAuth = async (req, res, next) => {
  const authrization = req.headers["access-token"];

  if (!authrization) return notAuthorized(next);
  if (authrization && authrization.startsWith("Bearer")) {
    try {
      const authToken = authrization.split(" ")[1];

      if (!authToken) return notAuthorized(next);

      const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);

      const user = await User.findById(decoded.id).select("-password");
      if (!user) return notAuthorized(next);
      req.user = user._id;
      return next();
    } catch (error) {
      if (error.name) notAuthorized(next);
      else next(sendError(500, "Somehing went wrong!"));
    }
  }
  next(sendError());
};

const notAuthorized = (next) => {
  return next(sendError(401, "User not authorized!"));
};

module.exports = isAuth;
