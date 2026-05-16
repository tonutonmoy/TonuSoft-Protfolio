import { FastifyReply, FastifyRequest } from 'fastify';

const catchAsync = (fn: (req: FastifyRequest, reply: FastifyReply) => Promise<any>) => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      await fn(req, reply);
    } catch (err) {
      // Fastify তে error throw করলে global error handler কাজ করবে
      reply.send(err);
    }
  };
};

export default catchAsync;
