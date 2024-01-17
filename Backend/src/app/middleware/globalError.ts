import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorSource } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/ZodError";
import handleMongooseErrors from "../errors/handleMongooseValidateErrors";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/duplicateError";
import AppError from "../errors/AppError";

const globalErrorhandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err?.statusCode || 400;
  let message = err.message || "Something went wrong";

  let errorSource: TErrorSource = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simliFiedError = handleZodError(err);
    statusCode = 400;
    // message = "Ami Zod Error";
    statusCode = simliFiedError?.statusCode;
    message = simliFiedError?.message;
    errorSource = simliFiedError?.errorSources;
  } else if (err?.name === "ValidationError") {
    const simliFiedError = handleMongooseErrors(err);
    statusCode = simliFiedError.statusCode;
    message = simliFiedError.message;
    errorSource = simliFiedError?.errorSources;
  } else if (err?.name === "CastError") {
    const simliFiedError = handleCastError(err);
    statusCode = simliFiedError.statusCode;
    message = simliFiedError.message;
    errorSource = simliFiedError.errorSources;
  } else if (err?.code === 11000) {
    const simliFiedError = handleDuplicateError(err);
    statusCode = simliFiedError.statusCode;
    message = simliFiedError.message;
    errorSource = simliFiedError.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSource = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSource = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    // err,
    errorSource,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};
export default globalErrorhandler;
