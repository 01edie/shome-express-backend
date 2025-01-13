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
exports.updateEmployee = exports.createEmployee = exports.getEmployeeById = exports.getEmployees = void 0;
const express_validator_1 = require("express-validator");
const ServiceResponse_1 = require("../services/ServiceResponse");
const employee_service_1 = require("../services/employee.service");
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceRes = yield employee_service_1.EmployeeService.getAllEmployees();
    res.status(serviceRes.statusCode).json(serviceRes);
});
exports.getEmployees = getEmployees;
const getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!+id) {
        const response = ServiceResponse_1.ServiceResponse.validationError("Not a valid a id");
        res.status(response.statusCode).json(response);
        return;
    }
    const serviceRes = yield employee_service_1.EmployeeService.getEmployeeById(+id);
    res.status(serviceRes.statusCode).json(serviceRes);
});
exports.getEmployeeById = getEmployeeById;
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // basic validations
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const validationRes = ServiceResponse_1.ServiceResponse.validationError(errors.array()[0].msg);
        res.status(validationRes.statusCode).json(validationRes);
        return;
    }
    const params = Object.assign({}, req.body);
    const serviceRes = yield employee_service_1.EmployeeService.createEmployee(params);
    res.status(serviceRes.statusCode).json(serviceRes);
});
exports.createEmployee = createEmployee;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const params = Object.assign({}, req.body);
    const serviceRes = yield employee_service_1.EmployeeService.updateEmployee(+id, params);
    res.status(serviceRes.statusCode).json(serviceRes);
});
exports.updateEmployee = updateEmployee;
