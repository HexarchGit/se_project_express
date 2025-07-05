const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  addLike,
  deleteLike,
} = require("../../controllers/clothingItems");
const auth = require("../../middlewares/auth");
const {
  validateCreateItem,
  validateId,
} = require("../../middlewares/validation");

router.get("/", getItems);
router.post("/", auth, validateCreateItem, createItem);
router.delete("/:itemId", auth, validateId, deleteItem);
router.put("/:itemId/likes", auth, validateId, addLike);
router.delete("/:itemId/likes", auth, validateId, deleteLike);

module.exports = router;
