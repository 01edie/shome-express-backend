import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { AuthServices } from "../services/auth.service";
import { LoginParams, RefreshTokenParams } from "../types/request-params";
import { ServiceResponse } from "../services/ServiceResponse";
import { ExpenseAttributes } from "../models/expense";
import { ExpenseClassCreationAttributes } from "../models/init-models";
import { ExpenseClassService } from "../services/expense-class.service";

export const getExpenseClasses = async (
  req: Request<{}, {}, {}>,
  res: Response
): Promise<void> => {
  const serviceRes = await ExpenseClassService.getAllExpenseClasses();
  res.status(serviceRes.statusCode).json(serviceRes);
};

export const getExpenseClassById = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  if (!+id) {
    const response = ServiceResponse.validationError("Not a valid a id");
    res.status(response.statusCode).json(response);
    return;
  }

  const serviceRes = await ExpenseClassService.getExpenseClassById(+id);
  res.status(serviceRes.statusCode).json(serviceRes);
};

export const createExpenseClass = async (
  req: Request<{}, {}, ExpenseClassCreationAttributes>,
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
    className: req.body.className.trim(),
    description: req.body.description,
  };

  const serviceRes = await ExpenseClassService.createExpenseClass(params);
  res.status(serviceRes.statusCode).json(serviceRes);
};

export const updateExpenseClass = async (
  req: Request<{ id: string }, {}, ExpenseClassCreationAttributes>,
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
    className: req.body.className.trim(),
    description: req.body.description,
  };

  const serviceRes = await ExpenseClassService.updateExpenseClass(+id, params);
  res.status(serviceRes.statusCode).json(serviceRes);
};
