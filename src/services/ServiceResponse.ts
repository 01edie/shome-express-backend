import { HTTPStatus } from "../types";
import { HTTP_STATUS, OPS_RES_MESSAGES } from "../types/constants";
import logger from "./logger.service";

export class ServiceResponse<T> {
  public success: boolean;
  public data?: T;
  public error?: any;
  public statusCode: HTTPStatus;
  public message?: string;

  constructor(
    success: boolean,
    statusCode: HTTPStatus,
    data?: T,
    error?: any,
    message?: string
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.data = data;
    this.error = error;
    this.message = message;
  }

  public toJSON() {
    return {
      data: this.data,
      message: this.message,
      error: this.error,
    };
  }

  static success<T>(
    data: T,
    message?: string,
    statusCode: HTTPStatus = HTTP_STATUS.OK.code
  ): ServiceResponse<T> {
    return new ServiceResponse<T>(true, statusCode, data, undefined, message);
  }

  static successCreated<T>(
    data: T,
    message: string = OPS_RES_MESSAGES.created,
    statusCode: HTTPStatus = HTTP_STATUS.CREATED.code
  ): ServiceResponse<T> {
    return new ServiceResponse<T>(true, statusCode, data, undefined, message);
  }

  static successUpdated<T>(
    data: T,
    message: string = OPS_RES_MESSAGES.updated,
    statusCode: HTTPStatus = HTTP_STATUS.OK.code
  ): ServiceResponse<T> {
    return new ServiceResponse<T>(true, statusCode, data, undefined, message);
  }

  static successDeleted<T>(
    message: string = OPS_RES_MESSAGES.deleted,
    statusCode: HTTPStatus = HTTP_STATUS.OK.code
  ): ServiceResponse<T> {
    return new ServiceResponse<T>(
      true,
      statusCode,
      undefined,
      undefined,
      message
    );
  }

  static validationError<T>(
    error: any,
    statusCode: HTTPStatus = HTTP_STATUS.VALIDATION_ERROR.code
  ): ServiceResponse<T> {
    return new ServiceResponse<T>(false, statusCode, undefined, error);
  }

  static notFound(): ServiceResponse<any> {
    return new ServiceResponse(
      false,
      HTTP_STATUS.NOT_FOUND.code,
      undefined,
      undefined,
      OPS_RES_MESSAGES.not_found
    );
  }
  static serverError<T>(
    error: any,
    statusCode: HTTPStatus = HTTP_STATUS.SERVER_ERROR.code
  ): ServiceResponse<T> {
    // console.log({ error });
    // console.log("type of err", typeof error);

    // console.log("message", error.message, "stack", error.stack, "name", error.name);
    // console.log(JSON.stringify(error.stack));
    if (error instanceof Error) {
      logger.error(error.stack);
    } else if (typeof error === "string") {
      logger.error(error);
    } else {
      logger.error(JSON.stringify(error));
    }

    return new ServiceResponse<T>(
      false,
      statusCode,
      undefined,
      undefined,
      OPS_RES_MESSAGES.server_error
    );
  }
}
