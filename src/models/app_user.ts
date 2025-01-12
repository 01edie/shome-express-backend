import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { InternalDocuments, InternalDocumentsId } from './internal_documents';

export interface AppUserAttributes {
  id: number;
  name: string;
  username: string;
  role: string;
  roleId: number;
  password: string;
}

export type AppUserPk = "id";
export type AppUserId = AppUser[AppUserPk];
export type AppUserOptionalAttributes = "id";
export type AppUserCreationAttributes = Optional<AppUserAttributes, AppUserOptionalAttributes>;

export class AppUser extends Model<AppUserAttributes, AppUserCreationAttributes> implements AppUserAttributes {
  id!: number;
  name!: string;
  username!: string;
  role!: string;
  roleId!: number;
  password!: string;

  // AppUser hasMany InternalDocuments via uploadedBy
  internalDocuments!: InternalDocuments[];
  getInternalDocuments!: Sequelize.HasManyGetAssociationsMixin<InternalDocuments>;
  setInternalDocuments!: Sequelize.HasManySetAssociationsMixin<InternalDocuments, InternalDocumentsId>;
  addInternalDocument!: Sequelize.HasManyAddAssociationMixin<InternalDocuments, InternalDocumentsId>;
  addInternalDocuments!: Sequelize.HasManyAddAssociationsMixin<InternalDocuments, InternalDocumentsId>;
  createInternalDocument!: Sequelize.HasManyCreateAssociationMixin<InternalDocuments>;
  removeInternalDocument!: Sequelize.HasManyRemoveAssociationMixin<InternalDocuments, InternalDocumentsId>;
  removeInternalDocuments!: Sequelize.HasManyRemoveAssociationsMixin<InternalDocuments, InternalDocumentsId>;
  hasInternalDocument!: Sequelize.HasManyHasAssociationMixin<InternalDocuments, InternalDocumentsId>;
  hasInternalDocuments!: Sequelize.HasManyHasAssociationsMixin<InternalDocuments, InternalDocumentsId>;
  countInternalDocuments!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof AppUser {
    return AppUser.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    role: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'role_id'
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'app_user',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "app_user_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
