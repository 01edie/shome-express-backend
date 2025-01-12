export interface LoginParams {
  username: string;
  password: string;
}

export interface RefreshTokenParams {
  refreshTokenValue: string;
}

export interface UserToken {
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
  };
}

export interface LogInRes extends UserToken {
  user: Partial<User>;
}
