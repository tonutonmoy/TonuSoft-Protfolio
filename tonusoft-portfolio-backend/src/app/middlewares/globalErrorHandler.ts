import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { ZodError } from 'zod';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import AppError from '../errors/AppError';
import handleZodError from '../errors/handleZodError';

const globalErrorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  console.error(error);

  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorDetails: Record<string, any> = {};

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode || 400;
    message = simplifiedError?.message || 'Validation error';
    errorDetails = simplifiedError?.errorDetails || {};
  } else if ((error as any)?.code === 'P2002') {
    statusCode = 409;
    message = `Duplicate entity on the fields: ${(error as any)?.meta?.target}`;
    errorDetails = { code: (error as any)?.code, target: (error as any)?.meta?.target };
  } else if ((error as any)?.code === 'P2003') {
    statusCode = 400;
    message = `Foreign key constraint failed on the field: ${(error as any)?.meta?.field_name}`;
    errorDetails = {
      code: (error as any)?.code,
      field: (error as any)?.meta?.field_name,
      model: (error as any)?.meta?.modelName,
    };
  } else if ((error as any)?.code === 'P2011') {
    statusCode = 400;
    message = `Null constraint violation on the field: ${(error as any)?.meta?.field_name}`;
    errorDetails = { code: (error as any)?.code, field: (error as any)?.meta?.field_name };
  } else if ((error as any)?.code === 'P2025') {
    statusCode = 404;
    message = `Record not found: ${(error as any)?.meta?.cause || 'No matching record found'}`;
    errorDetails = { code: (error as any)?.code, cause: (error as any)?.meta?.cause };
  } else if (error instanceof PrismaClientValidationError) {
    statusCode = 400;
    message = 'Validation error in Prisma operation';
    errorDetails = { message: error.message };
  } else if (error instanceof PrismaClientKnownRequestError) {
    statusCode = 400;
    message = error.message;
    errorDetails = { code: error.code, meta: error.meta };
  } else if (error instanceof PrismaClientUnknownRequestError) {
    statusCode = 500;
    message = error.message;
    errorDetails = error;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errorDetails = { stack: error.stack };
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Expired token';
    errorDetails = { stack: error.stack };
  } else if (error instanceof Error) {
    message = error.message;
    errorDetails = { stack: error.stack };
  }

  reply.status(statusCode).send({
    success: false,
    message,
    errorDetails,
  });
};

export default globalErrorHandler;
