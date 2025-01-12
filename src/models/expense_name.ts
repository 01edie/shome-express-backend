import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Expense, ExpenseId } from './expense';
import type { ExpenseClass, ExpenseClassId } from './expense_class';

export interface ExpenseNameAttributes {
  id: number;
  expenseName: string;
  expenseClassId: number;
  unit: string;
  transactionType: "internal_expense" | "boarder_expense" | "employee_expense";
  isInventoryItem: boolean;
}

export type ExpenseNamePk = "id";
export type ExpenseNameId = ExpenseName[ExpenseNamePk];
export type ExpenseNameOptionalAttributes = "id";
export type ExpenseNameCreationAttributes = Optional<ExpenseNameAttributes, ExpenseNameOptionalAttributes>;

export class ExpenseName extends Model<ExpenseNameAttributes, ExpenseNameCreationAttributes> implements ExpenseNameAttributes {
  id!: number;
  expenseName!: string;
  expenseClassId!: number;
  unit!: string;
  transactionType!: "internal_expense" | "boarder_expense" | "employee_expense";
  isInventoryItem!: boolean;

  // ExpenseName belongsTo ExpenseClass via expenseClassId
  expenseClass!: ExpenseClass;
  getExpenseClass!: Sequelize.BelongsToGetAssociationMixin<ExpenseClass>;
  setExpenseClass!: Sequelize.BelongsToSetAssociationMixin<ExpenseClass, ExpenseClassId>;
  createExpenseClass!: Sequelize.BelongsToCreateAssociationMixin<ExpenseClass>;
  // ExpenseName hasMany Expense via expenseNameId
  expenses!: Expense[];
  getExpenses!: Sequelize.HasManyGetAssociationsMixin<Expense>;
  setExpenses!: Sequelize.HasManySetAssociationsMixin<Expense, ExpenseId>;
  addExpense!: Sequelize.HasManyAddAssociationMixin<Expense, ExpenseId>;
  addExpenses!: Sequelize.HasManyAddAssociationsMixin<Expense, ExpenseId>;
  createExpense!: Sequelize.HasManyCreateAssociationMixin<Expense>;
  removeExpense!: Sequelize.HasManyRemoveAssociationMixin<Expense, ExpenseId>;
  removeExpenses!: Sequelize.HasManyRemoveAssociationsMixin<Expense, ExpenseId>;
  hasExpense!: Sequelize.HasManyHasAssociationMixin<Expense, ExpenseId>;
  hasExpenses!: Sequelize.HasManyHasAssociationsMixin<Expense, ExpenseId>;
  countExpenses!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof ExpenseName {
    return ExpenseName.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    expenseName: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'expense_name'
    },
    expenseClassId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'expense_class',
        key: 'id'
      },
      field: 'expense_class_id'
    },
    unit: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    transactionType: {
      type: DataTypes.ENUM("internal_expense","boarder_expense","employee_expense"),
      allowNull: false,
      field: 'transaction_type'
    },
    isInventoryItem: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_inventory_item'
    }
  }, {
    sequelize,
    tableName: 'expense_name',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "expense_name_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
