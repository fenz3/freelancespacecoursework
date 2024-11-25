import { Router } from 'express';
import { AttributeController } from './category.controller';

const router = Router();

const attributeController = new AttributeController();

router.get('/', attributeController.getAll);

export default router;
