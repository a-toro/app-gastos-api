import { User } from "@prisma/client";

export interface CreateUserDto
  extends Omit<User, "id" | "createAt" | "updateAt"> {}

// Pick solo para seleccionar ciertas propiedades.
export interface CredentialsUserDto extends Pick<User, "email" | "password"> {}
