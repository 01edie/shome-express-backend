"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const expense_controller_1 = require("../../controllers/expense.controller");
const validateExpense = [
    // Validate transactionDate
    (0, express_validator_1.body)("transactionDate")
        .isISO8601()
        .withMessage("Transaction date must be a valid ISO8601 date.")
        .toDate(),
    // Validate transactionType
    (0, express_validator_1.body)("transactionType")
        .isIn(["boarder_expense", "employee_expense", "internal_expense"])
        .withMessage('Transaction type must be one of "boarder_expense", "employee_expense", or "internal_expense".'),
    // Validate expenseNameId
    (0, express_validator_1.body)("expenseNameId")
        .isInt({ gt: 0 })
        .withMessage("Expense Name ID must be a positive integer."),
    // Validate quantity
    (0, express_validator_1.body)("quantity")
        .isInt({ gt: 0 })
        .withMessage("Quantity must be a positive integer."),
    // Validate description (optional)
    (0, express_validator_1.body)("description")
        .optional()
        .isString()
        .withMessage("Description must be a string."),
    // Validate totalAmount
    (0, express_validator_1.body)("totalAmount")
        .isFloat({ gt: 0 })
        .withMessage("Total amount must be a positive number."),
    // Validate isAssignLater (optional)
    (0, express_validator_1.body)("isAssignLater")
        .optional()
        .isBoolean()
        .withMessage("isAssignLater must be a boolean.")
        .toBoolean(),
    // Validate userUnitAmount
    (0, express_validator_1.body)("userUnitAmount")
        .isFloat({ min: 0 })
        .withMessage("User unit amount must be a positive number."),
    // Validate boarderId (optional)
    (0, express_validator_1.body)("boarderId")
        .optional()
        .isInt({ gt: 0 })
        .withMessage("Boarder ID must be a positive integer."),
    // Validate employeeId (optional)
    (0, express_validator_1.body)("employeeId")
        .optional()
        .isInt({ gt: 0 })
        .withMessage("Employee ID must be a positive integer."),
    // Validate targetMonth (optional)
    (0, express_validator_1.body)("targetMonth")
        .optional()
        .isISO8601()
        .withMessage("Target month must be a valid ISO8601 date."),
    // Validate notes (optional)
    (0, express_validator_1.body)("notes").optional().isString().withMessage("Notes must be a string."),
    // Custom validation for boarderId and employeeId based on transactionType and isAssignLater
    (0, express_validator_1.body)().custom((value) => {
        const { transactionType, isAssignLater, boarderId, employeeId } = value;
        if (transactionType === "boarder_expense" &&
            isAssignLater === false &&
            !boarderId) {
            throw new Error('boarderId is required when transactionType is "boarder_expense" and isAssignLater is false.');
        }
        if (transactionType === "employee_expense" &&
            isAssignLater === false &&
            !employeeId) {
            throw new Error('employeeId is required when transactionType is "employee_expense" and isAssignLater is false.');
        }
        return true;
    }),
];
const expenseRouter = express_1.default.Router();
expenseRouter.get("/", expense_controller_1.getExpenses);
expenseRouter.get("/:id", expense_controller_1.getExpenseById);
expenseRouter.post("/", validateExpense, expense_controller_1.createExpense);
expenseRouter.put("/:id", validateExpense, expense_controller_1.updateExpense);
exports.default = expenseRouter;
