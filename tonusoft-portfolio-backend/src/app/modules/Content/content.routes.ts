import { FastifyPluginAsync } from 'fastify';
import { ContentControllers } from './content.controller';
import auth from '../../middlewares/auth';

const ContentRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/:collection/count', ContentControllers.getCount);
  fastify.get('/careers/:id/apply', ContentControllers.getCareerById);

  fastify.get('/:collection', ContentControllers.getAll);
  fastify.get('/:collection/:id', ContentControllers.getOne);
  fastify.post('/:collection', { preValidation: [auth('ADMIN', 'SUPERADMIN')] }, ContentControllers.create);
  fastify.put('/:collection/:id', { preValidation: [auth('ADMIN', 'SUPERADMIN')] }, ContentControllers.update);
  fastify.delete('/:collection/:id', { preValidation: [auth('ADMIN', 'SUPERADMIN')] }, ContentControllers.remove);
  fastify.post('/careers/:id/apply', ContentControllers.applyToCareer);
};

export default ContentRoutes;
