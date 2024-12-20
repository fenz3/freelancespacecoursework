import { NextFunction, Request, Response } from 'express';
import { BaseController } from '~/libs/core/base-controller';
import { CategoryService } from './category.service';

class CategoryController extends BaseController {
  private categoryService = new CategoryService();

  public getAllCategories = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const categories = await this.categoryService.getAllCategories();
      this.sendResponse(res, categories, 200);
    });

  public getSubcategoriesByCategoryId = (
    req: Request,
    res: Response,
    next: NextFunction
  ) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const subcategories =
        await this.categoryService.getSubcategoriesByCategoryId(req.params.id);
      this.sendResponse(res, subcategories, 200);
    });
}

export { CategoryController };
