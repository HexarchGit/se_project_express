const router = require("express").Router();
const userRouter = require("./routes/users");
const itemRouter = require("./routes/clothingItems");
const { createUser, login } = require("../controllers/users");
const {
  validateCreateUser,
  validateLogin,
} = require("../middlewares/validation");

router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
router.post("/signup", validateCreateUser, createUser);
router.post("/signin", validateLogin, login);
router.use("/users", userRouter);
router.use("/items", itemRouter);

module.exports = router;
