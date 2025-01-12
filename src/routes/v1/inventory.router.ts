import express from "express";
import { body } from "express-validator";

import {
  assignInventoryItem,
  getAllInventories,
} from "../../controllers/inventory.controller";

const validateInventoryAssignment = [
  // Validate quantityToAssign
  body('quantityToAssign')
    .isInt({ gt: 0 })
    .withMessage('Quantity to assign must be a positive integer.'),

  // Validate boarderId (optional)
  body('boarderId')
    .optional()
    .isInt({ gt: 0 })
    .withMessage('Boarder ID must be a positive integer.'),

  // Validate employeeId (optional)
  body('employeeId')
    .optional()
    .isInt({ gt: 0 })
    .withMessage('Employee ID must be a positive integer.'),

  // Custom validation: Either boarderId or employeeId must be provided, but not both
  body()
    .custom((value) => {
      const { boarderId, employeeId } = value;

      if (!boarderId && !employeeId) {
        throw new Error('Either boarderId or employeeId must be provided.');
      }

      if (boarderId && employeeId) {
        throw new Error('Cannot assign to both boarderId and employeeId simultaneously.');
      }

      return true;
    }),
];

const inventoryRouter = express.Router();

inventoryRouter.get("/", getAllInventories);
inventoryRouter.put("/:id", validateInventoryAssignment, assignInventoryItem);

export default inventoryRouter;
