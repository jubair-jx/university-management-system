import { NextFunction, Request, Response } from "express";

const globalErrorhandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 400;
  const message = err.message || "Something went wrong";
  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};
export default globalErrorhandler;
