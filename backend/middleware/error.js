import ErrorHandler from "../utils/errorHandling.js";

const errorMiddleware = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(err.stack.red);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new ErrorHandler(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorHandler(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(value => value.message);
    error = new ErrorHandler(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token. Please login again';
    error = new ErrorHandler(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired. Please login again';
    error = new ErrorHandler(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Internal server error'
  });
};

export default errorMiddleware;