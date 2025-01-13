"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseName = void 0;
const sequelize_1 = require("sequelize");
class ExpenseName extends sequelize_1.Model {
    static initModel(sequelize) {
        return ExpenseName.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true
            },
            expenseName: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                field: 'expense_name'
            },
            expenseClassId: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'expense_class',
                    key: 'id'
                },
                field: 'expense_class_id'
            },
            unit: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            transactionType: {
                type: sequelize_1.DataTypes.ENUM("internal_expense", "boarder_expense", "employee_expense"),
                allowNull: false,
                field: 'transaction_type'
            },
            isInventoryItem: {
                type: sequelize_1.DataTypes.BOOLEAN,
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
exports.ExpenseName = ExpenseName;
