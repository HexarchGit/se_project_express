const limiterConfig = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, try again later.",
};
module.exports = { limiterConfig };
