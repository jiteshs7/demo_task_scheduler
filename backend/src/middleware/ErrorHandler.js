const sendError = require("../utility/SendError");

const notFound = (req, res, next) => {
  let error = {};
  error.statusCode = 404;
  error.message = `NotFound: ${req?.originalUrl || ""}`;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  if (
    error._message === "User validation failed" ||
    error._message === "Task validation failed"
  ) {
    const message = Object.values(err.errors).map((val) => val.message);

    error = sendError(400, message[0]);
  } else {
    error = sendError(err.statusCode, err.message);
  }

  res.status(error.statusCode).json({
    success: false,
    data: { message: error.message },
  });
};

module.exports = {
  errorHandler,
  notFound,
};
