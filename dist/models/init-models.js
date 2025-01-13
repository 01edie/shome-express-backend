"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetUp = exports.MonthlyBill = exports.Inventory = exports.InternalDocuments = exports.ExpenseName = exports.ExpenseClass = exports.Expense = exports.EmployeeDocuments = exports.Employee = exports.BoarderDocuments = exports.Boarder = exports.AppUser = void 0;
exports.initModels = initModels;
const app_user_1 = require("./app_user");
Object.defineProperty(exports, "AppUser", { enumerable: true, get: function () { return app_user_1.AppUser; } });
const boarder_1 = require("./boarder");
Object.defineProperty(exports, "Boarder", { enumerable: true, get: function () { return boarder_1.Boarder; } });
const boarder_documents_1 = require("./boarder_documents");
Object.defineProperty(exports, "BoarderDocuments", { enumerable: true, get: function () { return boarder_documents_1.BoarderDocuments; } });
const employee_1 = require("./employee");
Object.defineProperty(exports, "Employee", { enumerable: true, get: function () { return employee_1.Employee; } });
const employee_documents_1 = require("./employee_documents");
Object.defineProperty(exports, "EmployeeDocuments", { enumerable: true, get: function () { return employee_documents_1.EmployeeDocuments; } });
const expense_1 = require("./expense");
Object.defineProperty(exports, "Expense", { enumerable: true, get: function () { return expense_1.Expense; } });
const expense_class_1 = require("./expense_class");
Object.defineProperty(exports, "ExpenseClass", { enumerable: true, get: function () { return expense_class_1.ExpenseClass; } });
const expense_name_1 = require("./expense_name");
Object.defineProperty(exports, "ExpenseName", { enumerable: true, get: function () { return expense_name_1.ExpenseName; } });
const internal_documents_1 = require("./internal_documents");
Object.defineProperty(exports, "InternalDocuments", { enumerable: true, get: function () { return internal_documents_1.InternalDocuments; } });
const inventory_1 = require("./inventory");
Object.defineProperty(exports, "Inventory", { enumerable: true, get: function () { return inventory_1.Inventory; } });
const monthly_bill_1 = require("./monthly_bill");
Object.defineProperty(exports, "MonthlyBill", { enumerable: true, get: function () { return monthly_bill_1.MonthlyBill; } });
const set_up_1 = require("./set_up");
Object.defineProperty(exports, "SetUp", { enumerable: true, get: function () { return set_up_1.SetUp; } });
function initModels(sequelize) {
    const AppUser = app_user_1.AppUser.initModel(sequelize);
    const Boarder = boarder_1.Boarder.initModel(sequelize);
    const BoarderDocuments = boarder_documents_1.BoarderDocuments.initModel(sequelize);
    const Employee = employee_1.Employee.initModel(sequelize);
    const EmployeeDocuments = employee_documents_1.EmployeeDocuments.initModel(sequelize);
    const Expense = expense_1.Expense.initModel(sequelize);
    const ExpenseClass = expense_class_1.ExpenseClass.initModel(sequelize);
    const ExpenseName = expense_name_1.ExpenseName.initModel(sequelize);
    const InternalDocuments = internal_documents_1.InternalDocuments.initModel(sequelize);
    const Inventory = inventory_1.Inventory.initModel(sequelize);
    const MonthlyBill = monthly_bill_1.MonthlyBill.initModel(sequelize);
    const SetUp = set_up_1.SetUp.initModel(sequelize);
    InternalDocuments.belongsTo(AppUser, { as: "uploadedByAppUser", foreignKey: "uploadedBy" });
    AppUser.hasMany(InternalDocuments, { as: "internalDocuments", foreignKey: "uploadedBy" });
    BoarderDocuments.belongsTo(Boarder, { as: "boarder", foreignKey: "boarderId" });
    Boarder.hasMany(BoarderDocuments, { as: "boarderDocuments", foreignKey: "boarderId" });
    Expense.belongsTo(Boarder, { as: "boarder", foreignKey: "boarderId" });
    Boarder.hasMany(Expense, { as: "expenses", foreignKey: "boarderId" });
    MonthlyBill.belongsTo(Boarder, { as: "boarder", foreignKey: "boarderId" });
    Boarder.hasMany(MonthlyBill, { as: "monthlyBills", foreignKey: "boarderId" });
    EmployeeDocuments.belongsTo(Employee, { as: "employee", foreignKey: "employeeId" });
    Employee.hasMany(EmployeeDocuments, { as: "employeeDocuments", foreignKey: "employeeId" });
    Expense.belongsTo(Employee, { as: "employee", foreignKey: "employeeId" });
    Employee.hasMany(Expense, { as: "expenses", foreignKey: "employeeId" });
    Inventory.belongsTo(Expense, { as: "expense", foreignKey: "expenseId" });
    Expense.hasMany(Inventory, { as: "inventories", foreignKey: "expenseId" });
    ExpenseName.belongsTo(ExpenseClass, { as: "expenseClass", foreignKey: "expenseClassId" });
    ExpenseClass.hasMany(ExpenseName, { as: "expenseNames", foreignKey: "expenseClassId" });
    Expense.belongsTo(ExpenseName, { as: "expenseName", foreignKey: "expenseNameId" });
    ExpenseName.hasMany(Expense, { as: "expenses", foreignKey: "expenseNameId" });
    return {
        AppUser: AppUser,
        Boarder: Boarder,
        BoarderDocuments: BoarderDocuments,
        Employee: Employee,
        EmployeeDocuments: EmployeeDocuments,
        Expense: Expense,
        ExpenseClass: ExpenseClass,
        ExpenseName: ExpenseName,
        InternalDocuments: InternalDocuments,
        Inventory: Inventory,
        MonthlyBill: MonthlyBill,
        SetUp: SetUp,
    };
}
