import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { Request, Response } from "express-serve-static-core";
import { corsOptions } from "./config/cors";
import { notFoundRoute } from "./middleware/not-found";
import { handleErrors } from "./middleware/handle-errors";
import { authRouter } from "./api/routes/auth-routes";

export const app = express();

// Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Cors
app.use(cors(corsOptions));

// Routes
app.use("/",authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello word!!!");
});

// Not found.
app.use(notFoundRoute);

// Handle error
app.use(handleErrors);
