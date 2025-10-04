export interface ILoginState {
  ok: boolean;
  message: string;
  errors: Record<string, string>;
}

export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    [k: string]: unknown;
  };
}

export interface IAuthUser {
  _id?: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  avatarURL?: string;
  authProvider?: "EMAIL" | "GOOGLE" | "GITHUB" | string;
  lastLogin?: Date;
  isEmailVerified?: boolean;
  phone?: string;
  panelType?: "ADMIN" | "USER" | "MODERATOR" | string;
  passwordChangeNeeded?: boolean;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
