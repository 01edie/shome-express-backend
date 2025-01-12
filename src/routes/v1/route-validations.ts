import { body } from "express-validator";
import { validationsRegex } from "../../types/constants";
import moment from "moment";

// --------------------------- auth
const loginReqValidations = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username must be string")
    .isLength({ max: 25 })
    .withMessage("Username must not exceed 25 characters"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be string")
    .isLength({ max: 25 })
    .withMessage("Password must not exceed 25 characters"),
];

const refreshTokenReqValidations = [
  body("refreshTokenValue").notEmpty().withMessage("Refresh token is required"),
];

// --------------------------- list data
const listExpenseClass = [
  body("className")
    .notEmpty()
    .withMessage("Class name is required")
    .isString()
    .withMessage("Class name must be string")
    .isLength({ max: 50 })
    .withMessage("Class name must not exceed 50 characters"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be string")
    .isLength({ max: 250 })
    .withMessage("Description must not exceed 250 characters"),
];

const listExpenseName = [
  body("expenseName")
    .notEmpty()
    .withMessage("Expense name is required")
    .isString()
    .withMessage("Expense name must be string")
    .isLength({ max: 50 })
    .withMessage("Expense name must not exceed 50 characters"),
  body("expenseClassId")
    .notEmpty()
    .withMessage("Expense class id is required")
    .isNumeric()
    .withMessage("Expense class id must be numeric"),
  body("transactionType")
    .notEmpty()
    .withMessage("Transaction type is required")
    .isIn(["internal_expense", "boarder_expense", "employee_expense"])
    .withMessage("Invalid transaction type"),
  body("unit")
    .optional()
    .isString()
    .withMessage("Unit must be string")
    .isLength({ max: 10 })
    .withMessage("Unit must not exceed 10 characters"),
  body("isInventoryItem")
    .isBoolean()
    .withMessage("IsInventoryItem must be boolean"),
];


// exports ----------------

const authReq = {
  loginReqValidations,
  refreshTokenReqValidations,
};

const listReq = {
  listExpenseClass,
  listExpenseName,
};

export { authReq, listReq };
