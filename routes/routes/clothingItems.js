const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  addLike,
  deleteLike,
} = require("../../controllers/clothingItems");

router.get("/", getItems);
router.post("/", createItem);
router.delete("/:itemId", deleteItem);
router.put("/:itemId/likes", addLike);
router.delete("/:itemId/likes", deleteLike);

module.exports = router;
