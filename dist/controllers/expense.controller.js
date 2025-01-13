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
exports.updateExpense = exports.createExpense = exports.getExpenseById = exports.getExpenses = void 0;
const express_validator_1 = require("express-validator");
const ServiceResponse_1 = require("../services/ServiceResponse");
const expense_service_1 = require("../services/expense.service");
const getExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceRes = yield expense_service_1.ExpenseService.getAllExpenses();
    res.status(serviceRes.statusCode).json(serviceRes);
});
exports.getExpenses = getExpenses;
const getExpenseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!+id) {
        const response = ServiceResponse_1.ServiceResponse.validationError("Not a valid id");
        res.status(response.statusCode).json(response);
        return;
    }
    const serviceRes = yield expense_service_1.ExpenseService.getExpenseById(+id);
    res.status(serviceRes.statusCode).json(serviceRes);
});
exports.getExpenseById = getExpenseById;
const createExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Basic validations
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const validationRes = ServiceResponse_1.ServiceResponse.validationError(errors.array()[0].msg);
        res.status(validationRes.statusCode).json(validationRes);
        return;
    }
    const params = Object.assign({}, req.body);
    const serviceRes = yield expense_service_1.ExpenseService.createExpenseWithInventory(params);
    res.status(serviceRes.statusCode).json(serviceRes);
});
exports.createExpense = createExpense;
const updateExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Basic validations
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const validationRes = ServiceResponse_1.ServiceResponse.validationError(errors.array()[0].msg);
        res.status(validationRes.statusCode).json(validationRes);
        return;
    }
    const { id } = req.params;
    if (!+id) {
        const response = ServiceResponse_1.ServiceResponse.validationError("Not a valid id");
        res.status(response.statusCode).json(response);
        return;
    }
    const params = Object.assign({}, req.body);
    const serviceRes = yield expense_service_1.ExpenseService.updateExpense(+id, params);
    res.status(serviceRes.statusCode).json(serviceRes);
});
exports.updateExpense = updateExpense;
