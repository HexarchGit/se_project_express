const { AppError } = require("../utils/errors");

module.exports = (error, _req, res, _next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).send({ message: error.message });
  }
  return res.status(500).send({ message: "Internal server error" });
};
