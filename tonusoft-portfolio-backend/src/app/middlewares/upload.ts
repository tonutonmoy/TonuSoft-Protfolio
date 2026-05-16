import multer from 'fastify-multer';
import { FastifyRequest } from 'fastify';


export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter(
    req: FastifyRequest,
    file: any,          // fastify-multer এর File টাইপ
    cb: any
  ) {
    cb(null, true);
  }
});
