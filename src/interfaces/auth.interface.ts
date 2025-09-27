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
