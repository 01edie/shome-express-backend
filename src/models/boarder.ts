import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { BoarderDocuments, BoarderDocumentsId } from './boarder_documents';
import type { Expense, ExpenseId } from './expense';
import type { MonthlyBill, MonthlyBillId } from './monthly_bill';

export interface BoarderAttributes {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  bloodGroup?: string;
  contactNumber: string;
  emergencyContact?: string;
  guardianName?: string;
  medicalCondition?: string;
  specialNeeds?: string;
  allergies?: string;
  notes?: string;
  active?: boolean;
  roomNo?: number;
  joiningDate: Date;
  leavingDate?: Date;
}

export type BoarderPk = "id";
export type BoarderId = Boarder[BoarderPk];
export type BoarderOptionalAttributes = "id" | "bloodGroup" | "emergencyContact" | "guardianName" | "medicalCondition" | "specialNeeds" | "allergies" | "notes" | "active" | "roomNo" | "joiningDate" | "leavingDate";
export type BoarderCreationAttributes = Optional<BoarderAttributes, BoarderOptionalAttributes>;

export class Boarder extends Model<BoarderAttributes, BoarderCreationAttributes> implements BoarderAttributes {
  id!: number;
  firstName!: string;
  lastName!: string;
  dob!: string;
  bloodGroup?: string;
  contactNumber!: string;
  emergencyContact?: string;
  guardianName?: string;
  medicalCondition?: string;
  specialNeeds?: string;
  allergies?: string;
  notes?: string;
  active?: boolean;
  roomNo?: number;
  joiningDate!: Date;
  leavingDate?: Date;

  // Boarder hasMany BoarderDocuments via boarderId
  boarderDocuments!: BoarderDocuments[];
  getBoarderDocuments!: Sequelize.HasManyGetAssociationsMixin<BoarderDocuments>;
  setBoarderDocuments!: Sequelize.HasManySetAssociationsMixin<BoarderDocuments, BoarderDocumentsId>;
  addBoarderDocument!: Sequelize.HasManyAddAssociationMixin<BoarderDocuments, BoarderDocumentsId>;
  addBoarderDocuments!: Sequelize.HasManyAddAssociationsMixin<BoarderDocuments, BoarderDocumentsId>;
  createBoarderDocument!: Sequelize.HasManyCreateAssociationMixin<BoarderDocuments>;
  removeBoarderDocument!: Sequelize.HasManyRemoveAssociationMixin<BoarderDocuments, BoarderDocumentsId>;
  removeBoarderDocuments!: Sequelize.HasManyRemoveAssociationsMixin<BoarderDocuments, BoarderDocumentsId>;
  hasBoarderDocument!: Sequelize.HasManyHasAssociationMixin<BoarderDocuments, BoarderDocumentsId>;
  hasBoarderDocuments!: Sequelize.HasManyHasAssociationsMixin<BoarderDocuments, BoarderDocumentsId>;
  countBoarderDocuments!: Sequelize.HasManyCountAssociationsMixin;
  // Boarder hasMany Expense via boarderId
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
  // Boarder hasMany MonthlyBill via boarderId
  monthlyBills!: MonthlyBill[];
  getMonthlyBills!: Sequelize.HasManyGetAssociationsMixin<MonthlyBill>;
  setMonthlyBills!: Sequelize.HasManySetAssociationsMixin<MonthlyBill, MonthlyBillId>;
  addMonthlyBill!: Sequelize.HasManyAddAssociationMixin<MonthlyBill, MonthlyBillId>;
  addMonthlyBills!: Sequelize.HasManyAddAssociationsMixin<MonthlyBill, MonthlyBillId>;
  createMonthlyBill!: Sequelize.HasManyCreateAssociationMixin<MonthlyBill>;
  removeMonthlyBill!: Sequelize.HasManyRemoveAssociationMixin<MonthlyBill, MonthlyBillId>;
  removeMonthlyBills!: Sequelize.HasManyRemoveAssociationsMixin<MonthlyBill, MonthlyBillId>;
  hasMonthlyBill!: Sequelize.HasManyHasAssociationMixin<MonthlyBill, MonthlyBillId>;
  hasMonthlyBills!: Sequelize.HasManyHasAssociationsMixin<MonthlyBill, MonthlyBillId>;
  countMonthlyBills!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Boarder {
    return Boarder.init({
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
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    bloodGroup: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'blood_group'
    },
    contactNumber: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'contact_number'
    },
    emergencyContact: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'emergency_contact'
    },
    guardianName: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'guardian_name'
    },
    medicalCondition: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'medical_condition'
    },
    specialNeeds: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'special_needs'
    },
    allergies: {
      type: DataTypes.TEXT,
      allowNull: true
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
    roomNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'room_no'
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
    tableName: 'boarder',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "boarder_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
