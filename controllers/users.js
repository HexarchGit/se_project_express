const User = require("../models/user");
const { CREATED } = require("../utils/responses");

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => {
      next(error);
    });
};
module.exports.getUsers = (_req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((error) => {
      next(error);
    });
};
module.exports.createUser = (req, res, next) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(CREATED).send(user))
    .catch((error) => {
      next(error);
    });
};
