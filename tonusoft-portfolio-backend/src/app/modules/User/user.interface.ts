
import { UserRoleEnum, UserStatus } from "./user.constant";

export interface IUserFilterRequest {
  name?: string | undefined;
  email?: string | undefined;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  status: UserStatus;

  otp?: string;
  otpExpiry?: Date;

  isEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationTokenExpires?: Date;



  createdAt: Date;
  updatedAt: Date;
}