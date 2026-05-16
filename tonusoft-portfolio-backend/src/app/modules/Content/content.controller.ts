import { FastifyReply, FastifyRequest } from 'fastify';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { ContentServices } from './content.service';

const getAll = async (request: FastifyRequest, reply: FastifyReply) => {
  const collection = (request.params as any).collection as string;
  const data = await ContentServices.getAll(collection, request.query as any);
  return sendResponse(reply, {
    statusCode: httpStatus.OK,
    message: 'Items fetched successfully',
    data,
  });
};

const getOne = async (request: FastifyRequest, reply: FastifyReply) => {
  const collection = (request.params as any).collection as string;
  const id = (request.params as any).id as string;
  const data = await ContentServices.getOne(collection, id);
  return sendResponse(reply, {
    statusCode: httpStatus.OK,
    message: 'Item fetched successfully',
    data,
  });
};

const getCount = async (request: FastifyRequest, reply: FastifyReply) => {
  const collection = (request.params as any).collection as string;
  const count = await ContentServices.getCount(collection, request.query as any);
  return sendResponse(reply, {
    statusCode: httpStatus.OK,
    message: 'Count fetched successfully',
    data: { count },
  });
};

const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const collection = (request.params as any).collection as string;
  const payload = request.body as any;
  const data = await ContentServices.create(collection, payload);
  return sendResponse(reply, {
    statusCode: httpStatus.CREATED,
    message: 'Item created successfully',
    data,
  });
};

const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const collection = (request.params as any).collection as string;
  const id = (request.params as any).id as string;
  const payload = request.body as any;
  const data = await ContentServices.update(collection, id, payload);
  return sendResponse(reply, {
    statusCode: httpStatus.OK,
    message: 'Item updated successfully',
    data,
  });
};

const remove = async (request: FastifyRequest, reply: FastifyReply) => {
  const collection = (request.params as any).collection as string;
  const id = (request.params as any).id as string;
  await ContentServices.remove(collection, id);
  return sendResponse(reply, {
    statusCode: httpStatus.OK,
    message: 'Item deleted successfully',
    data: null,
  });
};

const getCareerById = async (request: FastifyRequest, reply: FastifyReply) => {
  const id = (request.params as any).id as string;
  const data = await ContentServices.getOne('careers', id);
  return sendResponse(reply, {
    statusCode: httpStatus.OK,
    message: 'Career fetched successfully',
    data,
  });
};

const applyToCareer = async (request: FastifyRequest, reply: FastifyReply) => {
  const id = (request.params as any).id as string;
  const payload = request.body as any;
  const data = await ContentServices.applyToCareer(id, payload);
  return sendResponse(reply, {
    statusCode: httpStatus.CREATED,
    message: 'Application received successfully',
    data,
  });
};

export const ContentControllers = {
  getAll,
  getOne,
  getCount,
  create,
  update,
  remove,
  getCareerById,
  applyToCareer,
};
