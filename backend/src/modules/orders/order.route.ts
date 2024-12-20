import { Router } from 'express';
import { OrderController } from './order.controller';
import authMiddleware from '~/libs/middleware/auth.middleware';
import multer from 'multer';

const router = Router();
const orderController = new OrderController();
const upload = multer({ dest: 'uploads/' });

router.post(
  '/',
  authMiddleware,
  upload.array('taskDetailsFiles', 5),
  orderController.create
);

router.get('/', authMiddleware, orderController.getAll);
router.get('/:id', authMiddleware, orderController.getById);

router.patch(
  '/:id/deliver-task',
  authMiddleware,
  upload.array('deliveryResponseFiles', 5),
  orderController.deliverTask
);

router.patch('/:id/reject-task', authMiddleware, orderController.rejectTask);

router.patch('/:id/accept-task', authMiddleware, orderController.acceptTask);

router.post('/:id/reviews', authMiddleware, orderController.createReview);

export default router;
