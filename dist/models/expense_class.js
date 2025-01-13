"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseClass = void 0;
const sequelize_1 = require("sequelize");
class ExpenseClass extends sequelize_1.Model {
    static initModel(sequelize) {
        return ExpenseClass.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true
            },
            className: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                field: 'class_name'
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
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
exports.ExpenseClass = ExpenseClass;
