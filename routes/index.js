const router = require("express").Router();
const userRouter = require("./routes/users");
const itemRouter = require("./routes/clothingItems");
const { createUser, login } = require("../controllers/users");

router.post("/signup", createUser);
router.post("/signin", login);
router.use("/users", userRouter);
router.use("/items", itemRouter);

module.exports = router;
