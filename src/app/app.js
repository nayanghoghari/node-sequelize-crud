const express = require("express");
const morgan = require("morgan");

const { IndexRouter } = require("../routes/index.route");
const { APP_CONFIG } = require("../config");
const {
  NotFoundHandler,
  MainErrorHandler,
} = require("../middlewares/error.middleware");
require("../middlewares/passport.config");

const app = express();
const logFormat = APP_CONFIG.isDev ? "dev" : "combined";

/* Middlware Stack */
app.use(express.json());
app.use(morgan(logFormat));

/* Initialize Routes */
app.use(IndexRouter);

/* Initailize Error Handlers */
app.use(NotFoundHandler);
app.use(MainErrorHandler);

exports.app = app;
