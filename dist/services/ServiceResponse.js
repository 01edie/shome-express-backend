"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceResponse = void 0;
const constants_1 = require("../types/constants");
const logger_service_1 = __importDefault(require("./logger.service"));
class ServiceResponse {
    constructor(success, statusCode, data, error, message) {
        this.success = success;
        this.statusCode = statusCode;
        this.data = data;
        this.error = error;
        this.message = message;
    }
    toJSON() {
        return {
            data: this.data,
            message: this.message,
            error: this.error,
        };
    }
    static success(data, message, statusCode = constants_1.HTTP_STATUS.OK.code) {
        return new ServiceResponse(true, statusCode, data, undefined, message);
    }
    static successCreated(data, message = constants_1.OPS_RES_MESSAGES.created, statusCode = constants_1.HTTP_STATUS.CREATED.code) {
        return new ServiceResponse(true, statusCode, data, undefined, message);
    }
    static successUpdated(data, message = constants_1.OPS_RES_MESSAGES.updated, statusCode = constants_1.HTTP_STATUS.OK.code) {
        return new ServiceResponse(true, statusCode, data, undefined, message);
    }
    static successDeleted(message = constants_1.OPS_RES_MESSAGES.deleted, statusCode = constants_1.HTTP_STATUS.OK.code) {
        return new ServiceResponse(true, statusCode, undefined, undefined, message);
    }
    static validationError(error, statusCode = constants_1.HTTP_STATUS.VALIDATION_ERROR.code) {
        return new ServiceResponse(false, statusCode, undefined, error);
    }
    static notFound() {
        return new ServiceResponse(false, constants_1.HTTP_STATUS.NOT_FOUND.code, undefined, undefined, constants_1.OPS_RES_MESSAGES.not_found);
    }
    static serverError(error, statusCode = constants_1.HTTP_STATUS.SERVER_ERROR.code) {
        // console.log({ error });
        // console.log("type of err", typeof error);
        // console.log("message", error.message, "stack", error.stack, "name", error.name);
        // console.log(JSON.stringify(error.stack));
        if (error instanceof Error) {
            logger_service_1.default.error(error.stack);
        }
        else if (typeof error === "string") {
            logger_service_1.default.error(error);
        }
        else {
            logger_service_1.default.error(JSON.stringify(error));
        }
        return new ServiceResponse(false, statusCode, undefined, undefined, constants_1.OPS_RES_MESSAGES.server_error);
    }
}
exports.ServiceResponse = ServiceResponse;
