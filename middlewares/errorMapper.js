const { BadRequestError, NotFoundError } = require("../utils/errors");

module.exports = (error, _req, _res, next) => {
  console.error(`[${new Date().toISOString()}]: ${error.stack}`);
  if (error.name === "ValidationError" || error.name === "CastError")
    return next(new BadRequestError());
  if (error.name === "DocumentNotFoundError") return next(new NotFoundError());
  return next(error);
};
