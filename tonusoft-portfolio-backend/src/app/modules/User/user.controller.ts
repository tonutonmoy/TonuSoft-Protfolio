import { FastifyRequest, FastifyReply } from 'fastify';
import httpStatus from 'http-status';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const payload = request.body as any;
  const user = await UserServices.registerUserIntoDB(payload);
  return sendResponse(reply, {
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: user,
  });
};

const getAllUsers = async (request: FastifyRequest, reply: FastifyReply) => {
  const query = request.query;
  const { meta, result } = await UserServices.getAllUsersFromDB(query);
  return sendResponse(reply, {
    statusCode: httpStatus.OK,
    message: 'Users fetched successfully',
    meta,
    data: result,
  });
};

const getMyProfile = async (request: FastifyRequest, reply: FastifyReply) => {
  const userId = (request.user as any).userId;
  const profile = await UserServices.getMyProfileFromDB(userId);
  return sendResponse(reply, {
    statusCode: httpStatus.OK,
    data: profile,
  });
};

const updateMyProfile = async (request: FastifyRequest, reply: FastifyReply) => {
  const userId = (request.user as any).userId;
  const payload = request.body as any;
  const updatedUser = await UserServices.updateUserFromDB(userId, payload);
  return sendResponse(reply, {
    statusCode: httpStatus.OK,
    message: 'Profile updated successfully',
    data: updatedUser,
  });
};

const changePassword = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.user;
  const payload = request.body as { oldPassword: string; newPassword: string };
  const result = await UserServices.changePassword(user, payload);
  return sendResponse(reply, {
    statusCode: httpStatus.OK,
    message: result.message,
    data: null,
  });
};

const resendVerificationEmail = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email } = request.body as { email: string };
  const user = await UserServices.resendUserVerificationEmail(email);
  return sendResponse(reply, {
    statusCode: httpStatus.OK,
    message: 'Verification email sent',
    data: user,
  });
};

const verifyEmail = async (request: FastifyRequest, reply: FastifyReply) => {
  const token = (request.query as any).token as string;
  try {
    const user = await UserServices.verifyUserEmail(reply.raw as any, token);
    if (!user) {
      // response already sent inside service for failed verification
      return;
    }
    // success response sent inside service
    return;
  } catch (error) {
    reply.status(httpStatus.BAD_REQUEST).send({ message: (error as Error).message });
  }
};

const requestPasswordReset = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email } = request.body as { email: string };
  const result = await UserServices.requestPasswordReset(email);
  return sendResponse(reply, {
    statusCode: httpStatus.OK,
    message: result.message,
    data: null,
  });
};

const verifyOtp = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, otp } = request.body as { email: string; otp: string };
  const result = await UserServices.verifyOtp(email, otp);
  return sendResponse(reply, {
    statusCode: httpStatus.OK,
    message: result.message,
    data: null,
  });
};

const resetPassword = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, newPassword } = request.body as { email: string; newPassword: string };
  const result = await UserServices.resetPassword(email, newPassword);
  return sendResponse(reply, {
    statusCode: httpStatus.OK,
    message: result.message,
    data: null,
  });
};

const sendPasswordResetOtp = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email } = request.body as { email: string };
  const result = await UserServices.sendPasswordResetOtp(email);
  return sendResponse(reply, {
    statusCode: httpStatus.OK,
    message: result?.message,
    data: null,
  });
};

export const UserControllers = {
  registerUser,
  getAllUsers,
  getMyProfile,
  updateMyProfile,
  changePassword,
  resendVerificationEmail,
  verifyEmail,
  requestPasswordReset,
  verifyOtp,
  resetPassword,
  sendPasswordResetOtp,
};
