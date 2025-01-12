import express from "express";
import { body } from "express-validator";
import {
  createExpense,
  getExpenseById,
  getExpenses,
  updateExpense,
} from "../../controllers/expense.controller";

const validateExpense = [
  // Validate transactionDate
  body("transactionDate")
    .isISO8601()
    .withMessage("Transaction date must be a valid ISO8601 date.")
    .toDate(),

  // Validate transactionType
  body("transactionType")
    .isIn(["boarder_expense", "employee_expense", "internal_expense"])
    .withMessage(
      'Transaction type must be one of "boarder_expense", "employee_expense", or "internal_expense".'
    ),

  // Validate expenseNameId
  body("expenseNameId")
    .isInt({ gt: 0 })
    .withMessage("Expense Name ID must be a positive integer."),

  // Validate quantity
  body("quantity")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer."),

  // Validate description (optional)
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string."),

  // Validate totalAmount
  body("totalAmount")
    .isFloat({ gt: 0 })
    .withMessage("Total amount must be a positive number."),

  // Validate isAssignLater (optional)
  body("isAssignLater")
    .optional()
    .isBoolean()
    .withMessage("isAssignLater must be a boolean.")
    .toBoolean(),

  // Validate userUnitAmount
  body("userUnitAmount")
    .isFloat({ min:0})
    .withMessage("User unit amount must be a positive number."),

  // Validate boarderId (optional)
  body("boarderId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Boarder ID must be a positive integer."),

  // Validate employeeId (optional)
  body("employeeId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Employee ID must be a positive integer."),

  // Validate targetMonth (optional)
  body("targetMonth")
    .optional()
    .isISO8601()
    .withMessage("Target month must be a valid ISO8601 date."),

  // Validate notes (optional)
  body("notes").optional().isString().withMessage("Notes must be a string."),


  // Custom validation for boarderId and employeeId based on transactionType and isAssignLater
  body().custom((value) => {
    const { transactionType, isAssignLater, boarderId, employeeId } = value;

    if (
      transactionType === "boarder_expense" &&
      isAssignLater === false &&
      !boarderId
    ) {
      throw new Error(
        'boarderId is required when transactionType is "boarder_expense" and isAssignLater is false.'
      );
    }

    if (
      transactionType === "employee_expense" &&
      isAssignLater === false &&
      !employeeId
    ) {
      throw new Error(
        'employeeId is required when transactionType is "employee_expense" and isAssignLater is false.'
      );
    }

    return true;
  }),
];

const expenseRouter = express.Router();

expenseRouter.get("/", getExpenses);
expenseRouter.get("/:id", getExpenseById);
expenseRouter.post("/", validateExpense, createExpense);
expenseRouter.put("/:id", validateExpense, updateExpense);

export default expenseRouter;
