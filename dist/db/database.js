"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const init_models_1 = require("../models/init-models");
dotenv_1.default.config();
const connectionString = process.env.DB_CONNECTION_STRING;
const sequelize = new sequelize_1.Sequelize(connectionString, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: false,
});
exports.sequelize = sequelize;
const models = (0, init_models_1.initModels)(sequelize);
exports.models = models;
