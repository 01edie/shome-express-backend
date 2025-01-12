import { Op, Error as SQError } from "sequelize";
import { ServiceResponse } from "./ServiceResponse";
import { models } from "../db/database";
import {
  Employee,
  EmployeeCreationAttributes,
  EmployeeDocuments,
} from "../models/init-models";

export class EmployeeService {
  // Create new Employee
  static async createEmployee(
    params: EmployeeCreationAttributes
  ): Promise<ServiceResponse<{ id: number }>> {
    try {
      const newEmployee = await models.Employee.create(params);
      return ServiceResponse.successCreated({ id: newEmployee.id });
    } catch (err) {
      if (err instanceof SQError) {
        return ServiceResponse.validationError(err.message);
      }
      return ServiceResponse.serverError(err);
    }
  }

  // Get all Employees
  static async getAllEmployees(): Promise<ServiceResponse<Employee[]>> {
    try {
      const employees = await models.Employee.findAll();
      return ServiceResponse.success(employees);
    } catch (err) {
      if (err instanceof SQError) {
        return ServiceResponse.validationError(err.message);
      }
      return ServiceResponse.serverError(err);
    }
  }

  // Get Employee by ID
  static async getEmployeeById(id: number): Promise<ServiceResponse<Employee>> {
    try {
      const employee = await models.Employee.findByPk(id, {
        include: [{ model: EmployeeDocuments, as: "employeeDocuments" }],
      });
      if (!employee) {
        return ServiceResponse.notFound();
      }
      return ServiceResponse.success(employee);
    } catch (err) {
      if (err instanceof SQError) {
        return ServiceResponse.validationError(err.message);
      }
      return ServiceResponse.serverError(err);
    }
  }

  // Update an Employee
  static async updateEmployee(
    id: number,
    params: EmployeeCreationAttributes
  ): Promise<ServiceResponse<{ id: number }>> {
    try {
      const employee = await models.Employee.findByPk(id);
      if (!employee) {
        return ServiceResponse.notFound();
      }

      await employee.update(params);
      return ServiceResponse.successUpdated({ id: employee.id });
    } catch (err) {
      if (err instanceof SQError) {
        return ServiceResponse.validationError(err.message);
      }
      return ServiceResponse.serverError(err);
    }
  }
}
