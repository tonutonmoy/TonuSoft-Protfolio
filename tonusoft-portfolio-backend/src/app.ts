import Fastify from 'fastify';
import cors from '@fastify/cors';
import httpStatus from 'http-status';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import authenticate from './app/plugins/authenticate'; // 👈 ADD THIS LINE
import multipart from '@fastify/multipart';







const app = Fastify({
  logger: true,
});

app.register(cors, {
  origin: ['https://tonusoft.com', 'https://www.tonusoft.com'],
  credentials: true,
});

// 👇 Register authenticate plugin BEFORE routes
app.register(authenticate); // 👈 ADD THIS LINE
app.register(multipart);
app.get('/', async (request, reply) => {
  reply.send({ message: 'The server is running. . .' });
});

app.register(router, { prefix: '/api/v1' });

app.setErrorHandler(globalErrorHandler);

app.setNotFoundHandler((request, reply) => {
  reply.status(httpStatus.NOT_FOUND).send({
    success: false,
    message: 'API NOT FOUND!',
    error: {
      path: request.raw.url,
      message: 'Your requested path is not found!',
    },
  });
});

export default app;
