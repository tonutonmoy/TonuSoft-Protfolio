// src/app/plugins/authenticate.ts
import { FastifyPluginAsync } from 'fastify';

const authenticate: FastifyPluginAsync = async (fastify) => {
  fastify.decorate('authenticate', async function (request:any, reply:any) {
    try {
      // Example JWT verify
      await request.jwtVerify(); // যদি @fastify/jwt ইউজ করো
    } catch (err) {
      reply.code(401).send({ message: 'Unauthorized' });
    }
  });
};

export default authenticate;
