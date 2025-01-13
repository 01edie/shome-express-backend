"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthlyBill = void 0;
const sequelize_1 = require("sequelize");
class MonthlyBill extends sequelize_1.Model {
    static initModel(sequelize) {
        return MonthlyBill.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true
            },
            boarderId: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'boarder',
                    key: 'id'
                },
                field: 'boarder_id'
            },
            paymentFrom: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                field: 'payment_from'
            },
            billMonth: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false,
                field: 'bill_month'
            },
            basePrice: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: false,
                field: 'base_price'
            },
            extraChargesTotal: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: true,
                field: 'extra_charges_total'
            },
            extraCharges: {
                type: sequelize_1.DataTypes.JSONB,
                allowNull: true,
                field: 'extra_charges'
            },
            totalAmount: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: false,
                field: 'total_amount'
            },
            paid: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            paymentDate: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true,
                field: 'payment_date'
            },
            notes: {
                type: sequelize_1.DataTypes.TEXT,
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
exports.MonthlyBill = MonthlyBill;
