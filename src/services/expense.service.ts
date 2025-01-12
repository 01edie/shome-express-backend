import { Op, Sequelize, Error as SQError } from "sequelize";
import { ServiceResponse } from "./ServiceResponse";
import { models, sequelize } from "../db/database";
import {
  Expense,
  ExpenseCreationAttributes,
  InventoryCreationAttributes,
} from "../models/init-models";
import moment from "moment";

export class ExpenseService {
  static async createExpenseWithInventory(
    expenseData: ExpenseCreationAttributes
  ): Promise<ServiceResponse<{ expenseId: number; inventoryId: number }>> {
    // Start the transaction
    const t = await sequelize.transaction();

    try {
      // Step 1: Create the Expense
      const expense = await models.Expense.create(expenseData, {
        transaction: t,
      });
      let inventoryId = 0;

      // Step 2: Check if 'is_assign_later' is true and 'transaction_type' is 'boarder_expense' or 'employee_expense'
      if (
        expense.transactionType === "boarder_expense" ||
        expense.transactionType === "employee_expense"
      ) {
        if (expense.isAssignLater) {
          // Step 3: Create the Inventory
          const expenseItem = await expense.getExpenseName();
          const inventoryData: InventoryCreationAttributes = {
            itemName: expenseItem.expenseName,
            unit: expenseItem.unit,
            quantity: expense.quantity,
            costPerUnit: expense.userUnitAmount,
            description: expense.description,
            expenseId: expense.id,
            stockingDate: moment().format("YYYY-MM-DD"),
          };
          const inventory = await models.Inventory.create(inventoryData, {
            transaction: t,
          });
          inventoryId = inventory.id;
        }
      }

      // Step 5: Commit the transaction
      await t.commit();
      return ServiceResponse.successCreated({
        expenseId: expense.id,
        inventoryId,
      });
    } catch (err) {
      // Step 6: Rollback the transaction in case of error
      await t.rollback();
      if (err instanceof SQError) {
        return ServiceResponse.validationError(err.message);
      }
      return ServiceResponse.serverError(err);
    }
  }

  // Get all Expenses (// !inventoryAssignment)
  static async getAllExpenses(): Promise<ServiceResponse<Expense[]>> {
    try {
      const expenses = await models.Expense.findAll({
        where: {
          fromInventoryAssignment: false,
        },
        include: [
          {
            model: models.ExpenseName,
            as: "expenseName",
            attributes: ["expenseName", "unit", "expenseClassId"],
            include: [
              {
                model: models.ExpenseClass,
                as: "expenseClass",
                attributes: ["className"],
              },
            ],
          },
          {
            model: models.Boarder,
            as: "boarder",
            attributes: ["firstName", "lastName"],
          },
          {
            model: models.Employee,
            as: "employee",
            attributes: ["firstName", "lastName"],
          },
        ],
        order:[['transaction_date','DESC']]
      });
      return ServiceResponse.success(expenses);
    } catch (err) {
      if (err instanceof SQError) {
        return ServiceResponse.validationError(err.message);
      }
      return ServiceResponse.serverError(err);
    }
  }

  // Get Expense by ID
  static async getExpenseById(id: number): Promise<ServiceResponse<Expense>> {
    try {
      const expense = await models.Expense.findByPk(id);
      if (!expense) {
        return ServiceResponse.notFound();
      }
      return ServiceResponse.success(expense);
    } catch (err) {
      if (err instanceof SQError) {
        return ServiceResponse.validationError(err.message);
      }
      return ServiceResponse.serverError(err);
    }
  }

  // update transaction
  static async updateExpense(
    id: number,
    params: ExpenseCreationAttributes
  ): Promise<ServiceResponse<{ id: number }>> {
    const t = await sequelize.transaction();

    try {
      const expense = await models.Expense.findByPk(id, { transaction: t });
      if (!expense) {
        await t.rollback();
        return ServiceResponse.notFound();
      }

      // Step 1: Update the Expense
      await expense.update(params, { transaction: t });

      // Step 2: Check for special conditions
      if (
        (params.transactionType === "boarder_expense" ||
          params.transactionType === "employee_expense") &&
        params.isAssignLater
      ) {
        const itemName = (await expense.getExpenseName()).expenseName;
        // Step 3: Update or create Inventory
        const inventoryData = {
          expenseId: expense.id,
          itemName,
          description: expense.description,
          quantity: expense.quantity,
          costPerUnit: expense.userUnitAmount,
        };

        // Check if an inventory record exists for this expense
        let inventory = await models.Inventory.findOne({
          where: { expenseId: expense.id },
          transaction: t,
        });

        if (inventory) {
          // Update existing inventory
          if (inventory.inUse && expense.quantity !== inventory.quantity) {
            await t.rollback();
            return ServiceResponse.validationError(
              "Item assignment already started, can not edit quantity now"
            );
          }
          await inventory.update(inventoryData, { transaction: t });
        } else {
          // Create new inventory
          await models.Inventory.create(inventoryData, { transaction: t });
        }
      }

      // Commit transaction
      await t.commit();
      return ServiceResponse.successUpdated({ id: expense.id });
    } catch (err) {
      await t.rollback(); // Rollback transaction on error

      if (err instanceof SQError) {
        return ServiceResponse.validationError(err.message);
      }
      return ServiceResponse.serverError(err);
    }
  }
}
