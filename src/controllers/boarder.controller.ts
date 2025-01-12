import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ServiceResponse } from "../services/ServiceResponse";
import { BoarderCreationAttributes } from "../models/init-models";
import { BoarderService } from "../services/boarder.service";

export const getBoarders = async (
  req: Request<{}, {}, {}>,
  res: Response
): Promise<void> => {
  const serviceRes = await BoarderService.getAllBoarders();
  res.status(serviceRes.statusCode).json(serviceRes);
};

export const getBoarderById = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  if (!+id) {
    const response = ServiceResponse.validationError("Not a valid a id");
    res.status(response.statusCode).json(response);
    return;
  }

  const serviceRes = await BoarderService.getBoarderById(+id);
  res.status(serviceRes.statusCode).json(serviceRes);
};

export const createBoarder = async (
  req: Request<{}, {}, BoarderCreationAttributes>,
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

  const serviceRes = await BoarderService.createBoarder(params);
  res.status(serviceRes.statusCode).json(serviceRes);
};

export const updateBoarder = async (
  req: Request<{ id: string }, {}, BoarderCreationAttributes>,
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

  const serviceRes = await BoarderService.updateBoarder(+id, params);
  res.status(serviceRes.statusCode).json(serviceRes);
};
