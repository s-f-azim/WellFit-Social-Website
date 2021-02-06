import ErrorResponse from "../utils/errorResponse.js";

//custom error handlers to write custom messages and status
const errorHandler = (err, req, res, next) => {
  const error = { ...err };
  error.message = err.message;

  //Mongoose wrong objectId format
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorResponse(message, 400);
  }
  //Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((er) => er.message);
    error = new ErrorResponse(message, 400);
  }
  res
    .status(error.statusCode || 500)
    .send({ success: false, error: error.message || "Server Error" });
};

export default errorHandler;
