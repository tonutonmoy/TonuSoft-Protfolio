import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      userId: string;
      role?: string;
      [key: string]: any;
    };
  }
}
