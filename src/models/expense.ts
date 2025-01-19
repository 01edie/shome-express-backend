import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Boarder, BoarderId } from './boarder';
import type { Employee, EmployeeId } from './employee';
import type { ExpenseName, ExpenseNameId } from './expense_name';
import type { Inventory, InventoryId } from './inventory';

export interface ExpenseAttributes {
  id: number;
  transactionDate: Date;
  transactionType: "internal_expense" | "boarder_expense" | "employee_expense";
  expenseNameId: number;
  quantity: number;
  description?: string;
  totalAmount: number;
  isAssignLater?: boolean;
  userUnitAmount: number;
  boarderId?: number;
  employeeId?: number;
  targetMonth?: string;
  notes?: string;
  fromInventoryAssignment?: boolean;
  transactionId?: number;
}

export type ExpensePk = "id";
export type ExpenseId = Expense[ExpensePk];
export type ExpenseOptionalAttributes = "id" | "transactionDate" | "quantity" | "description" | "isAssignLater" | "boarderId" | "employeeId" | "targetMonth" | "notes" | "fromInventoryAssignment" | "transactionId";
export type ExpenseCreationAttributes = Optional<ExpenseAttributes, ExpenseOptionalAttributes>;

export class Expense extends Model<ExpenseAttributes, ExpenseCreationAttributes> implements ExpenseAttributes {
  id!: number;
  transactionDate!: Date;
  transactionType!: "internal_expense" | "boarder_expense" | "employee_expense";
  expenseNameId!: number;
  quantity!: number;
  description?: string;
  totalAmount!: number;
  isAssignLater?: boolean;
  userUnitAmount!: number;
  boarderId?: number;
  employeeId?: number;
  targetMonth?: string;
  notes?: string;
  fromInventoryAssignment?: boolean;
  transactionId?: number;

  // Expense belongsTo Boarder via boarderId
  boarder!: Boarder;
  getBoarder!: Sequelize.BelongsToGetAssociationMixin<Boarder>;
  setBoarder!: Sequelize.BelongsToSetAssociationMixin<Boarder, BoarderId>;
  createBoarder!: Sequelize.BelongsToCreateAssociationMixin<Boarder>;
  // Expense belongsTo Employee via employeeId
  employee!: Employee;
  getEmployee!: Sequelize.BelongsToGetAssociationMixin<Employee>;
  setEmployee!: Sequelize.BelongsToSetAssociationMixin<Employee, EmployeeId>;
  createEmployee!: Sequelize.BelongsToCreateAssociationMixin<Employee>;
  // Expense hasMany Inventory via expenseId
  inventories!: Inventory[];
  getInventories!: Sequelize.HasManyGetAssociationsMixin<Inventory>;
  setInventories!: Sequelize.HasManySetAssociationsMixin<Inventory, InventoryId>;
  addInventory!: Sequelize.HasManyAddAssociationMixin<Inventory, InventoryId>;
  addInventories!: Sequelize.HasManyAddAssociationsMixin<Inventory, InventoryId>;
  createInventory!: Sequelize.HasManyCreateAssociationMixin<Inventory>;
  removeInventory!: Sequelize.HasManyRemoveAssociationMixin<Inventory, InventoryId>;
  removeInventories!: Sequelize.HasManyRemoveAssociationsMixin<Inventory, InventoryId>;
  hasInventory!: Sequelize.HasManyHasAssociationMixin<Inventory, InventoryId>;
  hasInventories!: Sequelize.HasManyHasAssociationsMixin<Inventory, InventoryId>;
  countInventories!: Sequelize.HasManyCountAssociationsMixin;
  // Expense belongsTo ExpenseName via expenseNameId
  expenseName!: ExpenseName;
  getExpenseName!: Sequelize.BelongsToGetAssociationMixin<ExpenseName>;
  setExpenseName!: Sequelize.BelongsToSetAssociationMixin<ExpenseName, ExpenseNameId>;
  createExpenseName!: Sequelize.BelongsToCreateAssociationMixin<ExpenseName>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Expense {
    return Expense.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    transactionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now'),
      field: 'transaction_date'
    },
    transactionType: {
      type: DataTypes.ENUM("internal_expense","boarder_expense","employee_expense"),
      allowNull: false,
      field: 'transaction_type'
    },
    expenseNameId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'expense_name',
        key: 'id'
      },
      field: 'expense_name_id'
    },
    quantity: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: 1
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    totalAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'total_amount'
    },
    isAssignLater: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'is_assign_later'
    },
    userUnitAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'user_unit_amount'
    },
    boarderId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'boarder',
        key: 'id'
      },
      field: 'boarder_id'
    },
    employeeId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'employee',
        key: 'id'
      },
      field: 'employee_id'
    },
    targetMonth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'target_month'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fromInventoryAssignment: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'from_inventory_assignment'
    },
    transactionId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: "the id expense from coming from inventory assignment",
      field: 'transaction_id'
    }
  }, {
    sequelize,
    tableName: 'expense',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "expense_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "idx_expense_name_id",
        fields: [
          { name: "expense_name_id" },
        ]
      },
      {
        name: "idx_expense_transaction_date",
        fields: [
          { name: "transaction_date" },
        ]
      },
      {
        name: "idx_expense_transaction_type",
        fields: [
          { name: "transaction_type" },
        ]
      },
    ]
  });
  }
}
