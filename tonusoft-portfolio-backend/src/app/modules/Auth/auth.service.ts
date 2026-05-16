import * as bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import AppError from '../../errors/AppError';
import { generateToken } from '../../utils/generateToken';
import prisma from '../../utils/prisma';
import { UserServices } from '../User/user.service';

const loginUserFromDB = async (payload: {
  email: string;
  password: string;
}): Promise<{
  id: string;
  name: string;
  email: string;
  role: string;
  accessToken: string;
}> => {
  const userData = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });

     if (!userData) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'User Not Found');
      }


  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password,
  );

  if (!isCorrectPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password incorrect');
  }

  // Uncomment this block if you want to check email verification
  /*
  if (!userData.isEmailVerified) {
    await UserServices.resendUserVerificationEmail(userData.email);
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Email is not verified, Please check your email for the verification link.',
    );
  }
  */

  const accessToken = await generateToken(
    {
      id: userData.id,
      name: userData.firstName + ' ' + userData.lastName,
      email: userData.email,
      role: userData.role,
    },
    config.jwt.access_secret as Secret,
    config.jwt.access_expires_in as string,
  );

  return {
    id: userData.id,
    name: userData.firstName + ' ' + userData.lastName,
    email: userData.email,
    role: userData.role,
    accessToken,
  };
};

export const AuthServices = { loginUserFromDB };
