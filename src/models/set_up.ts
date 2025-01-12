import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface SetUpAttributes {
  id: number;
  basePrice: string;
}

export type SetUpPk = "id";
export type SetUpId = SetUp[SetUpPk];
export type SetUpOptionalAttributes = "id";
export type SetUpCreationAttributes = Optional<SetUpAttributes, SetUpOptionalAttributes>;

export class SetUp extends Model<SetUpAttributes, SetUpCreationAttributes> implements SetUpAttributes {
  id!: number;
  basePrice!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof SetUp {
    return SetUp.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    basePrice: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'base_price'
    }
  }, {
    sequelize,
    tableName: 'set_up',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "set_up_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
