import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ExpenseName, ExpenseNameId } from './expense_name';

export interface ExpenseClassAttributes {
  id: number;
  className: string;
  description: string;
}

export type ExpenseClassPk = "id";
export type ExpenseClassId = ExpenseClass[ExpenseClassPk];
export type ExpenseClassOptionalAttributes = "id";
export type ExpenseClassCreationAttributes = Optional<ExpenseClassAttributes, ExpenseClassOptionalAttributes>;

export class ExpenseClass extends Model<ExpenseClassAttributes, ExpenseClassCreationAttributes> implements ExpenseClassAttributes {
  id!: number;
  className!: string;
  description!: string;

  // ExpenseClass hasMany ExpenseName via expenseClassId
  expenseNames!: ExpenseName[];
  getExpenseNames!: Sequelize.HasManyGetAssociationsMixin<ExpenseName>;
  setExpenseNames!: Sequelize.HasManySetAssociationsMixin<ExpenseName, ExpenseNameId>;
  addExpenseName!: Sequelize.HasManyAddAssociationMixin<ExpenseName, ExpenseNameId>;
  addExpenseNames!: Sequelize.HasManyAddAssociationsMixin<ExpenseName, ExpenseNameId>;
  createExpenseName!: Sequelize.HasManyCreateAssociationMixin<ExpenseName>;
  removeExpenseName!: Sequelize.HasManyRemoveAssociationMixin<ExpenseName, ExpenseNameId>;
  removeExpenseNames!: Sequelize.HasManyRemoveAssociationsMixin<ExpenseName, ExpenseNameId>;
  hasExpenseName!: Sequelize.HasManyHasAssociationMixin<ExpenseName, ExpenseNameId>;
  hasExpenseNames!: Sequelize.HasManyHasAssociationsMixin<ExpenseName, ExpenseNameId>;
  countExpenseNames!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof ExpenseClass {
    return ExpenseClass.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    className: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'class_name'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'expense_class',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "expense_class_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
