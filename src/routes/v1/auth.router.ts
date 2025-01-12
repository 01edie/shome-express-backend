import express from "express";
import {
  loginUser,
  logoutUser,
  refreshToken,
} from "../../controllers/auth.controller";
import { authReq } from "./route-validations";

const authRouter = express.Router();

authRouter.post("/login", authReq.loginReqValidations, loginUser);
authRouter.get("/logout", logoutUser);

// authRouter.post(
//   "/refresh-token",
//   authReq.refreshTokenReqValidations,
//   refreshToken
// );

export default authRouter;
