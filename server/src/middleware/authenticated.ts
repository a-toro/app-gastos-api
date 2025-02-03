import { Request, Response, NextFunction } from "express-serve-static-core";
import { HttpCode } from "../utils/HttpCode";
import { AppError } from "../error/AppError";
import { verifyToken } from "../utils/jsonwebtoken";

export function authenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request?.cookies?.access_token;

  request.user = null;

  if (!token)
    return response.status(HttpCode.Unauthorized).json(
      new AppError({
        name: "Unauthorized",
        description: "Se requiere un token de acceso",
        statusCode: HttpCode.Unauthorized,
        isOperational: false,
      })
    );

  try {
    const data = verifyToken(token);

    // Validar fecha de expiración del token
    if (!data.exp)
      return response.status(HttpCode.Unauthorized).json(
        new AppError({
          name: "Unauthorized",
          description: "El token no tiene fecha de expiración",
          statusCode: HttpCode.Unauthorized,
          isOperational: false,
        })
      );

    const currentDate = new Date();
    const expirationDate = new Date(data?.exp * 1000);

    if (currentDate >= expirationDate)
      return response.status(HttpCode.Unauthorized).json(
        new AppError({
          name: "Unauthorized",
          description: "El token ha expirado",
          statusCode: HttpCode.Unauthorized,
          isOperational: false,
        })
      );

    request.user = data;
  } catch (error) {
    next(error);
  }

  next();
}
