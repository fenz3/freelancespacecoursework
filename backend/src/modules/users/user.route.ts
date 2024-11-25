import express from 'express';
import { UserController } from './user.controller';
import authMiddleware from '~/libs/middleware/auth.middleware';

const router = express.Router();

const userController = new UserController();

router.post('/sign-up', userController.signUp);
router.post('/sign-in', userController.signIn);
router.get(
  '/authenticated-user',
  authMiddleware,
  userController.getAuthenticatedUser
);

export default router;
