const jwt = require("jsonwebtoken");
const { AuthError } = require("../utils/errors");

const { JWT_SECRET = "Secret-For-Dev" } = process.env;

module.exports = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.match(/^Bearer\s/))
    throw new AuthError();
  const token = authorization.replace("Bearer ", "");
  const payload = jwt.verify(token, JWT_SECRET);
  req.user = payload;
  next();
};
