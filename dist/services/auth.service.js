"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const sequelize_1 = require("sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ServiceResponse_1 = require("./ServiceResponse");
const constants_1 = require("../types/constants");
// import logger from "./logger.service";
const access_control_1 = require("../config/access-control");
const database_1 = require("../db/database");
const JWT_A_SECRET = process.env.JWT_A_SECRET;
const JWT_R_SECRET = process.env.JWT_R_SECRET;
const { accessTokenExpiresIn, refreshTokenExpiresIn } = access_control_1.tokenConfig;
class AuthServices {
    static loginUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = params;
            const invalidCredError = ServiceResponse_1.ServiceResponse.validationError(constants_1.OPS_RES_MESSAGES.user_invalid, constants_1.HTTP_STATUS.UNAUTHENTICATED.code);
            try {
                // if user exists
                // console.log({ email, password });
                const user = yield database_1.models.AppUser.findOne({ where: { username } });
                if (!user) {
                    return invalidCredError;
                }
                // const isMatch = await bcrypt.compare(password, user.password);
                const isMatch = user.password === password;
                if (!isMatch) {
                    return invalidCredError;
                }
                const jwtPayload = {
                    id: user.id,
                    roleId: user.roleId,
                };
                const accessToken = jsonwebtoken_1.default.sign(jwtPayload, JWT_A_SECRET, {
                    expiresIn: accessTokenExpiresIn,
                });
                const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, JWT_R_SECRET, {
                    expiresIn: refreshTokenExpiresIn,
                });
                // logger.info(`User with id: ${user.username} logged in`);
                const resData = {
                    user: {
                        name: user.name,
                        roleId: user.roleId,
                    },
                    tokens: {
                        accessToken,
                        refreshToken,
                        expiresIn: accessTokenExpiresIn,
                        refreshExpiresIn: refreshTokenExpiresIn,
                    },
                };
                return ServiceResponse_1.ServiceResponse.success(resData);
            }
            catch (err) {
                if (err instanceof sequelize_1.Error) {
                    return ServiceResponse_1.ServiceResponse.validationError(err.message);
                }
                return ServiceResponse_1.ServiceResponse.serverError(err);
            }
        });
    }
    static refreshToken(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshTokenValue } = params;
                const jwtRes = jsonwebtoken_1.default.verify(refreshTokenValue, JWT_R_SECRET);
                const jwtPayload = {
                    id: jwtRes.id,
                    roleId: jwtRes.roleId,
                };
                const newAccessToken = jsonwebtoken_1.default.sign(jwtPayload, JWT_A_SECRET, {
                    expiresIn: accessTokenExpiresIn,
                });
                const newRefreshToken = jsonwebtoken_1.default.sign(jwtPayload, JWT_R_SECRET, {
                    expiresIn: refreshTokenExpiresIn,
                });
                const res = {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                    expiresIn: accessTokenExpiresIn,
                    refreshExpiresIn: refreshTokenExpiresIn,
                };
                return ServiceResponse_1.ServiceResponse.success({ tokens: res });
            }
            catch (err) {
                return ServiceResponse_1.ServiceResponse.validationError(constants_1.OPS_RES_MESSAGES.invalid_refresh_token, constants_1.HTTP_STATUS.UNAUTHENTICATED.code);
            }
        });
    }
}
exports.AuthServices = AuthServices;
