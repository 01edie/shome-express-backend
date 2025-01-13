"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBoarderCreation = void 0;
const express_1 = __importDefault(require("express"));
const boarder_controller_1 = require("../../controllers/boarder.controller");
const express_validator_1 = require("express-validator");
exports.validateBoarderCreation = [
    // firstName: Required, must be a non-empty string with a max length of 50
    (0, express_validator_1.body)("firstName")
        .notEmpty()
        .withMessage("First name is required")
        .isString()
        .withMessage("First name must be a string")
        .isLength({ max: 50 })
        .withMessage("First name cannot exceed 50 characters"),
    // lastName: Required, must be a non-empty string with a max length of 50
    (0, express_validator_1.body)("lastName")
        .notEmpty()
        .withMessage("Last name is required")
        .isString()
        .withMessage("Last name must be a string")
        .isLength({ max: 50 })
        .withMessage("Last name cannot exceed 50 characters"),
    // dob: Required, must be a valid ISO date string
    (0, express_validator_1.body)("dob")
        .notEmpty()
        .withMessage("Date of birth is required")
        .isISO8601()
        .withMessage("Date of birth must be a valid ISO date string"),
    // bloodGroup: Optional, must be a string with a max length of 5 if provided
    (0, express_validator_1.body)("bloodGroup")
        .optional()
        .isString()
        .withMessage("Blood group must be a string")
        .isLength({ max: 5 })
        .withMessage("Blood group cannot exceed 5 characters"),
    // contactNumber: Required, must be exactly 10 digits
    (0, express_validator_1.body)("contactNumber")
        .notEmpty()
        .withMessage("Contact number is required")
        .isString()
        .withMessage("Contact number must be a string")
        .matches(/^[0-9]{10}$/)
        .withMessage("Contact number must be exactly 10 digits"),
    // emergencyContact: Optional, must be exactly 10 digits if provided
    (0, express_validator_1.body)("emergencyContact")
        .optional()
        .isString()
        .withMessage("Emergency contact must be a string")
        .matches(/^[0-9]{10}$/)
        .withMessage("Emergency contact must be exactly 10 digits"),
    // guardianName: Optional, must be a non-empty string if provided
    (0, express_validator_1.body)("guardianName")
        .optional()
        .isString()
        .withMessage("Guardian name must be a string")
        .notEmpty()
        .withMessage("Guardian name cannot be empty"),
    // medicalCondition: Optional, must be a string if provided
    (0, express_validator_1.body)("medicalCondition")
        .optional()
        .isString()
        .withMessage("Medical condition must be a string"),
    // specialNeeds: Optional, must be a string if provided
    (0, express_validator_1.body)("specialNeeds")
        .optional()
        .isString()
        .withMessage("Special needs must be a string"),
    // allergies: Optional, must be a string if provided
    (0, express_validator_1.body)("allergies")
        .optional()
        .isString()
        .withMessage("Allergies must be a string"),
    // notes: Optional, must be a string if provided
    (0, express_validator_1.body)("notes").optional().isString().withMessage("Notes must be a string"),
    // active: Optional, must be a boolean if provided
    (0, express_validator_1.body)("active")
        .optional()
        .isBoolean()
        .withMessage("Active status must be a boolean"),
    // roomNo: Optional, must be a positive integer with a max of 2 digits
    (0, express_validator_1.body)("roomNo")
        .optional()
        .isInt({ gt: 0, lt: 100 })
        .withMessage("Room number must be a positive integer with a maximum of 2 digits"),
    // joiningDate: Optional, must be a valid ISO date string
    (0, express_validator_1.body)("joiningDate")
        .optional()
        .isISO8601()
        .withMessage("Joining date must be a valid ISO date"),
    // leavingDate: Optional, must be a valid ISO date string if provided
    (0, express_validator_1.body)("leavingDate")
        .optional()
        .isISO8601()
        .withMessage("Leaving date must be a valid ISO date"),
];
const boarderRouter = express_1.default.Router();
boarderRouter.get("/", boarder_controller_1.getBoarders);
boarderRouter.get("/:id", boarder_controller_1.getBoarderById);
boarderRouter.post("/", exports.validateBoarderCreation, boarder_controller_1.createBoarder);
boarderRouter.put("/:id", exports.validateBoarderCreation, boarder_controller_1.updateBoarder);
exports.default = boarderRouter;
