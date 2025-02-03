import { NextFunction, Request, Response } from "express-serve-static-core";
import { CookiesNames } from "../../constants/cookies";
import prisma from "../../lib/prisma";
import { AppError } from "../../error/AppError";
import { AuthServiceImpl } from "../services/auth-service-impl";
import { CreateUserDto, CredentialsUserDto } from "../dto/user-dto";
import { HttpCode } from "../../utils/HttpCode";
import { createToken } from "../../utils/jsonwebtoken";
import { HandleResponse } from "../../network/response";
import { EnvConfig } from "../../config/env";
import { createUserSchema, loginSchema } from "../schemas/auth-schemas";

const autService = new AuthServiceImpl();

export async function createUser(
  req: Request<{}, {}, CreateUserDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const { success, error, data } = createUserSchema.safeParse(req.body);

    if (!success) {
      const errors = error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      res.status(HttpCode.BadRequest).json(
        new HandleResponse({
          errors,
          message: "Bad request",
          status: HttpCode.BadRequest,
        })
      );
      return;
    }

    const { email } = data;

    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (findUser) {
      throw new AppError({
        name: "UserAlreadyExists",
        description: "Usuario no disponible",
        statusCode: HttpCode.BadRequest,
        isOperational: false,
      });
    }

    // TODO: Validar los campos obligatorios.

    // Validate foreignkey to role
    // const role = await prisma.role.findUnique({
    //   where: {
    //     id: roleId,
    //   },
    // });

    // if (!role)
    //   throw new AppError({
    //     name: "ForeignKeyError",
    //     description: "Role id no existe",
    //     statusCode: HttpCode.BadRequest,
    //     isOperational: false,
    //   });

    const user = await autService.register(req.body);

    const token = createToken({ id: user.id, email: user.email });

    res
      .status(HttpCode.Created)
      .cookie(CookiesNames.AccessToken, token)
      .json(
        new HandleResponse({
          status: HttpCode.Created,
          message: "Usuario registrado",
          data: {
            user,
          },
        })
      );
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request<{}, {}, CredentialsUserDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const { success, error, data } = loginSchema.safeParse(req.body);

    if (!success) {
      const errors = error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      res.status(HttpCode.BadRequest).json(
        new HandleResponse({
          errors,
          message: "Bad request",
          status: HttpCode.BadRequest,
        })
      );
      return;
    }

    const user = await autService.login(data);

    const token = createToken({ id: user.id, email: user.email });

    res
      .cookie(CookiesNames.AccessToken, token, {
        httpOnly: true, // La cookie solo se puede acceder desde el servidor.
        secure: EnvConfig.enviroment === "production", // La cookie solo se puede acceder desde https.
        sameSite: "strict", // La cookie solo se puede acceder en el mismo dominio
        maxAge: 1000 * 60 * 60, // Tiempo de validez de la cookie 1h
      })
      .json(
        new HandleResponse({
          status: HttpCode.Ok,
          message: "Login exitoso",
          data: {
            user,
          },
        })
      );
  } catch (error) {
    next(error);
  }
}

export async function logout(_: Request, res: Response, next: NextFunction) {
  try {
    res
      .status(HttpCode.Ok)
      .clearCookie(CookiesNames.AccessToken)
      .json(
        new HandleResponse({
          data: null,
          message: "Logout exitoso",
          status: HttpCode.Ok,
        })
      );
  } catch (error) {
    next(error);
  }
}
