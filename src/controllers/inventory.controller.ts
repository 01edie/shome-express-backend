import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ServiceResponse } from "../services/ServiceResponse";
import {
  InventoryAssignment,
  InventoryService,
} from "../services/inventory.service";

export const getAllInventories = async (
  req: Request<{}, {}, {}>,
  res: Response
): Promise<void> => {
  const serviceRes = await InventoryService.getAllInventories();
  res.status(serviceRes.statusCode).json(serviceRes);
};

export const assignInventoryItem = async (
  req: Request<{ id: string }, {}, InventoryAssignment>,
  res: Response
): Promise<void> => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationRes = ServiceResponse.validationError(
      errors.array()[0].msg
    );
    res.status(validationRes.statusCode).json(validationRes);
    return;
  }
  const { id: inventoryId } = req.params;
  if (!+inventoryId) {
    const response = ServiceResponse.validationError("Not a valid id");
    res.status(response.statusCode).json(response);
    return;
  }

  const { quantityToAssign, boarderId, employeeId } = req.body;

  // Ensure only one of boarderId or employeeId is provided
  if ((!boarderId && !employeeId) || (boarderId && employeeId)) {
    const response = ServiceResponse.validationError(
      "Provide either boarderId or employeeId, but not both."
    );
    res.status(response.statusCode).json(response);
    return;
  }

  try {
    const serviceRes = await InventoryService.assignInventoryItem(
      +inventoryId,
      {
        quantityToAssign,
        boarderId,
        employeeId,
      }
    );

    res.status(serviceRes.statusCode).json(serviceRes);
  } catch (err) {
    const response = ServiceResponse.serverError("Error assigning inventory.");
    res.status(response.statusCode).json(response);
  }
};
