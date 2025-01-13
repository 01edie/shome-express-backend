"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expense = void 0;
const Sequelize = __importStar(require("sequelize"));
const sequelize_1 = require("sequelize");
class Expense extends sequelize_1.Model {
    static initModel(sequelize) {
        return Expense.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true
            },
            transactionDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.fn('now'),
                field: 'transaction_date'
            },
            transactionType: {
                type: sequelize_1.DataTypes.ENUM("internal_expense", "boarder_expense", "employee_expense"),
                allowNull: false,
                field: 'transaction_type'
            },
            expenseNameId: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'expense_name',
                    key: 'id'
                },
                field: 'expense_name_id'
            },
            quantity: {
                type: sequelize_1.DataTypes.REAL,
                allowNull: false,
                defaultValue: 1
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            totalAmount: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: false,
                field: 'total_amount'
            },
            isAssignLater: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                field: 'is_assign_later'
            },
            userUnitAmount: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: false,
                field: 'user_unit_amount'
            },
            boarderId: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'boarder',
                    key: 'id'
                },
                field: 'boarder_id'
            },
            employeeId: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'employee',
                    key: 'id'
                },
                field: 'employee_id'
            },
            targetMonth: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true,
                field: 'target_month'
            },
            notes: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            fromInventoryAssignment: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false,
                field: 'from_inventory_assignment'
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
exports.Expense = Expense;
