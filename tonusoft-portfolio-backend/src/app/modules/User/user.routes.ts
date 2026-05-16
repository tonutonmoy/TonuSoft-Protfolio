import { FastifyPluginAsync } from 'fastify';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';

const UserRoutes: FastifyPluginAsync = async (fastify:any) => {
  fastify.post('/register', UserControllers.registerUser);
  fastify.get('/', UserControllers.getAllUsers);
   fastify.get('/me', { preValidation: [auth()] }, UserControllers.getMyProfile);
  fastify.put('/update', { preValidation: [auth()] }, UserControllers.updateMyProfile);
  fastify.post('/change-password',  UserControllers.changePassword);

  fastify.post('/resend-verification-email', UserControllers.resendVerificationEmail);
  fastify.get('/verify-email', UserControllers.verifyEmail);

  fastify.post('/password-reset/request', UserControllers.requestPasswordReset);
  fastify.post('/reset-password/verify-otp', UserControllers.verifyOtp);
  fastify.post('/reset-password/update', UserControllers.resetPassword);
  fastify.post('/reset-password/send-otp', UserControllers.sendPasswordResetOtp);
};

export default UserRoutes;
