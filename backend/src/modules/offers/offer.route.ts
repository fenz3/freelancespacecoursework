import { Router } from 'express';
import { OfferController } from './offer.controller';
import authMiddleware from '~/libs/middleware/auth.middleware';
import multer from 'multer';

const router = Router();

const offerController = new OfferController();
const upload = multer({ dest: 'uploads/' });

router.post(
  '/',
  authMiddleware,
  upload.array('detailsFiles', 5),
  offerController.create
);
router.patch('/:id/accept', authMiddleware, offerController.accept);
router.patch('/:id/reject', authMiddleware, offerController.reject);
router.get('/order/:orderId', authMiddleware, offerController.findAllByOrderId);
router.get(
  '/order/:orderId/latest',
  authMiddleware,
  offerController.findLatestByOrderId
);

export default router;
