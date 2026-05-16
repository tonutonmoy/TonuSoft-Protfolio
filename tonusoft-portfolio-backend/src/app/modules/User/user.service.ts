import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { verification } from '../../errors/helpers/generateEmailVerificationLink';
import prisma from '../../utils/prisma';
import Email from '../../utils/sendMail';
import {
  failedEmailVerificationHTML,
  successEmailVerificationHTML,
} from './user.constant';
import { FastifyReply } from 'fastify';

interface UserWithOptionalPassword extends Omit<User, 'password'> {
  password?: string;
}

const registerUserIntoDB = async (payload: User) => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);
  const userData = {
    ...payload,
    password: hashedPassword,
  };

    const user =await prisma.user.findFirst({where:{email:payload?.email}})

        if (user) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'user have already exist!');
      }
  const newUser = await prisma.user.create({
    data: {
      ...userData,
    },
     select:{id:true}
  });

  const userWithOptionalPassword = newUser as UserWithOptionalPassword;
  delete userWithOptionalPassword.password;

  return userWithOptionalPassword;
};

const getAllUsersFromDB = async (query: any) => {
  const select = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    role: true,
    status: true,
    image: true,
    otp: true,
    otpExpiry: true,
    isEmailVerified: true,
    emailVerificationToken: true,
    emailVerificationTokenExpires: true,
    createdAt: true,
    updatedAt: true,
  };
  const usersQuery = new QueryBuilder(prisma.user, query, { select });
  const result = await usersQuery
    .search(['firstName', 'lastName', 'email'])
    .filter()
    .sort()
    .paginate()
    .execute();
  const pagination = await usersQuery.countTotal();

  return {
    meta: pagination,
    result,
  };
};

const getMyProfileFromDB = async (id: string) => {
  const profile = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return profile;
};

const getUserDetailsFromDB = async (id: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
};

const updateMyProfileIntoDB = async (id: string, payload: any) => {
  const userProfileData = payload.Profile;
  delete payload.Profile;

  const userData = payload;

  await prisma.$transaction(async (transactionClient: any) => {
    await transactionClient.user.update({
      where: { id },
      data: userData,
    });

    await transactionClient.profile.update({
      where: { userId: id },
      data: userProfileData,
    });
  });

  const updatedUser = await prisma.user.findUniqueOrThrow({
    where: { id },
  });

  const userWithOptionalPassword = updatedUser as UserWithOptionalPassword;
  delete userWithOptionalPassword.password;

  return userWithOptionalPassword;
};

const updateUserFromDB = async (id: string, payload: User) => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: payload,
    select:{id:true,firstName:true,lastName:true,email:true}
  });

  return updatedUser;
};

const updateUserRoleStatusIntoDB = async (id: string, payload: any) => {
  const result = await prisma.user.update({
    where: { id },
    data: payload,
  });
  return result;
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: 'ACTIVE',
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password,
  );

  if (!isCorrectPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password incorrect!');
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      id: userData.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  return {
    message: 'Password changed successfully!',
  };
};

const resendUserVerificationEmail = async (email: string) => {
  const [emailVerificationLink, hashedToken] =
    verification.generateEmailVerificationLink();

  const user = await prisma.user.update({
    where: { email },
    data: {
      emailVerificationToken: hashedToken,
      emailVerificationTokenExpires: new Date(Date.now() + 3600 * 1000),
    },
  });

  const emailSender = new Email(user);
  await emailSender.sendEmailVerificationLink(
    'Email verification link',
    emailVerificationLink,
  );
  return user;
};

const verifyUserEmail = async (reply: FastifyReply, token: string) => {
  const hashedToken = verification.generateHashedToken(token);
  const user = await prisma.user.findFirst({
    where: {
      emailVerificationToken: hashedToken,
    },
  });

  if (!user) {
    await reply.type('text/html').send(failedEmailVerificationHTML(config.base_url_client as string));
    return null;
  }

  if (
    user.emailVerificationTokenExpires &&
    user.emailVerificationTokenExpires < new Date()
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Email verification token has expired. Please try resending the verification email again.',
    );
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      isEmailVerified: true,
      emailVerificationToken: null,
      emailVerificationTokenExpires: null,
    },
  });

  if (updatedUser.isEmailVerified) {
    await reply.type('text/html').send(successEmailVerificationHTML());
    return updatedUser;
  }

  return updatedUser;
};

// Generate OTP and send to user's email
const sendPasswordResetOtp = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found with this email');
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  const updated = await prisma.user.update({
    where: { email },
    data: {
      otp,
      otpExpiry,
    },
  });

  if (updated) {
    const emailSender = new Email(user);
    try {
      await emailSender.sendCustomEmail(
        'Your Password Reset OTP',
        `Your password reset code is <b>${otp}</b>. It will expire in 10 minutes.`,
      );
      return { message: 'OTP sent to your email address.' };
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to send OTP email. Please try again.');
    }
  }
};

const verifyOtpAndResetPassword = async (
  email: string,
  otp: string,
  newPassword: string,
) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.otp !== otp) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid OTP');
  }

  if (user.otpExpiry && user.otpExpiry < new Date()) {
    throw new AppError(httpStatus.BAD_REQUEST, 'OTP has expired');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
      otp: null,
      otpExpiry: null,
    },
  });

  return { message: 'Password reset successful' };
};

const requestPasswordReset = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'No user found with this email');
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 60 * 1000);

  await prisma.user.update({
    where: { email },
    data: {
      otp,
      otpExpiry,
    },
  });

  const emailSender = new Email(user);
  await emailSender.sendCustomEmail(
    'Your Password Reset Code',
    `Your 6-digit OTP is <b>${otp}</b>. It will expire in 60 seconds.`,
  );

  return { message: 'OTP sent to email', redirect: `https://sapo-frontend.vercel.app/otp/${email}` };
};

const verifyOtp = async (email: string, otp: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.otp !== otp) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid or expired OTP');
  }

  if (user.otpExpiry && user.otpExpiry < new Date()) {
    throw new AppError(httpStatus.BAD_REQUEST, 'OTP has expired');
  }

  await prisma.user.update({
    where: { email },
    data: {
      otp: null,
      otpExpiry: null,
    },
  });

  return { message: 'OTP verified', redirect: `https://sapo-frontend.vercel.app/reset-password/${email}` };
};

const resetPassword = async (email: string, newPassword: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
      otp: null,
      otpExpiry: null,
    },
  });

  return { message: 'Password reset successful. You can now log in.' };
};

export const UserServices = {
  registerUserIntoDB,
  getAllUsersFromDB,
  getMyProfileFromDB,
  getUserDetailsFromDB,
  updateMyProfileIntoDB,
  updateUserFromDB,
  updateUserRoleStatusIntoDB,
  changePassword,
  resendUserVerificationEmail,
  verifyUserEmail,
  sendPasswordResetOtp,
  verifyOtpAndResetPassword,
  requestPasswordReset,
  verifyOtp,
  resetPassword,
};
