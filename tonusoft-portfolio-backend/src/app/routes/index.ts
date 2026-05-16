import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import AuthRouters from '../modules/Auth/auth.routes';
import UserRouters from '../modules/User/user.routes';
import ContentRouters from '../modules/Content/content.routes';
// import BlogRouters from '../modules/Blogs/blogs.routes';
// import CommentRouters from '../modules/Comments/comments.routes';
// import LikeRouters from '../modules/Likes/likes.routes';
import { upload } from '../middlewares/upload';
import { uploadFile } from '../utils/uploadFile';


async function appRoutes(fastify: FastifyInstance) {
  fastify.register(AuthRouters, { prefix: '/auth' });
  fastify.register(UserRouters, { prefix: '/users' });
  fastify.register(ContentRouters, { prefix: '/content' });

 


  // single file upload
// fastify.post(
//   '/upload',
//   { preHandler: upload.single('upload') },
//   async (request: any, reply: any) => {
//     const file = request.file;

//     if (!file) {
//       return reply.status(400).send({ success: false, error: 'No file provided' });
//     }

//     const result = await uploadFile(file);

//     if (result.success) {
//       return reply.status(200).send({ success: true, url: result.url });
//     } else {
//       return reply.status(400).send({ success: false, error: result.error });
//     }
//   }
// );



fastify.post(
  '/upload',
  { preHandler: upload.array('upload', 20) }, // max 20 files
  async (request: any, reply: FastifyReply) => {
    const files = request.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return reply.status(400).send({ success: false, error: 'No files provided' });
    }

    try {
      const results = await Promise.all(files.map(file => uploadFile(file)));

      const success = results.filter(r => r.success);
      const failed = results.filter(r => !r.success);

      return reply.status(200).send({
        success: failed.length === 0,
        uploaded: success,
        failed,
      });
    } catch (error) {
      console.error('Error uploading files:', error);
      return reply.status(500).send({ success: false, error: 'Internal Server Error' });
    }
  }
);




}

export default appRoutes;
