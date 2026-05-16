import { FastifyReply, FastifyRequest } from 'fastify';

// এটা Express style validateRequest কে Fastify compatible করে তোলে
const fastifyValidateRequest = (schema: any) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // validateRequest middleware async হলে Promise resolve করবে
      await new Promise<void>((resolve, reject) => {
        // Express middleware এর মতো signature
        schema(request, reply, (err?: any) => {
          if (err) reject(err);
          else resolve();
        });
      });
    } catch (error) {
      reply.status(400).send(error);
    }
  };
};

export default fastifyValidateRequest;
