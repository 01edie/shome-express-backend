"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mimeTypes = exports.UserRoles = exports.validationsRegex = exports.OPS_RES_MESSAGES = exports.HTTP_STATUS = void 0;
exports.HTTP_STATUS = {
    OK: {
        code: 200,
        message: "Success",
    },
    CREATED: {
        code: 201,
        message: "Created successfully",
    },
    VALIDATION_ERROR: {
        code: 400,
        message: "Bad request",
    },
    UNAUTHENTICATED: {
        code: 401,
        message: "Unauthenticated",
    },
    UNAUTHORIZED: {
        code: 403,
        message: "Unauthorized",
    },
    NOT_FOUND: {
        code: 404,
        message: "Not found",
    },
    SERVER_ERROR: {
        code: 500,
        message: "Internal server error",
    },
};
exports.OPS_RES_MESSAGES = {
    created: "Data added successfully",
    updated: "Data updated successfully",
    deleted: "Data deleted successfully",
    not_found: "Data not found",
    user_created: "User successfully created",
    user_exists: "User already exists with provided username",
    user_invalid: "Invalid credentials",
    server_error: "Something went wrong",
    invalid_refresh_token: "Invalid refresh token or expired",
};
exports.validationsRegex = {
    phoneRegex: new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])*?$/),
    postalCodeRegex: new RegExp(/^[A-Za-z0-9\s\-]*$/),
    passwordRegex: new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/),
};
exports.UserRoles = {
    Administrator: 1,
    Management: 2,
    Operator: 3,
};
exports.mimeTypes = {
    excel: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};
