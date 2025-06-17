const router = require("express").Router();
const userRouter = require("./routes/users");
const itemRouter = require("./routes/clothingItems");
const { createUser, login } = require("../controllers/users");
const { NotFoundError } = require("../utils/errors");

router.post("/signup", createUser);
router.post("/signin", login);
router.use("/users", userRouter);
router.use("/items", itemRouter);
router.use((_req, _res, next) => {
  next(new NotFoundError("Requested resource not found"));
});
router.use(require("../middlewares/errorMapper"));

router.use(require("../middlewares/errorHandler"));

module.exports = router;
