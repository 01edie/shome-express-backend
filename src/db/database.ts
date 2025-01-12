import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { initModels } from "../models/init-models";

dotenv.config();

const connectionString = process.env.DB_CONNECTION_STRING!;

const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

const models = initModels(sequelize);

export { sequelize, models };
