import { FastifyReply } from 'fastify';

type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

type TResponse<T> = {
  statusCode: number;
  success?: boolean;
  message?: string;
  meta?: TMeta;
  data: T;
};

const sendResponse = <T>(reply: FastifyReply, data: TResponse<T>) => {
  reply.status(data.statusCode).send({
    success: data.success ?? (data.statusCode < 400),
    statusCode: data.statusCode,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};

export default sendResponse;
