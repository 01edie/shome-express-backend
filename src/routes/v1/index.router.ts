import express from "express";
import authRouter from "./auth.router";
import { authenticateToken } from "../../middlewares/authentication";
import lisDataRouter from "./list-data.router";
import employeeRouter from "./employee.router";
import boarderRouter from "./boarder.router";
import expenseRouter from "./expense.router";
import inventoryRouter from "./inventory.router";

const API_V1 = express.Router();

// public routes
API_V1.use("/auth", authRouter);
// protected routes
API_V1.use(authenticateToken);
API_V1.use("/list", lisDataRouter);
API_V1.use("/employees", employeeRouter);
API_V1.use("/boarders", boarderRouter);
API_V1.use("/expenses", expenseRouter);
API_V1.use("/inventory", inventoryRouter);

export default API_V1;
