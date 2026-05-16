import { FastifyReply, FastifyRequest } from 'fastify';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../errors/AppError';
import prisma from '../utils/prisma';
import { verifyToken } from '../utils/verifyToken';

// TypeScript এর জন্য Fastify Request এ user property declare করবো
// declare module 'fastify' {
//   interface FastifyRequest {
//     user?: {
//       userId: string;
//       role?: string;
//       [key: string]: any;
//     };
//   }
// }

const auth = (...roles: string[]) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Authorization header থেকে token নেয়া (Bearer টোকেন ধরে নিচ্ছি)
      const authHeader = request.headers.authorization;

      if (!authHeader) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      const token = authHeader.startsWith('Bearer ')
        ? authHeader.substring(7)
        : authHeader;

      const verifyUserToken = verifyToken(token, config.jwt.access_secret as Secret);

      // ইউজার আছে কিনা চেক করা
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: verifyUserToken.id,
        },
      });

      if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      // request এ user যোগ করা
      request.user = { userId: verifyUserToken.id, role: verifyUserToken.role };
     

      // Role চেক করা (যদি roles দেয়া থাকে)
      if (roles.length && !roles.includes(verifyUserToken.role)) {
        throw new AppError(httpStatus.FORBIDDEN, 'Forbidden!');
      }

    } catch (error) {
      // Fastify এ error throw করলে handled হয়
      throw error;
    }
  };
};

export default auth;
