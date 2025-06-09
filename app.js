const { PORT = 3001 } = process.env;
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const itemRouter = require("./routes/clothingItems");
// const authorization = require("./middlewares/authorization");
const { NotFoundError } = require("./utils/errors");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use(
  (module.exports = (req, _res, next) => {
    req.user = { _id: "6844a627c9d7f248f2ad5057" };
    next();
  })
);
app.use("/users", userRouter);
app.use("/items", itemRouter);
app.use((_req, _res, next) => {
  next(new NotFoundError("Requested resource not found"));
});
app.use(require("./middlewares/errorMapper"));

app.use(require("./middlewares/errorHandler"));

app.listen(PORT, () => {});
