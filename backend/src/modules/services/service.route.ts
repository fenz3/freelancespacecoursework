import { Router } from 'express';
import { ServiceController } from './service.controller';
import authMiddleware from '~/libs/middleware/auth.middleware';
import multer from 'multer';

const router = Router();

const serviceController = new ServiceController();

const upload = multer({ dest: 'uploads/' });

router.post(
  '/',
  authMiddleware,
  upload.array('coverImages', 10),
  serviceController.create
);
router.get('/:id', authMiddleware, serviceController.getById);
router.get('/', authMiddleware, serviceController.getAll);
router.patch(
  '/:id',
  authMiddleware,
  upload.array('coverImages', 10),
  serviceController.update
);
router.delete('/:id', authMiddleware, serviceController.delete);

export default router;
