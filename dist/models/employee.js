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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const Sequelize = __importStar(require("sequelize"));
const sequelize_1 = require("sequelize");
class Employee extends sequelize_1.Model {
    static initModel(sequelize) {
        return Employee.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true
            },
            firstName: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                field: 'first_name'
            },
            lastName: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                field: 'last_name'
            },
            employeeRole: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
                field: 'employee_role'
            },
            salary: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: false
            },
            contactNumber: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
                field: 'contact_number'
            },
            notes: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            active: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            },
            joiningDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.fn('now'),
                field: 'joining_date'
            },
            leavingDate: {
                type: sequelize_1.DataTypes.DATE,
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
exports.Employee = Employee;
