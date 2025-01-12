import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ServiceResponse } from "../services/ServiceResponse";
import { EmployeeCreationAttributes } from "../models/init-models";
import { EmployeeService } from "../services/employee.service";



export const getEmployees = async (
  req: Request<{}, {}, {}>,
  res: Response
): Promise<void> => {
  const serviceRes = await EmployeeService.getAllEmployees();
  res.status(serviceRes.statusCode).json(serviceRes);
};

export const getEmployeeById = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  if (!+id) {
    const response = ServiceResponse.validationError("Not a valid a id");
    res.status(response.statusCode).json(response);
    return;
  }

  const serviceRes = await EmployeeService.getEmployeeById(+id);
  res.status(serviceRes.statusCode).json(serviceRes);
};

export const createEmployee = async (
  req: Request<{}, {}, EmployeeCreationAttributes>,
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
  };

  const serviceRes = await EmployeeService.createEmployee(params);
  res.status(serviceRes.statusCode).json(serviceRes);
};

export const updateEmployee = async (
  req: Request<{ id: string }, {}, EmployeeCreationAttributes>,
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
  };

  const serviceRes = await EmployeeService.updateEmployee(+id, params);
  res.status(serviceRes.statusCode).json(serviceRes);
};
