"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = __importDefault(require("./auth.router"));
const authentication_1 = require("../../middlewares/authentication");
const list_data_router_1 = __importDefault(require("./list-data.router"));
const employee_router_1 = __importDefault(require("./employee.router"));
const boarder_router_1 = __importDefault(require("./boarder.router"));
const expense_router_1 = __importDefault(require("./expense.router"));
const inventory_router_1 = __importDefault(require("./inventory.router"));
const API_V1 = express_1.default.Router();
// public routes
API_V1.use("/auth", auth_router_1.default);
// protected routes
API_V1.use(authentication_1.authenticateToken);
API_V1.use("/list", list_data_router_1.default);
API_V1.use("/employees", employee_router_1.default);
API_V1.use("/boarders", boarder_router_1.default);
API_V1.use("/expenses", expense_router_1.default);
API_V1.use("/inventory", inventory_router_1.default);
exports.default = API_V1;
