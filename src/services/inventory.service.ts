import { Op, Error as SQError } from "sequelize";
import { ServiceResponse } from "./ServiceResponse";
import { models, sequelize } from "../db/database";

export type InventoryAssignment = {
  quantityToAssign: number;
  boarderId?: number;
  employeeId?: number;
};

export class InventoryService {
  static async getAllInventories() {
    try {
      const inventories = await models.Inventory.findAll({
        include: {
          model: models.Expense,
          as: "expense",
          attributes: ["transactionType"],
        },
        order: [["stocking_date", "DESC"],["itemName","ASC"]],
      });
      return ServiceResponse.success(inventories);
    } catch (error) {
      if (error instanceof SQError) {
        return ServiceResponse.validationError(error.message);
      }
      return ServiceResponse.serverError(error);
    }
  }

  static async assignInventoryItem(
    inventoryId: number,
    params: InventoryAssignment
  ): Promise<ServiceResponse<{ inventoryId: number; newExpenseId: number }>> {
    const t = await sequelize.transaction(); // Start transaction
    const { quantityToAssign, boarderId, employeeId } = params;
    try {
      // Fetch inventory by ID
      const inventory = await models.Inventory.findByPk(inventoryId, {
        transaction: t,
      });
      if (!inventory) {
        await t.rollback();
        return ServiceResponse.notFound();
      }

      // Validate the quantity to assign
      if (quantityToAssign <= 0 || quantityToAssign > inventory.quantity) {
        await t.rollback();
        return ServiceResponse.validationError("Invalid quantity to assign");
      }

      // Fetch associated expense to validate transaction type
      const expense = await models.Expense.findByPk(inventory.expenseId, {
        transaction: t,
      });
      if (!expense) {
        await t.rollback();
        return ServiceResponse.validationError("Associated expense not found");
      }

      // Validate assignment logic
      if (boarderId && employeeId) {
        await t.rollback();
        return ServiceResponse.validationError(
          "Cannot assign to both a boarder and an employee simultaneously"
        );
      }
      if (!boarderId && !employeeId) {
        await t.rollback();
        return ServiceResponse.validationError(
          "Either boarderId or employeeId must be provided"
        );
      }
      if (boarderId && expense.transactionType !== "boarder_expense") {
        await t.rollback();
        return ServiceResponse.validationError(
          "Cannot assign a boarder expense to an employee"
        );
      }
      if (employeeId && expense.transactionType !== "employee_expense") {
        await t.rollback();
        return ServiceResponse.validationError(
          "Cannot assign an employee expense to a boarder"
        );
      }

      // Step 1: Deduct the quantity from the inventory
      inventory.quantity -= quantityToAssign;
      inventory.inUse = true;

      if (inventory.quantity === 0) {
        // If quantity reaches zero, delete the inventory
        await inventory.destroy({ transaction: t });
      } else {
        // Otherwise, update the inventory
        await inventory.save({ transaction: t });
      }

      // Step 2: Create a new expense record for the assignment
      const newExpense = await models.Expense.create(
        {
          transactionDate: new Date(),
          transactionType: expense.transactionType,
          expenseNameId: expense.expenseNameId,
          quantity: quantityToAssign,
          description: expense.description,
          totalAmount: 0, // As required
          isAssignLater: false,
          userUnitAmount: expense.userUnitAmount,
          boarderId: boarderId,
          employeeId: employeeId,
          fromInventoryAssignment: true, // identifier
          targetMonth: expense.targetMonth,
          notes: expense.notes,
        },
        { transaction: t }
      );

      // Commit transaction
      await t.commit();
      return ServiceResponse.successUpdated({
        inventoryId: inventory.id,
        newExpenseId: newExpense.id,
      });
    } catch (err) {
      // Rollback transaction on error
      await t.rollback();

      if (err instanceof SQError) {
        return ServiceResponse.validationError(err.message);
      }
      return ServiceResponse.serverError(err);
    }
  }
}
