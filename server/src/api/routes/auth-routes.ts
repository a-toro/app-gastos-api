import { Router } from "express";
import { createUser, login, logout } from "../controllers/auth-controller";

export const authRouter = Router();

authRouter.post("/register", createUser);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
