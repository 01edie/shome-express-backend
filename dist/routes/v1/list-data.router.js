"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_validations_1 = require("./route-validations");
const expense_class_controller_1 = require("../../controllers/expense-class.controller");
const expense_name_controller_1 = require("../../controllers/expense-name.controller");
const lisDataRouter = express_1.default.Router();
// Expense Class
lisDataRouter.get("/expense-classes", expense_class_controller_1.getExpenseClasses);
lisDataRouter.get("/expense-classes/:id", expense_class_controller_1.getExpenseClassById);
lisDataRouter.post("/expense-classes", route_validations_1.listReq.listExpenseClass, expense_class_controller_1.createExpenseClass);
lisDataRouter.put("/expense-classes/:id", route_validations_1.listReq.listExpenseClass, expense_class_controller_1.updateExpenseClass);
// Expense Name
lisDataRouter.get("/expense-names", expense_name_controller_1.getExpenseNames);
lisDataRouter.get("/expense-names/:id", expense_name_controller_1.getExpenseNameById);
lisDataRouter.post("/expense-names", route_validations_1.listReq.listExpenseName, expense_name_controller_1.createExpenseName);
lisDataRouter.put("/expense-names/:id", route_validations_1.listReq.listExpenseName, expense_name_controller_1.updateExpenseName);
exports.default = lisDataRouter;
