const Item = require("../models/clothingItem");
const { NotFoundError, ForbiddenError } = require("../utils/errors");
const { CREATED } = require("../utils/responses");

module.exports.getItems = async (_req, res, next) => {
  try {
    const items = await Item.find({});
    res.send(items);
  } catch (error) {
    next(error);
  }
};

module.exports.createItem = async (req, res, next) => {
  try {
    const { name, weather, imageUrl } = req.body;
    const item = await Item.create({
      name,
      weather,
      imageUrl,
      owner: req.user._id,
    });
    res.status(CREATED).send(item);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.itemId).orFail(
      new NotFoundError("No item to delete")
    );
    if (item.owner.toString() !== req.user._id) throw new ForbiddenError();
    const deletedItem = await Item.findByIdAndDelete(req.params.itemId);
    // if (!deletedItem) throw new NotFoundError("No item to delete");
    res.send(deletedItem);
  } catch (error) {
    next(error);
  }
};

module.exports.addLike = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    if (!item) throw new NotFoundError("No item to like");
    res.send(item);
  } catch (error) {
    next(error);
  }
};
module.exports.deleteLike = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    if (!item) throw new NotFoundError("No item to dislike");
    res.send(item);
  } catch (error) {
    next(error);
  }
};
