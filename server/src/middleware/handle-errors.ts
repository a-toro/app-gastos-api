import { NextFunction, Request, Response } from "express-serve-static-core";
import { AppError } from "../error/AppError";
import { HttpCode } from "../utils/HttpCode";

export function handleErrors(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let appError = new AppError({
    name: "Service not available",
    description: "Internal server error",
    statusCode: HttpCode.InternalServerError,
    isOperational: false,
  });

  if (error instanceof AppError) {
    appError = new AppError({
      name: error.name,
      statusCode: error.statusCode,
      description: error?.message,
      isOperational: error.isOperational,
    });
  } else {
    appError = new AppError({
      name: error?.name ?? "Service not available",
      description: error?.message ?? "Internal server error",
      statusCode: HttpCode.InternalServerError,
      isOperational: false,
    });
  }

  res.status(appError.statusCode).json(appError);
}
