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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseService = void 0;
const sequelize_1 = require("sequelize");
const ServiceResponse_1 = require("./ServiceResponse");
const database_1 = require("../db/database");
const moment_1 = __importDefault(require("moment"));
class ExpenseService {
    static createExpenseWithInventory(expenseData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Start the transaction
            const t = yield database_1.sequelize.transaction();
            try {
                // Step 1: Create the Expense
                const expense = yield database_1.models.Expense.create(expenseData, {
                    transaction: t,
                });
                let inventoryId = 0;
                // Step 2: Check if 'is_assign_later' is true and 'transaction_type' is 'boarder_expense' or 'employee_expense'
                if (expense.transactionType === "boarder_expense" ||
                    expense.transactionType === "employee_expense") {
                    if (expense.isAssignLater) {
                        // Step 3: Create the Inventory
                        const expenseItem = yield expense.getExpenseName();
                        const inventoryData = {
                            itemName: expenseItem.expenseName,
                            unit: expenseItem.unit,
                            quantity: expense.quantity,
                            costPerUnit: expense.userUnitAmount,
                            description: expense.description,
                            expenseId: expense.id,
                            stockingDate: (0, moment_1.default)().format("YYYY-MM-DD"),
                        };
                        const inventory = yield database_1.models.Inventory.create(inventoryData, {
                            transaction: t,
                        });
                        inventoryId = inventory.id;
                    }
                }
                // Step 5: Commit the transaction
                yield t.commit();
                return ServiceResponse_1.ServiceResponse.successCreated({
                    expenseId: expense.id,
                    inventoryId,
                });
            }
            catch (err) {
                // Step 6: Rollback the transaction in case of error
                yield t.rollback();
                if (err instanceof sequelize_1.Error) {
                    return ServiceResponse_1.ServiceResponse.validationError(err.message);
                }
                return ServiceResponse_1.ServiceResponse.serverError(err);
            }
        });
    }
    // Get all Expenses (// !inventoryAssignment)
    static getAllExpenses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expenses = yield database_1.models.Expense.findAll({
                    where: {
                        fromInventoryAssignment: false,
                    },
                    include: [
                        {
                            model: database_1.models.ExpenseName,
                            as: "expenseName",
                            attributes: ["expenseName", "unit", "expenseClassId"],
                            include: [
                                {
                                    model: database_1.models.ExpenseClass,
                                    as: "expenseClass",
                                    attributes: ["className"],
                                },
                            ],
                        },
                        {
                            model: database_1.models.Boarder,
                            as: "boarder",
                            attributes: ["firstName", "lastName"],
                        },
                        {
                            model: database_1.models.Employee,
                            as: "employee",
                            attributes: ["firstName", "lastName"],
                        },
                    ],
                    order: [['transaction_date', 'DESC']]
                });
                return ServiceResponse_1.ServiceResponse.success(expenses);
            }
            catch (err) {
                if (err instanceof sequelize_1.Error) {
                    return ServiceResponse_1.ServiceResponse.validationError(err.message);
                }
                return ServiceResponse_1.ServiceResponse.serverError(err);
            }
        });
    }
    // Get Expense by ID
    static getExpenseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expense = yield database_1.models.Expense.findByPk(id);
                if (!expense) {
                    return ServiceResponse_1.ServiceResponse.notFound();
                }
                return ServiceResponse_1.ServiceResponse.success(expense);
            }
            catch (err) {
                if (err instanceof sequelize_1.Error) {
                    return ServiceResponse_1.ServiceResponse.validationError(err.message);
                }
                return ServiceResponse_1.ServiceResponse.serverError(err);
            }
        });
    }
    // update transaction
    static updateExpense(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const t = yield database_1.sequelize.transaction();
            try {
                const expense = yield database_1.models.Expense.findByPk(id, { transaction: t });
                if (!expense) {
                    yield t.rollback();
                    return ServiceResponse_1.ServiceResponse.notFound();
                }
                // Step 1: Update the Expense
                yield expense.update(params, { transaction: t });
                // Step 2: Check for special conditions
                if ((params.transactionType === "boarder_expense" ||
                    params.transactionType === "employee_expense") &&
                    params.isAssignLater) {
                    const itemName = (yield expense.getExpenseName()).expenseName;
                    // Step 3: Update or create Inventory
                    const inventoryData = {
                        expenseId: expense.id,
                        itemName,
                        description: expense.description,
                        quantity: expense.quantity,
                        costPerUnit: expense.userUnitAmount,
                    };
                    // Check if an inventory record exists for this expense
                    let inventory = yield database_1.models.Inventory.findOne({
                        where: { expenseId: expense.id },
                        transaction: t,
                    });
                    if (inventory) {
                        // Update existing inventory
                        if (inventory.inUse && expense.quantity !== inventory.quantity) {
                            yield t.rollback();
                            return ServiceResponse_1.ServiceResponse.validationError("Item assignment already started, can not edit quantity now");
                        }
                        yield inventory.update(inventoryData, { transaction: t });
                    }
                    else {
                        // Create new inventory
                        yield database_1.models.Inventory.create(inventoryData, { transaction: t });
                    }
                }
                // Commit transaction
                yield t.commit();
                return ServiceResponse_1.ServiceResponse.successUpdated({ id: expense.id });
            }
            catch (err) {
                yield t.rollback(); // Rollback transaction on error
                if (err instanceof sequelize_1.Error) {
                    return ServiceResponse_1.ServiceResponse.validationError(err.message);
                }
                return ServiceResponse_1.ServiceResponse.serverError(err);
            }
        });
    }
}
exports.ExpenseService = ExpenseService;
