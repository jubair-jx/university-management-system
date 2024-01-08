import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import catchAsync from "../../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/User/user.interface";
const auth = (...requireRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    //get check the authorized person
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized ");
    }

    //now we will check the  verify token
    jwt.verify(token, config.jwt_token as string, function (err, decoded) {
      if (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized ");
      }

      const role = (decoded as JwtPayload).role;

      if (requireRoles && !requireRoles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized ");
      }

      req.user = decoded as JwtPayload;
      next();
    });
  });
};
export default auth;
