import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ServiceResponse } from "../services/ServiceResponse";
import { ExpenseCreationAttributes } from "../models/init-models";
import { ExpenseService } from "../services/expense.service";

export const getExpenses = async (
  req: Request<{}, {}, {}>,
  res: Response
): Promise<void> => {
  const serviceRes = await ExpenseService.getAllExpenses();
  res.status(serviceRes.statusCode).json(serviceRes);
};

export const getExpenseById = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  if (!+id) {
    const response = ServiceResponse.validationError("Not a valid id");
    res.status(response.statusCode).json(response);
    return;
  }

  const serviceRes = await ExpenseService.getExpenseById(+id);
  res.status(serviceRes.statusCode).json(serviceRes);
};

export const createExpense = async (
  req: Request<{}, {}, ExpenseCreationAttributes>,
  res: Response
): Promise<void> => {
  // Basic validations
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationRes = ServiceResponse.validationError(
      errors.array()[0].msg
    );
    res.status(validationRes.statusCode).json(validationRes);
    return;
  }

  const params = {
    ...req.body,
  };

  const serviceRes = await ExpenseService.createExpenseWithInventory(params);
  res.status(serviceRes.statusCode).json(serviceRes);
};

export const updateExpense = async (
  req: Request<{ id: string }, {}, ExpenseCreationAttributes>,
  res: Response
): Promise<void> => {
  // Basic validations
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationRes = ServiceResponse.validationError(
      errors.array()[0].msg
    );
    res.status(validationRes.statusCode).json(validationRes);
    return;
  }
  const { id } = req.params;
  if (!+id) {
    const response = ServiceResponse.validationError("Not a valid id");
    res.status(response.statusCode).json(response);
    return;
  }

  const params = {
    ...req.body,
  };

  const serviceRes = await ExpenseService.updateExpense(+id, params);
  res.status(serviceRes.statusCode).json(serviceRes);
};
