import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';

const modelMap = {
  blog_posts: 'blogPost',
  careers: 'career',
  products: 'product',
  services: 'service',
  projects: 'project',
  skills: 'skill',
  pricing: 'pricing',
  job_applications: 'jobApplication',
  categories: 'category',
} as const;

type Collection = keyof typeof modelMap;

const getModel = (collection: string) => {
  if (!Object.prototype.hasOwnProperty.call(modelMap, collection)) {
    throw new AppError(httpStatus.BAD_REQUEST, `Unsupported content collection: ${collection}`);
  }
  return (prisma as any)[modelMap[collection as Collection]] as any;
};

const parseBoolean = (value: unknown) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === 'true';
  return undefined;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const sanitizePayload = (collection: string, payload: any) => {
  const data = { ...payload };
  if (typeof data.is_open === 'string') data.is_open = data.is_open === 'true';
  if (typeof data.published === 'string') data.published = data.published === 'true';
  if (typeof data.featured === 'string') data.featured = data.featured === 'true';

  if (collection === 'blog_posts' && typeof data.title === 'string' && !data.slug) {
    data.slug = slugify(data.title);
  }

  if (collection === 'pricing' && typeof data.features === 'string') {
    data.features = data.features
      .split(/[,\n]/)
      .map((item: string) => item.trim())
      .filter(Boolean);
  }

  return data;
};

const buildWhere = (collection: string, query: any) => {
  const where: any = {};

  if (collection === 'blog_posts' && parseBoolean(query.published) === true) {
    where.published = true;
  }
  if (collection === 'careers' && parseBoolean(query.is_open) === true) {
    where.isOpen = true;
  }
  if (collection === 'projects' && parseBoolean(query.featured) === true) {
    where.featured = true;
  }

  // Product type filter (DEMO or COMPANY)
  if (collection === 'products' && query.productType) {
    where.productType = String(query.productType).toUpperCase();
  }

  // Category filter
  if (collection === 'products' && query.category) {
    where.category = String(query.category).trim();
  }

  if (query.search) {
    const search = String(query.search).trim();
    if (search) {
      let searchFields: any[] = [];

      switch (collection) {
        case 'blog_posts':
          searchFields = [
            { title: { contains: search, mode: 'insensitive' } },
            { excerpt: { contains: search, mode: 'insensitive' } },
            { author: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } },
          ];
          break;
        case 'careers':
          searchFields = [
            { title: { contains: search, mode: 'insensitive' } },
            { department: { contains: search, mode: 'insensitive' } },
            { location: { contains: search, mode: 'insensitive' } },
            { type: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ];
          break;
        case 'products':
          searchFields = [
            { name: { contains: search, mode: 'insensitive' } },
            { tagline: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ];
          break;
        case 'services':
          searchFields = [
            { title: { contains: search, mode: 'insensitive' } },
            { icon: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ];
          break;
        case 'projects':
          searchFields = [
            { title: { contains: search, mode: 'insensitive' } },
            { category: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ];
          break;
        case 'skills':
          searchFields = [
            { technology: { contains: search, mode: 'insensitive' } },
            { level: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ];
          break;
        case 'pricing':
          searchFields = [
            { name: { contains: search, mode: 'insensitive' } },
            { price: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ];
          break;
        case 'categories':
          searchFields = [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ];
          break;
        default:
          searchFields = [
            { title: { contains: search, mode: 'insensitive' } },
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ];
      }

      if (searchFields.length > 0) {
        where.OR = searchFields;
      }
    }
  }

  return where;
};

const getAll = async (collection: string, query: any) => {
  const model = getModel(collection);
  const where = buildWhere(collection, query);

  return model.findMany({ where, orderBy: { createdAt: 'desc' } });
};

const getOne = async (collection: string, id: string) => {
  const model = getModel(collection);
  return model.findUniqueOrThrow({ where: { id } });
};

const getCount = async (collection: string, query: any) => {
  const model = getModel(collection);
  const where = buildWhere(collection, query);
  return model.count({ where });
};

const create = async (collection: string, payload: any) => {
  const model = getModel(collection);
  const data = sanitizePayload(collection, payload);
  return model.create({ data });
};

const update = async (collection: string, id: string, payload: any) => {
  const model = getModel(collection);
  const data = sanitizePayload(collection, payload);
  return model.update({ where: { id }, data });
};

const remove = async (collection: string, id: string) => {
  const model = getModel(collection);
  await model.delete({ where: { id } });
};

const applyToCareer = async (careerId: string, payload: any) => {
  await prisma.career.findUniqueOrThrow({ where: { id: careerId } });
  const data = {
    careerId,
    name: payload.name,
    email: payload.email,
    resumeUrl: payload.resumeUrl ?? payload.resume_url ?? null,
    coverLetter: payload.coverLetter ?? payload.cover_letter ?? null,
  };
  return prisma.jobApplication.create({ data });
};

export const ContentServices = {
  getAll,
  getOne,
  getCount,
  create,
  update,
  remove,
  applyToCareer,
};
