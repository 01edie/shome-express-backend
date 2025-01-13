"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetUp = void 0;
const sequelize_1 = require("sequelize");
class SetUp extends sequelize_1.Model {
    static initModel(sequelize) {
        return SetUp.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true
            },
            basePrice: {
                type: sequelize_1.DataTypes.TEXT,
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
exports.SetUp = SetUp;
