"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const inventory_controller_1 = require("../../controllers/inventory.controller");
const validateInventoryAssignment = [
    // Validate quantityToAssign
    (0, express_validator_1.body)('quantityToAssign')
        .isInt({ gt: 0 })
        .withMessage('Quantity to assign must be a positive integer.'),
    // Validate boarderId (optional)
    (0, express_validator_1.body)('boarderId')
        .optional()
        .isInt({ gt: 0 })
        .withMessage('Boarder ID must be a positive integer.'),
    // Validate employeeId (optional)
    (0, express_validator_1.body)('employeeId')
        .optional()
        .isInt({ gt: 0 })
        .withMessage('Employee ID must be a positive integer.'),
    // Custom validation: Either boarderId or employeeId must be provided, but not both
    (0, express_validator_1.body)()
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
const inventoryRouter = express_1.default.Router();
inventoryRouter.get("/", inventory_controller_1.getAllInventories);
inventoryRouter.put("/:id", validateInventoryAssignment, inventory_controller_1.assignInventoryItem);
exports.default = inventoryRouter;
