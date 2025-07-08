require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const routes = require("./routes");
const { NotFoundError } = require("./utils/errors");
const errorMapper = require("./middlewares/errorMapper");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const limiterConfig = require("./utils/limiterConfig");

const app = express();
const { PORT = 3001, CORS_ORIGIN = "http://localhost:3000" } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(rateLimit(limiterConfig));
app.use(helmet());
app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
app.use(xss());
app.use(mongoSanitize());
app.use(hpp());
app.use(express.json());
app.use(requestLogger);
app.use(routes);
app.use((_req, _res, next) => {
  next(new NotFoundError("Requested resource not found"));
});
app.use(errorLogger);
app.use(errors());
app.use(errorMapper);
app.use(errorHandler);
app.listen(PORT, () => {});
