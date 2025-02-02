import jwt from "jsonwebtoken";
import { EnvConfig } from "../config/env";
import { JwtPayload } from "../types/JwtPayload";

export function createToken({ ...payload }: Omit<JwtPayload, "iat" | "exp">) {
  const token = jwt.sign(payload, EnvConfig.jwtSecretKey, {
    expiresIn: "1h",
  });

  return token;
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, EnvConfig.jwtSecretKey) as JwtPayload;
}
