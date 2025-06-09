const Item = require("../models/clothingItem");
const { NotFoundError } = require("../utils/errors");
const { OK, CREATED } = require("../utils/responses");

module.exports.getItems = (_req, res, next) => {
  Item.find({})
    .orFail()
    .then((items) => res.status(OK).send(items))
    .catch((error) => {
      next(error);
    });
};

module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  Item.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(CREATED).send(item))
    .catch((error) => {
      next(error);
    });
};

module.exports.deleteItem = (req, res, next) => {
  Item.findByIdAndDelete(req.params.itemId)
    .then((item) => {
      if (!item) throw new NotFoundError("No item to delete");
      res.status(OK).send(item);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.addLike = (req, res, next) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) throw new NotFoundError("No item to like");
      res.status(OK).send(item);
    })
    .catch((error) => {
      next(error);
    });
};
module.exports.deleteLike = (req, res, next) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) throw new NotFoundError("No item to dislike");
      res.status(OK).send(item);
    })
    .catch((error) => {
      next(error);
    });
};
