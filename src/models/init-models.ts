import type { Sequelize } from "sequelize";
import { AppUser as _AppUser } from "./app_user";
import type { AppUserAttributes, AppUserCreationAttributes } from "./app_user";
import { Boarder as _Boarder } from "./boarder";
import type { BoarderAttributes, BoarderCreationAttributes } from "./boarder";
import { BoarderDocuments as _BoarderDocuments } from "./boarder_documents";
import type { BoarderDocumentsAttributes, BoarderDocumentsCreationAttributes } from "./boarder_documents";
import { Employee as _Employee } from "./employee";
import type { EmployeeAttributes, EmployeeCreationAttributes } from "./employee";
import { EmployeeDocuments as _EmployeeDocuments } from "./employee_documents";
import type { EmployeeDocumentsAttributes, EmployeeDocumentsCreationAttributes } from "./employee_documents";
import { Expense as _Expense } from "./expense";
import type { ExpenseAttributes, ExpenseCreationAttributes } from "./expense";
import { ExpenseClass as _ExpenseClass } from "./expense_class";
import type { ExpenseClassAttributes, ExpenseClassCreationAttributes } from "./expense_class";
import { ExpenseName as _ExpenseName } from "./expense_name";
import type { ExpenseNameAttributes, ExpenseNameCreationAttributes } from "./expense_name";
import { InternalDocuments as _InternalDocuments } from "./internal_documents";
import type { InternalDocumentsAttributes, InternalDocumentsCreationAttributes } from "./internal_documents";
import { Inventory as _Inventory } from "./inventory";
import type { InventoryAttributes, InventoryCreationAttributes } from "./inventory";
import { MonthlyBill as _MonthlyBill } from "./monthly_bill";
import type { MonthlyBillAttributes, MonthlyBillCreationAttributes } from "./monthly_bill";
import { SetUp as _SetUp } from "./set_up";
import type { SetUpAttributes, SetUpCreationAttributes } from "./set_up";

export {
  _AppUser as AppUser,
  _Boarder as Boarder,
  _BoarderDocuments as BoarderDocuments,
  _Employee as Employee,
  _EmployeeDocuments as EmployeeDocuments,
  _Expense as Expense,
  _ExpenseClass as ExpenseClass,
  _ExpenseName as ExpenseName,
  _InternalDocuments as InternalDocuments,
  _Inventory as Inventory,
  _MonthlyBill as MonthlyBill,
  _SetUp as SetUp,
};

export type {
  AppUserAttributes,
  AppUserCreationAttributes,
  BoarderAttributes,
  BoarderCreationAttributes,
  BoarderDocumentsAttributes,
  BoarderDocumentsCreationAttributes,
  EmployeeAttributes,
  EmployeeCreationAttributes,
  EmployeeDocumentsAttributes,
  EmployeeDocumentsCreationAttributes,
  ExpenseAttributes,
  ExpenseCreationAttributes,
  ExpenseClassAttributes,
  ExpenseClassCreationAttributes,
  ExpenseNameAttributes,
  ExpenseNameCreationAttributes,
  InternalDocumentsAttributes,
  InternalDocumentsCreationAttributes,
  InventoryAttributes,
  InventoryCreationAttributes,
  MonthlyBillAttributes,
  MonthlyBillCreationAttributes,
  SetUpAttributes,
  SetUpCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const AppUser = _AppUser.initModel(sequelize);
  const Boarder = _Boarder.initModel(sequelize);
  const BoarderDocuments = _BoarderDocuments.initModel(sequelize);
  const Employee = _Employee.initModel(sequelize);
  const EmployeeDocuments = _EmployeeDocuments.initModel(sequelize);
  const Expense = _Expense.initModel(sequelize);
  const ExpenseClass = _ExpenseClass.initModel(sequelize);
  const ExpenseName = _ExpenseName.initModel(sequelize);
  const InternalDocuments = _InternalDocuments.initModel(sequelize);
  const Inventory = _Inventory.initModel(sequelize);
  const MonthlyBill = _MonthlyBill.initModel(sequelize);
  const SetUp = _SetUp.initModel(sequelize);

  InternalDocuments.belongsTo(AppUser, { as: "uploadedByAppUser", foreignKey: "uploadedBy"});
  AppUser.hasMany(InternalDocuments, { as: "internalDocuments", foreignKey: "uploadedBy"});
  BoarderDocuments.belongsTo(Boarder, { as: "boarder", foreignKey: "boarderId"});
  Boarder.hasMany(BoarderDocuments, { as: "boarderDocuments", foreignKey: "boarderId"});
  Expense.belongsTo(Boarder, { as: "boarder", foreignKey: "boarderId"});
  Boarder.hasMany(Expense, { as: "expenses", foreignKey: "boarderId"});
  MonthlyBill.belongsTo(Boarder, { as: "boarder", foreignKey: "boarderId"});
  Boarder.hasMany(MonthlyBill, { as: "monthlyBills", foreignKey: "boarderId"});
  EmployeeDocuments.belongsTo(Employee, { as: "employee", foreignKey: "employeeId"});
  Employee.hasMany(EmployeeDocuments, { as: "employeeDocuments", foreignKey: "employeeId"});
  Expense.belongsTo(Employee, { as: "employee", foreignKey: "employeeId"});
  Employee.hasMany(Expense, { as: "expenses", foreignKey: "employeeId"});
  Inventory.belongsTo(Expense, { as: "expense", foreignKey: "expenseId"});
  Expense.hasMany(Inventory, { as: "inventories", foreignKey: "expenseId"});
  ExpenseName.belongsTo(ExpenseClass, { as: "expenseClass", foreignKey: "expenseClassId"});
  ExpenseClass.hasMany(ExpenseName, { as: "expenseNames", foreignKey: "expenseClassId"});
  Expense.belongsTo(ExpenseName, { as: "expenseName", foreignKey: "expenseNameId"});
  ExpenseName.hasMany(Expense, { as: "expenses", foreignKey: "expenseNameId"});

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
