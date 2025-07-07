const router = require("express").Router();
const rateLimit = require("express-rate-limit");
const userRouter = require("./routes/users");
const itemRouter = require("./routes/clothingItems");
const { createUser, login } = require("../controllers/users");
const {
  validateCreateUser,
  validateLogin,
} = require("../middlewares/validation");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, try again later.",
});

router.get("/crash-test", () => {
  setTimeout(() => {
    next(new Error("Server will crash now"));
  }, 0);
});
router.post("/signup", authLimiter, validateCreateUser, createUser);
router.post("/signin", authLimiter, validateLogin, login);
router.use("/users", userRouter);
router.use("/items", itemRouter);

module.exports = router;
