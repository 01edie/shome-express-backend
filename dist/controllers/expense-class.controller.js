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
exports.updateExpenseClass = exports.createExpenseClass = exports.getExpenseClassById = exports.getExpenseClasses = void 0;
const express_validator_1 = require("express-validator");
const ServiceResponse_1 = require("../services/ServiceResponse");
const expense_class_service_1 = require("../services/expense-class.service");
const getExpenseClasses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceRes = yield expense_class_service_1.ExpenseClassService.getAllExpenseClasses();
    res.status(serviceRes.statusCode).json(serviceRes);
});
exports.getExpenseClasses = getExpenseClasses;
const getExpenseClassById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!+id) {
        const response = ServiceResponse_1.ServiceResponse.validationError("Not a valid a id");
        res.status(response.statusCode).json(response);
        return;
    }
    const serviceRes = yield expense_class_service_1.ExpenseClassService.getExpenseClassById(+id);
    res.status(serviceRes.statusCode).json(serviceRes);
});
exports.getExpenseClassById = getExpenseClassById;
const createExpenseClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // basic validations
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const validationRes = ServiceResponse_1.ServiceResponse.validationError(errors.array()[0].msg);
        res.status(validationRes.statusCode).json(validationRes);
        return;
    }
    const params = {
        className: req.body.className.trim(),
        description: req.body.description,
    };
    const serviceRes = yield expense_class_service_1.ExpenseClassService.createExpenseClass(params);
    res.status(serviceRes.statusCode).json(serviceRes);
});
exports.createExpenseClass = createExpenseClass;
const updateExpenseClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // basic validations
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const validationRes = ServiceResponse_1.ServiceResponse.validationError(errors.array()[0].msg);
        res.status(validationRes.statusCode).json(validationRes);
        return;
    }
    const { id } = req.params;
    if (!+id) {
        const response = ServiceResponse_1.ServiceResponse.validationError("Not a valid a id");
        res.status(response.statusCode).json(response);
        return;
    }
    const params = {
        className: req.body.className.trim(),
        description: req.body.description,
    };
    const serviceRes = yield expense_class_service_1.ExpenseClassService.updateExpenseClass(+id, params);
    res.status(serviceRes.statusCode).json(serviceRes);
});
exports.updateExpenseClass = updateExpenseClass;
