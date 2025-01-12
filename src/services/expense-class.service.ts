import { Op, Error as SQError } from "sequelize";
import { ServiceResponse } from "./ServiceResponse";
import { models } from "../db/database";
import { ExpenseClass } from "../models/init-models";

export class ExpenseClassService {
  // Create a new Expense Class
  static async createExpenseClass(params: {
    className: string;
    description: string;
  }): Promise<ServiceResponse<{ id: number }>> {
    try {
      const { className, description } = params;

      // if classname exists
      const doesExist = await models.ExpenseClass.findOne({
        where: {
          className: {
            [Op.iLike]: className,
          },
        },
      });

      if (doesExist) {
        return ServiceResponse.validationError("Expense class already exists");
      }
      // ---

      const newExpenseClass = await models.ExpenseClass.create({
        className,
        description,
      });

      return ServiceResponse.successCreated({ id: newExpenseClass.id });
    } catch (err) {
      if (err instanceof SQError) {
        return ServiceResponse.validationError(err.message);
      }
      return ServiceResponse.serverError(err);
    }
  }

  // Get all Expense Classes
  static async getAllExpenseClasses(): Promise<
    ServiceResponse<ExpenseClass[]>
  > {
    try {
      const expenseClasses = await models.ExpenseClass.findAll();
      return ServiceResponse.success(expenseClasses);
    } catch (err) {
      if (err instanceof SQError) {
        return ServiceResponse.validationError(err.message);
      }
      return ServiceResponse.serverError(err);
    }
  }

  // Get an Expense Class by ID
  static async getExpenseClassById(
    id: number
  ): Promise<ServiceResponse<ExpenseClass>> {
    try {
      const expenseClass = await models.ExpenseClass.findByPk(id);
      if (!expenseClass) {
        return ServiceResponse.notFound();
      }
      return ServiceResponse.success(expenseClass);
    } catch (err) {
      if (err instanceof SQError) {
        return ServiceResponse.validationError(err.message);
      }
      return ServiceResponse.serverError(err);
    }
  }

  // Update an Expense Class
  static async updateExpenseClass(
    id: number,
    params: { className?: string; description?: string }
  ): Promise<ServiceResponse<{ id: number }>> {
    try {
      const expenseClass = await models.ExpenseClass.findByPk(id);
      if (!expenseClass) {
        return ServiceResponse.notFound();
      }

      const { className, description } = params;

      // if classname exists
      const doesExist = await models.ExpenseClass.findOne({
        where: {
          className: {
            [Op.iLike]: className,
          },
          id: {
            [Op.ne]: id,
          },
        },
      });

      if (doesExist) {
        return ServiceResponse.validationError("Expense class already exists");
      }
      // ---

      await expenseClass.update({ className, description });
      return ServiceResponse.successUpdated({ id: expenseClass.id });
    } catch (err) {
      if (err instanceof SQError) {
        return ServiceResponse.validationError(err.message);
      }
      return ServiceResponse.serverError(err);
    }
  }
}
