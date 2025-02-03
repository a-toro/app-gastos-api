import { NextFunction, Request, Response } from "express-serve-static-core";
import { AppError } from "../error/AppError";
import { HttpCode } from "../utils/HttpCode";

export function notFoundRoute(req: Request, res: Response, next: NextFunction) {
  const path = req.url;

  // return next(
  //   new AppError({
  //     name: "Not found route",
  //     description: `Route ${path} not found`,
  //     statusCode: HttpCode.NotFound,
  //     isOperational: false,
  //   })
  // );
  const appError = new AppError({
    name: "Not found route",
    description: `Route ${path} not found`,
    statusCode: HttpCode.NotFound,
    isOperational: false,
  });
  res.status(appError.statusCode).json(appError);
}
