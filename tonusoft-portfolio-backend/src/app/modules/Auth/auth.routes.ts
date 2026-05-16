import { FastifyPluginAsync } from 'fastify';
import { AuthControllers } from './auth.controller';
import { authValidation } from './auth.validation';
import fastifyValidateRequest from '../../middlewares/fastifyValidateRequest';


const AuthRouters: FastifyPluginAsync = async (fastify) => {
  fastify.post(
    '/login',
    // {
    //   preValidation: fastifyValidateRequest(authValidation.loginUser),
    // },
    AuthControllers.loginUser
  );
};

export default AuthRouters;
