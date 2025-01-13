import express from "express";
import { sequelize } from "./db/database";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import logger from "./services/logger.service";
import API_V1 from "./routes/v1/index.router";

dotenv.config();

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:4173",
      "http://localhost:5173",
      "https://app-shome.vercel.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1", API_V1);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected!");
    app.listen(+process.env.SERVER_PORT!, () =>
      console.log(`Server running on SERVER_PORT : ${process.env.SERVER_PORT}`)
    );
    process.on("uncaughtException", (err) => {
      logger.error(`Uncaught Exception: ${err.stack ?? err.message}`);
    });

    process.on("unhandledRejection", (reason) => {
      logger.error(`Unhandled Rejection: ${reason}`);
    });
  })
  .catch((err: any) => console.error("Database connection failed:", err));