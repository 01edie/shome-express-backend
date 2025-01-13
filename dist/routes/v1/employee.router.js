"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_controller_1 = require("../../controllers/employee.controller");
const express_validator_1 = require("express-validator");
const validateEmployeeCreation = [
    // firstName: Required, must be a non-empty string
    (0, express_validator_1.body)("firstName")
        .notEmpty()
        .withMessage("First name is required")
        .isString()
        .withMessage("First name must be a string")
        .isLength({ max: 50 })
        .withMessage("First name cannot exceed 50 characters"),
    // lastName: Required, must be a non-empty string
    (0, express_validator_1.body)("lastName")
        .notEmpty()
        .withMessage("Last name is required")
        .isString()
        .withMessage("Last name must be a string")
        .isLength({ max: 50 })
        .withMessage("Last name cannot exceed 50 characters"),
    // employeeRole: Optional, must be a non-empty string if provided
    (0, express_validator_1.body)("employeeRole")
        .optional()
        .isString()
        .withMessage("Employee role must be a string")
        .notEmpty()
        .withMessage("Employee role cannot be empty")
        .isLength({ max: 20 })
        .withMessage("Employee role cannot exceed 20 characters"),
    // salary: Required, must be a positive number
    (0, express_validator_1.body)("salary")
        .notEmpty()
        .withMessage("Salary is required")
        .isFloat({ gt: 0 })
        .withMessage("Salary must be a positive number"),
    // contactNumber: Optional, must be a valid phone number if provided
    (0, express_validator_1.body)("contactNumber")
        .optional()
        .isString()
        .withMessage("Contact number must be a string")
        .matches(/^[0-9]{10}$/)
        .withMessage("Contact number must be exactly 10 digits"),
    // notes: Optional, must be a string if provided
    (0, express_validator_1.body)("notes").optional().isString().withMessage("Notes must be a string"),
    // active: Optional, must be a boolean if provided
    (0, express_validator_1.body)("active")
        .optional()
        .isBoolean()
        .withMessage("Active status must be a boolean"),
    // joiningDate: Optional, must be a valid date if provided
    (0, express_validator_1.body)("joiningDate")
        .optional()
        .isISO8601()
        .withMessage("Joining date must be a valid date"),
    // leavingDate: Optional, must be a valid date if provided
    (0, express_validator_1.body)("leavingDate")
        .optional()
        .isISO8601()
        .withMessage("Leaving date must be a valid date"),
];
const employeeRouter = express_1.default.Router();
employeeRouter.get("/", employee_controller_1.getEmployees);
employeeRouter.get("/:id", employee_controller_1.getEmployeeById);
employeeRouter.post("/", validateEmployeeCreation, employee_controller_1.createEmployee);
employeeRouter.put("/:id", validateEmployeeCreation, employee_controller_1.updateEmployee);
exports.default = employeeRouter;
