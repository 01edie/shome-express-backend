"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppUser = void 0;
const sequelize_1 = require("sequelize");
class AppUser extends sequelize_1.Model {
    static initModel(sequelize) {
        return AppUser.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            username: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            role: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            roleId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                field: 'role_id'
            },
            password: {
                type: sequelize_1.DataTypes.TEXT,
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
exports.AppUser = AppUser;
