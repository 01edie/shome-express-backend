import { HTTPStatus, HTTPStatusNames } from ".";

export const HTTP_STATUS: Record<
  HTTPStatusNames,
  { code: HTTPStatus; message: string }
> = {
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

export const OPS_RES_MESSAGES = {
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

export const validationsRegex = {
  phoneRegex: new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])*?$/
  ),
  postalCodeRegex: new RegExp(/^[A-Za-z0-9\s\-]*$/),
  passwordRegex: new RegExp(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/
  ),
};

export type UserRole = "Administrator" | "Management" | "Operator";
export type UserRoleId = 1 | 2 | 3;

export const UserRoles: Record<UserRole, UserRoleId> = {
  Administrator: 1,
  Management: 2,
  Operator: 3,
};

export const mimeTypes = {
  excel: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};
