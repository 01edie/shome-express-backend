export type HTTPStatus = 200 | 201 | 400 | 401 | 403 | 404 | 500;
export type HTTPStatusNames =
  | "OK"
  | "CREATED"
  | "VALIDATION_ERROR"
  | "UNAUTHENTICATED"
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "SERVER_ERROR";


export type AccessModules = "article";

export type AccessDetails = {
  read: UserRoleId[];
  create: UserRoleId[];
  update: UserRoleId[];
  delete: UserRoleId[];
};

export type JWTParam = {
  id: number;
  roleId: number;
};

declare global {
  namespace Express {
    interface Request {
      user?: JWTParam
    }
  }
}
