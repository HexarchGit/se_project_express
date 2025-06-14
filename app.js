require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const { NotFoundError } = require("./utils/errors");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(cors());
app.use(express.json());
app.use(routes);
app.use((_req, _res, next) => {
  next(new NotFoundError("Requested resource not found"));
});
app.use(require("./middlewares/errorMapper"));

app.use(require("./middlewares/errorHandler"));

app.listen(PORT, () => {});
