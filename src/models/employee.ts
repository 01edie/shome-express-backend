import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { EmployeeDocuments, EmployeeDocumentsId } from './employee_documents';
import type { Expense, ExpenseId } from './expense';

export interface EmployeeAttributes {
  id: number;
  firstName: string;
  lastName: string;
  employeeRole?: string;
  salary: number;
  contactNumber?: string;
  notes?: string;
  active?: boolean;
  joiningDate: Date;
  leavingDate?: Date;
}

export type EmployeePk = "id";
export type EmployeeId = Employee[EmployeePk];
export type EmployeeOptionalAttributes = "id" | "employeeRole" | "contactNumber" | "notes" | "active" | "joiningDate" | "leavingDate";
export type EmployeeCreationAttributes = Optional<EmployeeAttributes, EmployeeOptionalAttributes>;

export class Employee extends Model<EmployeeAttributes, EmployeeCreationAttributes> implements EmployeeAttributes {
  id!: number;
  firstName!: string;
  lastName!: string;
  employeeRole?: string;
  salary!: number;
  contactNumber?: string;
  notes?: string;
  active?: boolean;
  joiningDate!: Date;
  leavingDate?: Date;

  // Employee hasMany EmployeeDocuments via employeeId
  employeeDocuments!: EmployeeDocuments[];
  getEmployeeDocuments!: Sequelize.HasManyGetAssociationsMixin<EmployeeDocuments>;
  setEmployeeDocuments!: Sequelize.HasManySetAssociationsMixin<EmployeeDocuments, EmployeeDocumentsId>;
  addEmployeeDocument!: Sequelize.HasManyAddAssociationMixin<EmployeeDocuments, EmployeeDocumentsId>;
  addEmployeeDocuments!: Sequelize.HasManyAddAssociationsMixin<EmployeeDocuments, EmployeeDocumentsId>;
  createEmployeeDocument!: Sequelize.HasManyCreateAssociationMixin<EmployeeDocuments>;
  removeEmployeeDocument!: Sequelize.HasManyRemoveAssociationMixin<EmployeeDocuments, EmployeeDocumentsId>;
  removeEmployeeDocuments!: Sequelize.HasManyRemoveAssociationsMixin<EmployeeDocuments, EmployeeDocumentsId>;
  hasEmployeeDocument!: Sequelize.HasManyHasAssociationMixin<EmployeeDocuments, EmployeeDocumentsId>;
  hasEmployeeDocuments!: Sequelize.HasManyHasAssociationsMixin<EmployeeDocuments, EmployeeDocumentsId>;
  countEmployeeDocuments!: Sequelize.HasManyCountAssociationsMixin;
  // Employee hasMany Expense via employeeId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Employee {
    return Employee.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'last_name'
    },
    employeeRole: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'employee_role'
    },
    salary: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    contactNumber: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'contact_number'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    joiningDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now'),
      field: 'joining_date'
    },
    leavingDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'leaving_date'
    }
  }, {
    sequelize,
    tableName: 'employee',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employee_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
