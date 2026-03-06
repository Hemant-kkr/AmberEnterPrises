import AppError from "../utils/appError.js";
import { logger } from "../utils/logger.js";


const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];

  const readableField = field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());

  return {
    statusCode: 400,
    status: "fail",
    message: `${readableField} "${value}" already exists`,
    errors: {
      [field]: `${readableField} already in use`
    },
    isOperational: true
  };
};

const handleValidationError = (err) => {
  const formattedErrors = {};

  Object.values(err.errors).forEach((e) => {
    formattedErrors[e.path] = e.message;
  });

  return {
    statusCode: 400,
    status: "fail",
    message: "Validation failed",
    errors: formattedErrors,
    isOperational: true
  };
};

const handleCastError = (err) => {
  return new AppError(`Invalid ${err.path}`, 400);
};

const errorHandler = (err, req, res, next) => {

  logger.error("Unhandled Error", {
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip
  });

  let error = err;

  if (err.code === 11000) {
    error = handleDuplicateKeyError(err);
  }

  if (err.name === "ValidationError") {
    error = handleValidationError(err);
  }

  if (err.name === "CastError") {
    error = handleCastError(err);
  }

  if (error.isOperational) {
    return res.status(error.statusCode || 400).json({
      status: error.status || "fail",
      message: error.message,
      errors: error.errors || null
    });
  }

  return res.status(500).json({
    status: "error",
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : err.message
  });
};

export default errorHandler;