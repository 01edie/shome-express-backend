"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
const sequelize_1 = require("sequelize");
class Inventory extends sequelize_1.Model {
    static initModel(sequelize) {
        return Inventory.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true
            },
            expenseId: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'expense',
                    key: 'id'
                },
                field: 'expense_id'
            },
            itemName: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                field: 'item_name'
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            quantity: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            costPerUnit: {
                type: sequelize_1.DataTypes.REAL,
                allowNull: false,
                field: 'cost_per_unit'
            },
            inUse: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                field: 'in_use'
            },
            stockingDate: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true,
                field: 'stocking_date'
            },
            unit: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'inventory',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "inventory_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.Inventory = Inventory;
