import { NextFunction, Request, Response } from 'express';
import { BaseController } from '~/libs/core/base-controller';
import { CategoryService } from './category.service';

class AttributeController extends BaseController {
  private categoryService = new CategoryService();

  public getAll = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const categories = await this.categoryService.getAll();
      this.sendResponse(res, categories, 200);
    });
}

export { AttributeController };
