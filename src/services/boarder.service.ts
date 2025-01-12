import { Op, Error as SQError } from "sequelize";
import { ServiceResponse } from "./ServiceResponse";
import { models } from "../db/database";
import {
  Boarder,
  BoarderCreationAttributes,
  BoarderDocuments,
} from "../models/init-models";

export class BoarderService {
  // Create new Boarder
  static async createBoarder(
    params: BoarderCreationAttributes
  ): Promise<ServiceResponse<{ id: number }>> {
    try {
      const newBoarder = await models.Boarder.create(params);
      return ServiceResponse.successCreated({ id: newBoarder.id });
    } catch (err) {
      if (err instanceof SQError) {
        return ServiceResponse.validationError(err.message);
      }
      return ServiceResponse.serverError(err);
    }
  }

  // Get all Boarders
  static async getAllBoarders(): Promise<ServiceResponse<Boarder[]>> {
    try {
      const boarders = await models.Boarder.findAll();
      return ServiceResponse.success(boarders);
    } catch (err) {
      if (err instanceof SQError) {
        return ServiceResponse.validationError(err.message);
      }
      return ServiceResponse.serverError(err);
    }
  }

  // Get Boarder by ID
  static async getBoarderById(id: number): Promise<ServiceResponse<Boarder>> {
    try {
      const boarder = await models.Boarder.findByPk(id, {
        include: [
          {
            model: BoarderDocuments,
            as: "boarderDocuments",
          },
        ],
      });
      if (!boarder) {
        return ServiceResponse.notFound();
      }
      return ServiceResponse.success(boarder);
    } catch (err) {
      if (err instanceof SQError) {
        return ServiceResponse.validationError(err.message);
      }
      return ServiceResponse.serverError(err);
    }
  }

  // Update an Boarder
  static async updateBoarder(
    id: number,
    params: BoarderCreationAttributes
  ): Promise<ServiceResponse<{ id: number }>> {
    try {
      const boarder = await models.Boarder.findByPk(id);
      if (!boarder) {
        return ServiceResponse.notFound();
      }

      await boarder.update(params);
      return ServiceResponse.successUpdated({ id: boarder.id });
    } catch (err) {
      if (err instanceof SQError) {
        return ServiceResponse.validationError(err.message);
      }
      return ServiceResponse.serverError(err);
    }
  }
}
