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
exports.ExpenseClassService = void 0;
const sequelize_1 = require("sequelize");
const ServiceResponse_1 = require("./ServiceResponse");
const database_1 = require("../db/database");
class ExpenseClassService {
    // Create a new Expense Class
    static createExpenseClass(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { className, description } = params;
                // if classname exists
                const doesExist = yield database_1.models.ExpenseClass.findOne({
                    where: {
                        className: {
                            [sequelize_1.Op.iLike]: className,
                        },
                    },
                });
                if (doesExist) {
                    return ServiceResponse_1.ServiceResponse.validationError("Expense class already exists");
                }
                // ---
                const newExpenseClass = yield database_1.models.ExpenseClass.create({
                    className,
                    description,
                });
                return ServiceResponse_1.ServiceResponse.successCreated({ id: newExpenseClass.id });
            }
            catch (err) {
                if (err instanceof sequelize_1.Error) {
                    return ServiceResponse_1.ServiceResponse.validationError(err.message);
                }
                return ServiceResponse_1.ServiceResponse.serverError(err);
            }
        });
    }
    // Get all Expense Classes
    static getAllExpenseClasses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expenseClasses = yield database_1.models.ExpenseClass.findAll();
                return ServiceResponse_1.ServiceResponse.success(expenseClasses);
            }
            catch (err) {
                if (err instanceof sequelize_1.Error) {
                    return ServiceResponse_1.ServiceResponse.validationError(err.message);
                }
                return ServiceResponse_1.ServiceResponse.serverError(err);
            }
        });
    }
    // Get an Expense Class by ID
    static getExpenseClassById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expenseClass = yield database_1.models.ExpenseClass.findByPk(id);
                if (!expenseClass) {
                    return ServiceResponse_1.ServiceResponse.notFound();
                }
                return ServiceResponse_1.ServiceResponse.success(expenseClass);
            }
            catch (err) {
                if (err instanceof sequelize_1.Error) {
                    return ServiceResponse_1.ServiceResponse.validationError(err.message);
                }
                return ServiceResponse_1.ServiceResponse.serverError(err);
            }
        });
    }
    // Update an Expense Class
    static updateExpenseClass(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expenseClass = yield database_1.models.ExpenseClass.findByPk(id);
                if (!expenseClass) {
                    return ServiceResponse_1.ServiceResponse.notFound();
                }
                const { className, description } = params;
                // if classname exists
                const doesExist = yield database_1.models.ExpenseClass.findOne({
                    where: {
                        className: {
                            [sequelize_1.Op.iLike]: className,
                        },
                        id: {
                            [sequelize_1.Op.ne]: id,
                        },
                    },
                });
                if (doesExist) {
                    return ServiceResponse_1.ServiceResponse.validationError("Expense class already exists");
                }
                // ---
                yield expenseClass.update({ className, description });
                return ServiceResponse_1.ServiceResponse.successUpdated({ id: expenseClass.id });
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
exports.ExpenseClassService = ExpenseClassService;
