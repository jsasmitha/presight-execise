import { NextFunction, Request, Response } from "express";

import { HttpError } from "@models/error";
import { ApiError } from "@utils/errors";

// Middleware function to handle errors in the Express application.
// It checks if the error is an instance of ApiError and sends an appropriate response with the status code and message.
// If the error is not an ApiError, it sends a generic 500 Internal Server Error response.
export function errorHandler(
  err: HttpError,
  _req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (res.headersSent) {
    next(err);
    return;
  }

  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }
  res.status(500).json({ error: "Internal Server Error" });
}
