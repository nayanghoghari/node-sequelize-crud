const createError = require("http-errors");
const { ValidationError } = require("express-validation");

const { getErrorResponse } = require("../utils/response.util");
const { ApiError } = require("../utils/error.util");

function getErrorMessage(err) {
  const { params, body, query } = err.details;
  if (params?.length) return params[0].message;
  if (query?.length) return query[0].message;
  if (body?.length) return body[0].message;
}

const NotFoundHandler = (req, res, next) => {
  return next(createError.NotFound("Resource not found!"));
};

const MainErrorHandler = (err, req, res, next) => {
  let { status = 500 } = err;
  let message = err.message || "Something went wrong!";

  if (err instanceof ValidationError) {
    message = getErrorMessage(err);
    return res.status(400).json(getErrorResponse(400, message));
  } else if(err instanceof ApiError) {
    return res.status(err.statusCode).json(getErrorResponse(err.statusCode, err.message))
  } else {
    return res.status(status).json(getErrorResponse(status, message));
  }
};

module.exports = { NotFoundHandler, MainErrorHandler };
