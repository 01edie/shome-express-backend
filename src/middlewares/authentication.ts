import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HTTP_STATUS } from "../types/constants";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.authToken; // Get the token from cookies

  if (!token) {
    res
      .status(HTTP_STATUS.UNAUTHENTICATED.code)
      .json({ message: HTTP_STATUS.UNAUTHENTICATED.message });
    return;
  }

  jwt.verify(
    token,
    process.env.JWT_A_SECRET as string,
    (err: any, user: any) => {
      if (err) {
        res
          .status(HTTP_STATUS.UNAUTHENTICATED.code)
          .json({ message: "Invalid token or expired" });
        return;
      }

      req.user = user;
      next();
    }
  );
};
