import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Boarder, BoarderId } from './boarder';

export interface MonthlyBillAttributes {
  id: number;
  boarderId: number;
  paymentFrom: string;
  billMonth: string;
  basePrice: number;
  extraChargesTotal?: number;
  extraCharges?: object;
  totalAmount: number;
  paid?: boolean;
  paymentDate?: string;
  notes?: string;
}

export type MonthlyBillPk = "id";
export type MonthlyBillId = MonthlyBill[MonthlyBillPk];
export type MonthlyBillOptionalAttributes = "id" | "extraChargesTotal" | "extraCharges" | "paid" | "paymentDate" | "notes";
export type MonthlyBillCreationAttributes = Optional<MonthlyBillAttributes, MonthlyBillOptionalAttributes>;

export class MonthlyBill extends Model<MonthlyBillAttributes, MonthlyBillCreationAttributes> implements MonthlyBillAttributes {
  id!: number;
  boarderId!: number;
  paymentFrom!: string;
  billMonth!: string;
  basePrice!: number;
  extraChargesTotal?: number;
  extraCharges?: object;
  totalAmount!: number;
  paid?: boolean;
  paymentDate?: string;
  notes?: string;

  // MonthlyBill belongsTo Boarder via boarderId
  boarder!: Boarder;
  getBoarder!: Sequelize.BelongsToGetAssociationMixin<Boarder>;
  setBoarder!: Sequelize.BelongsToSetAssociationMixin<Boarder, BoarderId>;
  createBoarder!: Sequelize.BelongsToCreateAssociationMixin<Boarder>;

  static initModel(sequelize: Sequelize.Sequelize): typeof MonthlyBill {
    return MonthlyBill.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    boarderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'boarder',
        key: 'id'
      },
      field: 'boarder_id'
    },
    paymentFrom: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'payment_from'
    },
    billMonth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'bill_month'
    },
    basePrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'base_price'
    },
    extraChargesTotal: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'extra_charges_total'
    },
    extraCharges: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: 'extra_charges'
    },
    totalAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'total_amount'
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    paymentDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'payment_date'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'monthly_bill',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "idx_monthly_bill_bill_month",
        fields: [
          { name: "bill_month" },
        ]
      },
      {
        name: "idx_monthly_bill_paid",
        fields: [
          { name: "paid" },
        ]
      },
      {
        name: "monthly_bill_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
