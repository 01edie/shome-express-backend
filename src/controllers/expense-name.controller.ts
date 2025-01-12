import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ServiceResponse } from "../services/ServiceResponse";
import { ExpenseNameCreationAttributes } from "../models/init-models";
import { ExpenseNameService } from "../services/expense-name.service";

export const getExpenseNames = async (
  req: Request<{}, {}, {}>,
  res: Response
): Promise<void> => {
  const serviceRes = await ExpenseNameService.getAllExpenseNames();
  res.status(serviceRes.statusCode).json(serviceRes);
};

export const getExpenseNameById = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  if (!+id) {
    const response = ServiceResponse.validationError("Not a valid a id");
    res.status(response.statusCode).json(response);
    return;
  }

  const serviceRes = await ExpenseNameService.getExpenseNameById(+id);
  res.status(serviceRes.statusCode).json(serviceRes);
};

export const createExpenseName = async (
  req: Request<{}, {}, ExpenseNameCreationAttributes>,
  res: Response
): Promise<void> => {
  // basic validations
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
    expenseName: req.body.expenseName.trim(),
  };

  const serviceRes = await ExpenseNameService.createExpenseName(params);
  res.status(serviceRes.statusCode).json(serviceRes);
};

export const updateExpenseName = async (
  req: Request<{ id: string }, {}, ExpenseNameCreationAttributes>,
  res: Response
): Promise<void> => {
  // basic validations
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
    const response = ServiceResponse.validationError("Not a valid a id");
    res.status(response.statusCode).json(response);
    return;
  }

  const params = {
    ...req.body,
    expenseName: req.body.expenseName.trim(),
  };

  const serviceRes = await ExpenseNameService.updateExpenseName(+id, params);
  res.status(serviceRes.statusCode).json(serviceRes);
};
