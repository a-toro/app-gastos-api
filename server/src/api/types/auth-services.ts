import { CreateUserDto, CredentialsUserDto } from "../dto/user-dto";

export interface AuthService {
  register(user: CreateUserDto): void;
  login(credentials: CredentialsUserDto): void;
}
