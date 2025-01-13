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
exports.InternalDocuments = void 0;
const Sequelize = __importStar(require("sequelize"));
const sequelize_1 = require("sequelize");
class InternalDocuments extends sequelize_1.Model {
    static initModel(sequelize) {
        return InternalDocuments.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true
            },
            documentName: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                field: 'document_name'
            },
            documentUrl: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                field: 'document_url'
            },
            uploadDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.fn('now'),
                field: 'upload_date'
            },
            fileType: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
                field: 'file_type'
            },
            uploadedBy: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'app_user',
                    key: 'id'
                },
                field: 'uploaded_by'
            },
            notes: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'internal_documents',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "internal_documents_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.InternalDocuments = InternalDocuments;