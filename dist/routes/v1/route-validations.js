"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listReq = exports.authReq = void 0;
const express_validator_1 = require("express-validator");
// --------------------------- auth
const loginReqValidations = [
    (0, express_validator_1.body)("username")
        .notEmpty()
        .withMessage("Username is required")
        .isString()
        .withMessage("Username must be string")
        .isLength({ max: 25 })
        .withMessage("Username must not exceed 25 characters"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Password is required")
        .isString()
        .withMessage("Password must be string")
        .isLength({ max: 25 })
        .withMessage("Password must not exceed 25 characters"),
];
const refreshTokenReqValidations = [
    (0, express_validator_1.body)("refreshTokenValue").notEmpty().withMessage("Refresh token is required"),
];
// --------------------------- list data
const listExpenseClass = [
    (0, express_validator_1.body)("className")
        .notEmpty()
        .withMessage("Class name is required")
        .isString()
        .withMessage("Class name must be string")
        .isLength({ max: 50 })
        .withMessage("Class name must not exceed 50 characters"),
    (0, express_validator_1.body)("description")
        .notEmpty()
        .withMessage("Description is required")
        .isString()
        .withMessage("Description must be string")
        .isLength({ max: 250 })
        .withMessage("Description must not exceed 250 characters"),
];
const listExpenseName = [
    (0, express_validator_1.body)("expenseName")
        .notEmpty()
        .withMessage("Expense name is required")
        .isString()
        .withMessage("Expense name must be string")
        .isLength({ max: 50 })
        .withMessage("Expense name must not exceed 50 characters"),
    (0, express_validator_1.body)("expenseClassId")
        .notEmpty()
        .withMessage("Expense class id is required")
        .isNumeric()
        .withMessage("Expense class id must be numeric"),
    (0, express_validator_1.body)("transactionType")
        .notEmpty()
        .withMessage("Transaction type is required")
        .isIn(["internal_expense", "boarder_expense", "employee_expense"])
        .withMessage("Invalid transaction type"),
    (0, express_validator_1.body)("unit")
        .optional()
        .isString()
        .withMessage("Unit must be string")
        .isLength({ max: 10 })
        .withMessage("Unit must not exceed 10 characters"),
    (0, express_validator_1.body)("isInventoryItem")
        .isBoolean()
        .withMessage("IsInventoryItem must be boolean"),
];
// exports ----------------
const authReq = {
    loginReqValidations,
    refreshTokenReqValidations,
};
exports.authReq = authReq;
const listReq = {
    listExpenseClass,
    listExpenseName,
};
exports.listReq = listReq;
