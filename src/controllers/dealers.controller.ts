import { Request, Response } from "express";
import { DealersServices } from "../services/dealers.service";

export const getAllDealers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const params = {
    currentUserId: req.user?.id!,
    paintCompanyId: req.user?.paintCompanyId!,
  };

  const serviceRes = await DealersServices.getAllDealers(params);
  res.status(serviceRes.statusCode).json(serviceRes);
};
