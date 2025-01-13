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
exports.Boarder = void 0;
const Sequelize = __importStar(require("sequelize"));
const sequelize_1 = require("sequelize");
class Boarder extends sequelize_1.Model {
    static initModel(sequelize) {
        return Boarder.init({
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
            dob: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false
            },
            bloodGroup: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
                field: 'blood_group'
            },
            contactNumber: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                field: 'contact_number'
            },
            emergencyContact: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
                field: 'emergency_contact'
            },
            guardianName: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
                field: 'guardian_name'
            },
            medicalCondition: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
                field: 'medical_condition'
            },
            specialNeeds: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
                field: 'special_needs'
            },
            allergies: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
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
            roomNo: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                field: 'room_no'
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
exports.Boarder = Boarder;
