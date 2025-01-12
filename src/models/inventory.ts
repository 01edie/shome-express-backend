import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Expense, ExpenseId } from './expense';

export interface InventoryAttributes {
  id: number;
  expenseId: number;
  itemName: string;
  description?: string;
  quantity: number;
  costPerUnit: number;
  inUse?: boolean;
  stockingDate?: string;
  unit?: string;
}

export type InventoryPk = "id";
export type InventoryId = Inventory[InventoryPk];
export type InventoryOptionalAttributes = "id" | "description" | "inUse" | "stockingDate" | "unit";
export type InventoryCreationAttributes = Optional<InventoryAttributes, InventoryOptionalAttributes>;

export class Inventory extends Model<InventoryAttributes, InventoryCreationAttributes> implements InventoryAttributes {
  id!: number;
  expenseId!: number;
  itemName!: string;
  description?: string;
  quantity!: number;
  costPerUnit!: number;
  inUse?: boolean;
  stockingDate?: string;
  unit?: string;

  // Inventory belongsTo Expense via expenseId
  expense!: Expense;
  getExpense!: Sequelize.BelongsToGetAssociationMixin<Expense>;
  setExpense!: Sequelize.BelongsToSetAssociationMixin<Expense, ExpenseId>;
  createExpense!: Sequelize.BelongsToCreateAssociationMixin<Expense>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Inventory {
    return Inventory.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    expenseId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'expense',
        key: 'id'
      },
      field: 'expense_id'
    },
    itemName: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'item_name'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    costPerUnit: {
      type: DataTypes.REAL,
      allowNull: false,
      field: 'cost_per_unit'
    },
    inUse: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'in_use'
    },
    stockingDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'stocking_date'
    },
    unit: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'inventory',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "inventory_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
