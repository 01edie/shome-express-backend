import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppUser, AppUserId } from './app_user';

export interface InternalDocumentsAttributes {
  id: number;
  documentName: string;
  documentUrl: string;
  uploadDate: Date;
  fileType?: string;
  uploadedBy: number;
  notes?: string;
}

export type InternalDocumentsPk = "id";
export type InternalDocumentsId = InternalDocuments[InternalDocumentsPk];
export type InternalDocumentsOptionalAttributes = "id" | "uploadDate" | "fileType" | "notes";
export type InternalDocumentsCreationAttributes = Optional<InternalDocumentsAttributes, InternalDocumentsOptionalAttributes>;

export class InternalDocuments extends Model<InternalDocumentsAttributes, InternalDocumentsCreationAttributes> implements InternalDocumentsAttributes {
  id!: number;
  documentName!: string;
  documentUrl!: string;
  uploadDate!: Date;
  fileType?: string;
  uploadedBy!: number;
  notes?: string;

  // InternalDocuments belongsTo AppUser via uploadedBy
  uploadedByAppUser!: AppUser;
  getUploadedByAppUser!: Sequelize.BelongsToGetAssociationMixin<AppUser>;
  setUploadedByAppUser!: Sequelize.BelongsToSetAssociationMixin<AppUser, AppUserId>;
  createUploadedByAppUser!: Sequelize.BelongsToCreateAssociationMixin<AppUser>;

  static initModel(sequelize: Sequelize.Sequelize): typeof InternalDocuments {
    return InternalDocuments.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
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
    uploadedBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'app_user',
        key: 'id'
      },
      field: 'uploaded_by'
    },
    notes: {
      type: DataTypes.TEXT,
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
