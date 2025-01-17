import { NextFunction, Request, Response } from "express";

export function errorHandler(error: Error, request: Request, response: Response, next: NextFunction) {
  if (error instanceof Error) {
     response.status(400).json({ message: error.message });
  }
   response.status(500).json({ message: "Internal server error" });
}
