import express from "express";

import { listReq } from "./route-validations";
import {
  createBoarder,
  getBoarderById,
  getBoarders,
  updateBoarder,
} from "../../controllers/boarder.controller";
import { body } from "express-validator";

export const validateBoarderCreation = [
  // firstName: Required, must be a non-empty string with a max length of 50
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string")
    .isLength({ max: 50 })
    .withMessage("First name cannot exceed 50 characters"),

  // lastName: Required, must be a non-empty string with a max length of 50
  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name must be a string")
    .isLength({ max: 50 })
    .withMessage("Last name cannot exceed 50 characters"),

  // dob: Required, must be a valid ISO date string
  body("dob")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Date of birth must be a valid ISO date string"),

  // bloodGroup: Optional, must be a string with a max length of 5 if provided
  body("bloodGroup")
    .optional()
    .isString()
    .withMessage("Blood group must be a string")
    .isLength({ max: 5 })
    .withMessage("Blood group cannot exceed 5 characters"),

  // contactNumber: Required, must be exactly 10 digits
  body("contactNumber")
    .notEmpty()
    .withMessage("Contact number is required")
    .isString()
    .withMessage("Contact number must be a string")
    .matches(/^[0-9]{10}$/)
    .withMessage("Contact number must be exactly 10 digits"),

  // emergencyContact: Optional, must be exactly 10 digits if provided
  body("emergencyContact")
    .optional()
    .isString()
    .withMessage("Emergency contact must be a string")
    .matches(/^[0-9]{10}$/)
    .withMessage("Emergency contact must be exactly 10 digits"),

  // guardianName: Optional, must be a non-empty string if provided
  body("guardianName")
    .optional()
    .isString()
    .withMessage("Guardian name must be a string")
    .notEmpty()
    .withMessage("Guardian name cannot be empty"),

  // medicalCondition: Optional, must be a string if provided
  body("medicalCondition")
    .optional()
    .isString()
    .withMessage("Medical condition must be a string"),

  // specialNeeds: Optional, must be a string if provided
  body("specialNeeds")
    .optional()
    .isString()
    .withMessage("Special needs must be a string"),

  // allergies: Optional, must be a string if provided
  body("allergies")
    .optional()
    .isString()
    .withMessage("Allergies must be a string"),

  // notes: Optional, must be a string if provided
  body("notes").optional().isString().withMessage("Notes must be a string"),

  // active: Optional, must be a boolean if provided
  body("active")
    .optional()
    .isBoolean()
    .withMessage("Active status must be a boolean"),

  // roomNo: Optional, must be a positive integer with a max of 2 digits
  body("roomNo")
    .optional()
    .isInt({ gt: 0, lt: 100 })
    .withMessage(
      "Room number must be a positive integer with a maximum of 2 digits"
    ),

  // joiningDate: Optional, must be a valid ISO date string
  body("joiningDate")
    .optional()
    .isISO8601()
    .withMessage("Joining date must be a valid ISO date"),

  // leavingDate: Optional, must be a valid ISO date string if provided
  body("leavingDate")
    .optional()
    .isISO8601()
    .withMessage("Leaving date must be a valid ISO date"),
];

const boarderRouter = express.Router();

boarderRouter.get("/", getBoarders);
boarderRouter.get("/:id", getBoarderById);
boarderRouter.post("/", validateBoarderCreation, createBoarder);
boarderRouter.put("/:id", validateBoarderCreation, updateBoarder);

export default boarderRouter;
