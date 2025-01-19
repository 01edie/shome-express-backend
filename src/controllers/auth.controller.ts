import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { AuthServices } from "../services/auth.service";
import { LoginParams, RefreshTokenParams } from "../types/request-params";
import { ServiceResponse } from "../services/ServiceResponse";
import { HTTP_STATUS } from "../types/constants";

export const loginUser = async (
  req: Request<{}, {}, LoginParams>,
  res: Response
): Promise<void> => {
  // basic validations
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationRes = ServiceResponse.validationError(
      errors.array()[0].msg
    );
    res.status(validationRes.statusCode).json(validationRes);
    return;
  }
  const serviceRes = await AuthServices.loginUser(req.body);
  if (serviceRes.data && serviceRes.success) {
    const accessToken = serviceRes.data?.tokens.accessToken;
    const expiresIn = serviceRes.data?.tokens.expiresIn * 1000;

    res.cookie("authToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: expiresIn,
    });
    res
      .status(serviceRes.statusCode)
      .json({ ...serviceRes.data?.user, expiresIn: Date.now() + expiresIn });
    return;
  }

  res.status(serviceRes.statusCode).json(serviceRes);
};

export const logoutUser = async (
  req: Request<{}, {}, {}>,
  res: Response
): Promise<void> => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  const serviceResponse = ServiceResponse.success(
    "",
    "Logged out successfully"
  );
  res.status(serviceResponse.statusCode).json(serviceResponse);
};

// not active
export const refreshToken = async (
  req: Request<{}, {}, RefreshTokenParams>,
  res: Response
): Promise<void> => {
  // basic validations
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationRes = ServiceResponse.validationError(
      errors.array()[0].msg
    );
    res.status(validationRes.statusCode).json(validationRes);
    return;
  }
  const serviceRes = await AuthServices.refreshToken(req.body);
  res.status(serviceRes.statusCode).json(serviceRes);
};
