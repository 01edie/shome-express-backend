import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Boarder, BoarderId } from './boarder';

export interface BoarderDocumentsAttributes {
  id: number;
  boarderId: number;
  documentName: string;
  documentUrl: string;
  uploadDate: Date;
  fileType?: string;
  notes?: string;
}

export type BoarderDocumentsPk = "id";
export type BoarderDocumentsId = BoarderDocuments[BoarderDocumentsPk];
export type BoarderDocumentsOptionalAttributes = "id" | "uploadDate" | "fileType" | "notes";
export type BoarderDocumentsCreationAttributes = Optional<BoarderDocumentsAttributes, BoarderDocumentsOptionalAttributes>;

export class BoarderDocuments extends Model<BoarderDocumentsAttributes, BoarderDocumentsCreationAttributes> implements BoarderDocumentsAttributes {
  id!: number;
  boarderId!: number;
  documentName!: string;
  documentUrl!: string;
  uploadDate!: Date;
  fileType?: string;
  notes?: string;

  // BoarderDocuments belongsTo Boarder via boarderId
  boarder!: Boarder;
  getBoarder!: Sequelize.BelongsToGetAssociationMixin<Boarder>;
  setBoarder!: Sequelize.BelongsToSetAssociationMixin<Boarder, BoarderId>;
  createBoarder!: Sequelize.BelongsToCreateAssociationMixin<Boarder>;

  static initModel(sequelize: Sequelize.Sequelize): typeof BoarderDocuments {
    return BoarderDocuments.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    boarderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'boarder',
        key: 'id'
      },
      field: 'boarder_id'
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
    tableName: 'boarder_documents',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "boarder_documents_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "idx_boarder_documents_boarder_id",
        fields: [
          { name: "boarder_id" },
        ]
      },
    ]
  });
  }
}
