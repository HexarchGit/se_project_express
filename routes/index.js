const router = require("express").Router();
const rateLimit = require("express-rate-limit");
const { limiterConfig } = require("../utils/configs");
const {
  validateCreateUser,
  validateLogin,
} = require("../middlewares/validation");
const { createUser, login } = require("../controllers/users");
const userRouter = require("./routes/users");
const itemRouter = require("./routes/clothingItems");

const authLimiter = rateLimit({ ...limiterConfig, max: 5 });

router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
router.post("/signup", authLimiter, validateCreateUser, createUser);
router.post("/signin", authLimiter, validateLogin, login);
router.use("/users", userRouter);
router.use("/items", itemRouter);

module.exports = router;
