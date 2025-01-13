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
exports.ExpenseNameService = void 0;
const sequelize_1 = require("sequelize");
const ServiceResponse_1 = require("./ServiceResponse");
const database_1 = require("../db/database");
class ExpenseNameService {
    // Create a new Expense Class
    static createExpenseName(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // if expense name exists
                const doesExist = yield database_1.models.ExpenseName.findOne({
                    where: {
                        expenseName: {
                            [sequelize_1.Op.iLike]: params.expenseName,
                        },
                    },
                });
                if (doesExist) {
                    return ServiceResponse_1.ServiceResponse.validationError("Expense name already exists");
                }
                // ---
                const newExpenseName = yield database_1.models.ExpenseName.create(params);
                return ServiceResponse_1.ServiceResponse.successCreated({ id: newExpenseName.id });
            }
            catch (err) {
                if (err instanceof sequelize_1.Error) {
                    return ServiceResponse_1.ServiceResponse.validationError(err.message);
                }
                return ServiceResponse_1.ServiceResponse.serverError(err);
            }
        });
    }
    // Get all Expense Names
    static getAllExpenseNames() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expenseNames = yield database_1.models.ExpenseName.findAll({
                    include: {
                        model: database_1.models.ExpenseClass,
                        as: "expenseClass",
                    },
                });
                return ServiceResponse_1.ServiceResponse.success(expenseNames);
            }
            catch (err) {
                if (err instanceof sequelize_1.Error) {
                    return ServiceResponse_1.ServiceResponse.validationError(err.message);
                }
                return ServiceResponse_1.ServiceResponse.serverError(err);
            }
        });
    }
    // Get an Expense Names by ID
    static getExpenseNameById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expenseName = yield database_1.models.ExpenseName.findByPk(id);
                if (!expenseName) {
                    return ServiceResponse_1.ServiceResponse.notFound();
                }
                return ServiceResponse_1.ServiceResponse.success(expenseName);
            }
            catch (err) {
                if (err instanceof sequelize_1.Error) {
                    return ServiceResponse_1.ServiceResponse.validationError(err.message);
                }
                return ServiceResponse_1.ServiceResponse.serverError(err);
            }
        });
    }
    // Update an Expense Name
    static updateExpenseName(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expenseName = yield database_1.models.ExpenseName.findByPk(id);
                if (!expenseName) {
                    return ServiceResponse_1.ServiceResponse.notFound();
                }
                // if expense name exists
                const doesExist = yield database_1.models.ExpenseName.findOne({
                    where: {
                        expenseName: {
                            [sequelize_1.Op.iLike]: params.expenseName,
                        },
                        id: {
                            [sequelize_1.Op.ne]: id,
                        },
                    },
                });
                if (doesExist) {
                    return ServiceResponse_1.ServiceResponse.validationError("Expense name already exists");
                }
                // ---
                yield expenseName.update(params);
                return ServiceResponse_1.ServiceResponse.successUpdated({ id: expenseName.id });
            }
            catch (err) {
                if (err instanceof sequelize_1.Error) {
                    return ServiceResponse_1.ServiceResponse.validationError(err.message);
                }
                return ServiceResponse_1.ServiceResponse.serverError(err);
            }
        });
    }
}
exports.ExpenseNameService = ExpenseNameService;
