"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../../controllers/auth.controller");
const route_validations_1 = require("./route-validations");
const authRouter = express_1.default.Router();
authRouter.post("/login", route_validations_1.authReq.loginReqValidations, auth_controller_1.loginUser);
authRouter.get("/logout", auth_controller_1.logoutUser);
// authRouter.post(
//   "/refresh-token",
//   authReq.refreshTokenReqValidations,
//   refreshToken
// );
exports.default = authRouter;
