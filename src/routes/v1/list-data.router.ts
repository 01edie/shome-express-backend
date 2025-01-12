import express from "express";

import { listReq } from "./route-validations";
import {
  createExpenseClass,
  getExpenseClassById,
  getExpenseClasses,
  updateExpenseClass,
} from "../../controllers/expense-class.controller";
import {
  createExpenseName,
  getExpenseNameById,
  getExpenseNames,
  updateExpenseName,
} from "../../controllers/expense-name.controller";

const lisDataRouter = express.Router();

// Expense Class
lisDataRouter.get("/expense-classes", getExpenseClasses);
lisDataRouter.get("/expense-classes/:id", getExpenseClassById);
lisDataRouter.post(
  "/expense-classes",
  listReq.listExpenseClass,
  createExpenseClass
);
lisDataRouter.put(
  "/expense-classes/:id",
  listReq.listExpenseClass,
  updateExpenseClass
);

// Expense Name
lisDataRouter.get("/expense-names", getExpenseNames);
lisDataRouter.get("/expense-names/:id", getExpenseNameById);
lisDataRouter.post(
  "/expense-names",
  listReq.listExpenseName,
  createExpenseName
);
lisDataRouter.put(
  "/expense-names/:id",
  listReq.listExpenseName,
  updateExpenseName
);

export default lisDataRouter;
