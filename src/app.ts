import dotenv from "dotenv";
import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { routes } from "./routes";
import createConnection from "./database";
import { AppError } from "./errors/AppError";
import cors from "cors";
import path from "path";
import fileupload from "express-fileupload";

dotenv.config();

createConnection();
const app = express();

app.use(fileupload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);
app.use(routes);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({
    status: "Error",
    message: `Servidor interno error ${err.message}`,
  });
});

export { app };
