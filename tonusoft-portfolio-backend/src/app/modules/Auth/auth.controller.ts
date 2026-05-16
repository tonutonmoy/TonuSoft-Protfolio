import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = async (request: any, reply: any) => {
  const { email, password } = request.body as { email: string; password: string };

  const result = await AuthServices.loginUserFromDB({ email, password });

  return sendResponse(reply, {
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: result,
  });
};

export const AuthControllers = { loginUser };
