import express from "express";

import { listReq } from "./route-validations";
import {
  createEmployee,
  getEmployeeById,
  getEmployees,
  updateEmployee,
} from "../../controllers/employee.controller";
import { body } from "express-validator";

const validateEmployeeCreation = [
  // firstName: Required, must be a non-empty string
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string")
    .isLength({ max: 50 })
    .withMessage("First name cannot exceed 50 characters"),
  // lastName: Required, must be a non-empty string
  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name must be a string")
    .isLength({ max: 50 })
    .withMessage("Last name cannot exceed 50 characters"),
  // employeeRole: Optional, must be a non-empty string if provided
  body("employeeRole")
    .optional()
    .isString()
    .withMessage("Employee role must be a string")
    .notEmpty()
    .withMessage("Employee role cannot be empty")
    .isLength({ max: 50 })
    .withMessage("Employee role cannot exceed 50 characters"),

  // salary: Required, must be a positive number
  body("salary")
    .notEmpty()
    .withMessage("Salary is required")
    .isFloat({ gt: 0 })
    .withMessage("Salary must be a positive number"),

  // contactNumber: Optional, must be a valid phone number if provided
  body("contactNumber")
    .optional()
    .isString()
    .withMessage("Contact number must be a string")
    .matches(/^[0-9]{10}$/)
    .withMessage("Contact number must be exactly 10 digits"),

  // notes: Optional, must be a string if provided
  body("notes").optional().isString().withMessage("Notes must be a string"),

  // active: Optional, must be a boolean if provided
  body("active")
    .optional()
    .isBoolean()
    .withMessage("Active status must be a boolean"),

  // joiningDate: Optional, must be a valid date if provided
  body("joiningDate")
    .optional()
    .isISO8601()
    .withMessage("Joining date must be a valid date"),

  // leavingDate: Optional, must be a valid date if provided
  body("leavingDate")
    .optional({ values: "null" })
    .isISO8601()
    .withMessage("Leaving date must be a valid date"),
];

const employeeRouter = express.Router();

employeeRouter.get("/", getEmployees);
employeeRouter.get("/:id", getEmployeeById);
employeeRouter.post("/", validateEmployeeCreation, createEmployee);
employeeRouter.put("/:id", validateEmployeeCreation, updateEmployee);

export default employeeRouter;
