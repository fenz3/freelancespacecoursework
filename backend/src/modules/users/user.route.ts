import express from 'express';
import { UserController } from './user.controller';
import authMiddleware from '~/libs/middleware/auth.middleware';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' }); // Configure destination folder for uploaded files
const router = express.Router();

const userController = new UserController();

router.post('/auth/sign-up', userController.signUp);
router.post('/auth/sign-in', userController.signIn);
router.get(
  '/auth/authenticated-user',
  authMiddleware,
  userController.getAuthenticatedUser
);

router.patch(
  '/users/:id',
  authMiddleware,
  upload.fields([
    { name: 'photoUrl', maxCount: 1 },
    { name: 'portfolioItems', maxCount: 10 },
  ]),
  userController.patchUser
);

export default router;
