"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../types/constants");
const authenticateToken = (req, res, next) => {
    const token = req.cookies.authToken; // Get the token from cookies
    if (!token) {
        res
            .status(constants_1.HTTP_STATUS.UNAUTHENTICATED.code)
            .json({ message: constants_1.HTTP_STATUS.UNAUTHENTICATED.message });
        return;
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_A_SECRET, (err, user) => {
        if (err) {
            res
                .status(constants_1.HTTP_STATUS.UNAUTHENTICATED.code)
                .json({ message: "Invalid token or expired" });
            return;
        }
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
