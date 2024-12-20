import { Router } from 'express';
import { CategoryController } from './category.controller';

const router = Router();

const categoryController = new CategoryController();

router.get('/', categoryController.getAllCategories);
router.get(
  '/:id/subcategories',
  categoryController.getSubcategoriesByCategoryId
);

export default router;
