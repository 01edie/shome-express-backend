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
exports.EmployeeService = void 0;
const sequelize_1 = require("sequelize");
const ServiceResponse_1 = require("./ServiceResponse");
const database_1 = require("../db/database");
const init_models_1 = require("../models/init-models");
class EmployeeService {
    // Create new Employee
    static createEmployee(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newEmployee = yield database_1.models.Employee.create(params);
                return ServiceResponse_1.ServiceResponse.successCreated({ id: newEmployee.id });
            }
            catch (err) {
                if (err instanceof sequelize_1.Error) {
                    return ServiceResponse_1.ServiceResponse.validationError(err.message);
                }
                return ServiceResponse_1.ServiceResponse.serverError(err);
            }
        });
    }
    // Get all Employees
    static getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield database_1.models.Employee.findAll();
                return ServiceResponse_1.ServiceResponse.success(employees);
            }
            catch (err) {
                if (err instanceof sequelize_1.Error) {
                    return ServiceResponse_1.ServiceResponse.validationError(err.message);
                }
                return ServiceResponse_1.ServiceResponse.serverError(err);
            }
        });
    }
    // Get Employee by ID
    static getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield database_1.models.Employee.findByPk(id, {
                    include: [{ model: init_models_1.EmployeeDocuments, as: "employeeDocuments" }],
                });
                if (!employee) {
                    return ServiceResponse_1.ServiceResponse.notFound();
                }
                return ServiceResponse_1.ServiceResponse.success(employee);
            }
            catch (err) {
                if (err instanceof sequelize_1.Error) {
                    return ServiceResponse_1.ServiceResponse.validationError(err.message);
                }
                return ServiceResponse_1.ServiceResponse.serverError(err);
            }
        });
    }
    // Update an Employee
    static updateEmployee(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield database_1.models.Employee.findByPk(id);
                if (!employee) {
                    return ServiceResponse_1.ServiceResponse.notFound();
                }
                yield employee.update(params);
                return ServiceResponse_1.ServiceResponse.successUpdated({ id: employee.id });
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
exports.EmployeeService = EmployeeService;
