const User = require("../models/user");
const { OK, CREATED } = require("../utils/responses");

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.status(OK).send(user))
    .catch((error) => {
      next(error);
    });
};
module.exports.getUsers = (_req, res, next) => {
  User.find({})
    .orFail()
    .then((user) => res.status(OK).send(user))
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
