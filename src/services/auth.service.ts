import { Error as SQError } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ServiceResponse } from "./ServiceResponse";
import { HTTP_STATUS, OPS_RES_MESSAGES } from "../types/constants";
import {
  LoginParams,
  LogInRes,
  RefreshTokenParams,
  UserToken,
} from "../types/request-params";
// import logger from "./logger.service";
import { tokenConfig } from "../config/access-control";
import { models } from "../db/database";
import { JWTParam } from "../types";

const JWT_A_SECRET = process.env.JWT_A_SECRET!;
const JWT_R_SECRET = process.env.JWT_R_SECRET!;

const { accessTokenExpiresIn, refreshTokenExpiresIn } = tokenConfig;

export class AuthServices {
  static async loginUser(
    params: LoginParams
  ): Promise<ServiceResponse<LogInRes>> {
    const { username, password } = params;
    const invalidCredError = ServiceResponse.validationError<any>(
      OPS_RES_MESSAGES.user_invalid,
      HTTP_STATUS.UNAUTHENTICATED.code
    );
    try {
      // if user exists
      // console.log({ email, password });
      const user = await models.AppUser.findOne({ where: { username } });
      if (!user) {
        return invalidCredError;
      }

      // const isMatch = await bcrypt.compare(password, user.password);
      const isMatch = user.password === password;
      if (!isMatch) {
        return invalidCredError;
      }

      const jwtPayload: JWTParam = {
        id: user.id,
        roleId: user.roleId,
      };

      const accessToken = jwt.sign(jwtPayload, JWT_A_SECRET as string, {
        expiresIn: accessTokenExpiresIn,
      });

      const refreshToken = jwt.sign(jwtPayload, JWT_R_SECRET as string, {
        expiresIn: refreshTokenExpiresIn,
      });

      // logger.info(`User with id: ${user.username} logged in`);

      const resData: LogInRes = {
        user: {
          name: user.name,
          roleId: user.roleId,
        },
        tokens: {
          accessToken,
          refreshToken,
          expiresIn: accessTokenExpiresIn,
          refreshExpiresIn: refreshTokenExpiresIn,
        },
      };

      return ServiceResponse.success(resData);
    } catch (err: any) {
      if (err instanceof SQError) {
        return ServiceResponse.validationError(err.message);
      }
      return ServiceResponse.serverError(err);
    }
  }

  static async refreshToken(
    params: RefreshTokenParams
  ): Promise<ServiceResponse<UserToken>> {
    try {
      const { refreshTokenValue } = params;
      const jwtRes = jwt.verify(refreshTokenValue, JWT_R_SECRET) as JWTParam;

      const jwtPayload = {
        id: jwtRes.id,
        roleId: jwtRes.roleId,
      };

      const newAccessToken = jwt.sign(jwtPayload, JWT_A_SECRET, {
        expiresIn: accessTokenExpiresIn,
      });

      const newRefreshToken = jwt.sign(jwtPayload, JWT_R_SECRET as string, {
        expiresIn: refreshTokenExpiresIn,
      });

      const res = {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresIn: accessTokenExpiresIn,
        refreshExpiresIn: refreshTokenExpiresIn,
      };

      return ServiceResponse.success({ tokens: res });
    } catch (err) {
      return ServiceResponse.validationError(
        OPS_RES_MESSAGES.invalid_refresh_token,
        HTTP_STATUS.UNAUTHENTICATED.code
      );
    }
  }
}
