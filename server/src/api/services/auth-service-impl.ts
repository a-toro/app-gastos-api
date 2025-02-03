import bcryptjs from "bcryptjs";
import { AuthService } from "../types/auth-services";
import { CreateUserDto, CredentialsUserDto } from "../dto/user-dto";
import { User } from "../models/User";
import { EnvConfig } from "../../config/env";
import { AppError } from "../../error/AppError";
import { HttpCode } from "../../utils/HttpCode";
import prisma from "../../lib/prisma";

export class AuthServiceImpl implements AuthService {
  async register({
    password,
    email,
    name,
  }: CreateUserDto): Promise<Omit<User, "password">> {
    const hashPassword = await bcryptjs.hash(password, EnvConfig.saltRounds);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword,
        status: false,
      },
      select: {
        id: true,
        createAt: true,
        updateAt: true,
        name: true,
        email: true,
        status: true,
        password: false,
      },
    });

    return newUser;
  }

  async login(
    credentials: CredentialsUserDto
  ): Promise<Omit<User, "password">> {
    const { email, password } = credentials;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError({
        name: "LoginError",
        description: "Email o contraseña incorrectos",
        statusCode: HttpCode.BadRequest,
        isOperational: false,
      });
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError({
        name: "LoginError",
        description: "Email o contraseña incorrectos",
        statusCode: HttpCode.BadRequest,
        isOperational: false,
      });
    }

    //@ts-ignore
    delete user.password;

    return user;
  }
}
