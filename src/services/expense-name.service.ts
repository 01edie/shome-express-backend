import { Op, Error as SQError } from "sequelize";
import { ServiceResponse } from "./ServiceResponse";
import { models } from "../db/database";
import {
  ExpenseClass,
  ExpenseName,
  ExpenseNameCreationAttributes,
} from "../models/init-models";

export class ExpenseNameService {
  // Create a new Expense Class
  static async createExpenseName(
    params: ExpenseNameCreationAttributes
  ): Promise<ServiceResponse<{ id: number }>> {
    try {
      // if expense name exists
      const doesExist = await models.ExpenseName.findOne({
        where: {
          expenseName: {
            [Op.iLike]: params.expenseName,
          },
        },
      });

      if (doesExist) {
        return ServiceResponse.validationError("Expense name already exists");
      }
      // ---

      const newExpenseName = await models.ExpenseName.create(params);

      return ServiceResponse.successCreated({ id: newExpenseName.id });
    } catch (err) {
      if (err instanceof SQError) {
        return ServiceResponse.validationError(err.message);
      }
      return ServiceResponse.serverError(err);
    }
  }

  // Get all Expense Names
  static async getAllExpenseNames(): Promise<ServiceResponse<ExpenseName[]>> {
    try {
      const expenseNames = await models.ExpenseName.findAll({
        include: {
          model: models.ExpenseClass,
          as: "expenseClass",
        },
      });
      return ServiceResponse.success(expenseNames);
    } catch (err) {
      if (err instanceof SQError) {
        return ServiceResponse.validationError(err.message);
      }
      return ServiceResponse.serverError(err);
    }
  }

  // Get an Expense Names by ID
  static async getExpenseNameById(
    id: number
  ): Promise<ServiceResponse<ExpenseName>> {
    try {
      const expenseName = await models.ExpenseName.findByPk(id);
      if (!expenseName) {
        return ServiceResponse.notFound();
      }
      return ServiceResponse.success(expenseName);
    } catch (err) {
      if (err instanceof SQError) {
        return ServiceResponse.validationError(err.message);
      }
      return ServiceResponse.serverError(err);
    }
  }

  // Update an Expense Name
  static async updateExpenseName(
    id: number,
    params: ExpenseNameCreationAttributes
  ): Promise<ServiceResponse<{ id: number }>> {
    try {
      const expenseName = await models.ExpenseName.findByPk(id);
      if (!expenseName) {
        return ServiceResponse.notFound();
      }

      // if expense name exists
      const doesExist = await models.ExpenseName.findOne({
        where: {
          expenseName: {
            [Op.iLike]: params.expenseName,
          },
          id: {
            [Op.ne]: id,
          },
        },
      });

      if (doesExist) {
        return ServiceResponse.validationError("Expense name already exists");
      }
      // ---

      await expenseName.update(params);
      return ServiceResponse.successUpdated({ id: expenseName.id });
    } catch (err) {
      if (err instanceof SQError) {
        return ServiceResponse.validationError(err.message);
      }
      return ServiceResponse.serverError(err);
    }
  }
}
