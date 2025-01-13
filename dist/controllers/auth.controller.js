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
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.logoutUser = exports.loginUser = void 0;
const express_validator_1 = require("express-validator");
const auth_service_1 = require("../services/auth.service");
const ServiceResponse_1 = require("../services/ServiceResponse");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // basic validations
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const validationRes = ServiceResponse_1.ServiceResponse.validationError(errors.array()[0].msg);
        res.status(validationRes.statusCode).json(validationRes);
        return;
    }
    const serviceRes = yield auth_service_1.AuthServices.loginUser(req.body);
    if (serviceRes.data && serviceRes.success) {
        const accessToken = (_a = serviceRes.data) === null || _a === void 0 ? void 0 : _a.tokens.accessToken;
        const accessTokenExpiresIn = (_b = serviceRes.data) === null || _b === void 0 ? void 0 : _b.tokens.expiresIn;
        res.cookie("authToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: accessTokenExpiresIn * 1000,
        });
        res.status(serviceRes.statusCode).json((_c = serviceRes.data) === null || _c === void 0 ? void 0 : _c.user);
        return;
    }
    res.status(serviceRes.statusCode).json(serviceRes);
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("authToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    const serviceResponse = ServiceResponse_1.ServiceResponse.success("", "Logged out successfully");
    res.status(serviceResponse.statusCode).json(serviceResponse);
});
exports.logoutUser = logoutUser;
// not active
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // basic validations
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const validationRes = ServiceResponse_1.ServiceResponse.validationError(errors.array()[0].msg);
        res.status(validationRes.statusCode).json(validationRes);
        return;
    }
    const serviceRes = yield auth_service_1.AuthServices.refreshToken(req.body);
    res.status(serviceRes.statusCode).json(serviceRes);
});
exports.refreshToken = refreshToken;
