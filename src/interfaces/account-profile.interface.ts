export interface IAccountProfile {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string | null;
  isEmailVerified?: boolean;
  phone?: string;
  createdAt: Date;
}
