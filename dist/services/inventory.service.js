"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const sequelize_1 = require("sequelize");
const ServiceResponse_1 = require("./ServiceResponse");
const database_1 = require("../db/database");
class InventoryService {
    static getAllInventories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inventories = yield database_1.models.Inventory.findAll({
                    order: [["stocking_date", "DESC"]],
                });
                return ServiceResponse_1.ServiceResponse.success(inventories);
            }
            catch (error) {
                if (error instanceof sequelize_1.Error) {
                    return ServiceResponse_1.ServiceResponse.validationError(error.message);
                }
                return ServiceResponse_1.ServiceResponse.serverError(error);
            }
        });
    }
    static assignInventoryItem(inventoryId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const t = yield database_1.sequelize.transaction(); // Start transaction
            const { quantityToAssign, boarderId, employeeId } = params;
            try {
                // Fetch inventory by ID
                const inventory = yield database_1.models.Inventory.findByPk(inventoryId, {
                    transaction: t,
                });
                if (!inventory) {
                    yield t.rollback();
                    return ServiceResponse_1.ServiceResponse.notFound();
                }
                // Validate the quantity to assign
                if (quantityToAssign <= 0 || quantityToAssign > inventory.quantity) {
                    yield t.rollback();
                    return ServiceResponse_1.ServiceResponse.validationError("Invalid quantity to assign");
                }
                // Fetch associated expense to validate transaction type
                const expense = yield database_1.models.Expense.findByPk(inventory.expenseId, {
                    transaction: t,
                });
                if (!expense) {
                    yield t.rollback();
                    return ServiceResponse_1.ServiceResponse.validationError("Associated expense not found");
                }
                // Validate assignment logic
                if (boarderId && employeeId) {
                    yield t.rollback();
                    return ServiceResponse_1.ServiceResponse.validationError("Cannot assign to both a boarder and an employee simultaneously");
                }
                if (!boarderId && !employeeId) {
                    yield t.rollback();
                    return ServiceResponse_1.ServiceResponse.validationError("Either boarderId or employeeId must be provided");
                }
                if (boarderId && expense.transactionType !== "boarder_expense") {
                    yield t.rollback();
                    return ServiceResponse_1.ServiceResponse.validationError("Cannot assign a boarder expense to an employee");
                }
                if (employeeId && expense.transactionType !== "employee_expense") {
                    yield t.rollback();
                    return ServiceResponse_1.ServiceResponse.validationError("Cannot assign an employee expense to a boarder");
                }
                // Step 1: Deduct the quantity from the inventory
                inventory.quantity -= quantityToAssign;
                inventory.inUse = true;
                if (inventory.quantity === 0) {
                    // If quantity reaches zero, delete the inventory
                    yield inventory.destroy({ transaction: t });
                }
                else {
                    // Otherwise, update the inventory
                    yield inventory.save({ transaction: t });
                }
                // Step 2: Create a new expense record for the assignment
                const newExpense = yield database_1.models.Expense.create({
                    transactionDate: new Date(),
                    transactionType: expense.transactionType,
                    expenseNameId: expense.expenseNameId,
                    quantity: quantityToAssign,
                    description: expense.description,
                    totalAmount: 0, // As required
                    isAssignLater: false,
                    userUnitAmount: expense.userUnitAmount,
                    boarderId: boarderId,
                    employeeId: employeeId,
                    fromInventoryAssignment: true, // identifier
                    targetMonth: expense.targetMonth,
                    notes: expense.notes,
                }, { transaction: t });
                // Commit transaction
                yield t.commit();
                return ServiceResponse_1.ServiceResponse.successUpdated({
                    inventoryId: inventory.id,
                    newExpenseId: newExpense.id,
                });
            }
            catch (err) {
                // Rollback transaction on error
                yield t.rollback();
                if (err instanceof sequelize_1.Error) {
                    return ServiceResponse_1.ServiceResponse.validationError(err.message);
                }
                return ServiceResponse_1.ServiceResponse.serverError(err);
            }
        });
    }
}
exports.InventoryService = InventoryService;
