require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const { limiterConfig, corsConfig } = require("./utils/configs");
const routes = require("./routes");
const { NotFoundError } = require("./utils/errors");
const errorMapper = require("./middlewares/errorMapper");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3001 } = process.env;
const globalLimiter = rateLimit({ ...limiterConfig, max: 100 });

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(globalLimiter);
app.use(cors(corsConfig));
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitize());
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
