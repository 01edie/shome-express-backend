import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Employee, EmployeeId } from './employee';

export interface EmployeeDocumentsAttributes {
  id: number;
  employeeId: number;
  documentName: string;
  documentUrl: string;
  uploadDate: Date;
  fileType?: string;
  notes?: string;
}

export type EmployeeDocumentsPk = "id";
export type EmployeeDocumentsId = EmployeeDocuments[EmployeeDocumentsPk];
export type EmployeeDocumentsOptionalAttributes = "id" | "uploadDate" | "fileType" | "notes";
export type EmployeeDocumentsCreationAttributes = Optional<EmployeeDocumentsAttributes, EmployeeDocumentsOptionalAttributes>;

export class EmployeeDocuments extends Model<EmployeeDocumentsAttributes, EmployeeDocumentsCreationAttributes> implements EmployeeDocumentsAttributes {
  id!: number;
  employeeId!: number;
  documentName!: string;
  documentUrl!: string;
  uploadDate!: Date;
  fileType?: string;
  notes?: string;

  // EmployeeDocuments belongsTo Employee via employeeId
  employee!: Employee;
  getEmployee!: Sequelize.BelongsToGetAssociationMixin<Employee>;
  setEmployee!: Sequelize.BelongsToSetAssociationMixin<Employee, EmployeeId>;
  createEmployee!: Sequelize.BelongsToCreateAssociationMixin<Employee>;

  static initModel(sequelize: Sequelize.Sequelize): typeof EmployeeDocuments {
    return EmployeeDocuments.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    employeeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'employee',
        key: 'id'
      },
      field: 'employee_id'
    },
    documentName: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'document_name'
    },
    documentUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'document_url'
    },
    uploadDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now'),
      field: 'upload_date'
    },
    fileType: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'file_type'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'employee_documents',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employee_documents_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "idx_employee_documents_employee_id",
        fields: [
          { name: "employee_id" },
        ]
      },
    ]
  });
  }
}
