require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const routes = require("./routes");
const { NotFoundError } = require("./utils/errors");
const errorMapper = require("./middlewares/errorMapper");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use((_req, _res, next) => {
  next(new NotFoundError("Requested resource not found"));
});
app.use(errorMapper);
app.use(errorHandler);
app.listen(PORT, () => {});
