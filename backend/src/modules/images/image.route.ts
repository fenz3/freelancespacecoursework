import { Router } from 'express';
import multer from 'multer';
import { ImageController } from './image.controller';
import authMiddleware from '~/libs/middleware/auth.middleware';

const router = Router();
const imageController = new ImageController();

const upload = multer({ dest: 'uploads/' });

router.post('/', authMiddleware, upload.single('image'), (req, res, next) =>
  imageController.upload(req, res, next)
);

export default router;
