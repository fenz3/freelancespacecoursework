import { NextFunction, Request, Response } from 'express';
import { ServiceService } from './service.service';
import { BaseController } from '~/libs/core/base-controller';
import {
  GetAllRequestDto,
  ListingCreateRequestSchema,
} from '~/libs/common/common';
import { AuthRequest } from '~/libs/middleware/auth.middleware';
import { ImageService } from '../images/image.service';

class ServiceController extends BaseController {
  private serviceService = new ServiceService();
  private imageService = new ImageService();

  public create = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: AuthRequest, res: Response) => {
        const userId = req.user?.id as string;
        const { coverImages, portfolioItems } = req.files as {
          [field: string]: Express.Multer.File[];
        };
        const imageUrls = await Promise.all(
          coverImages.map((file) =>
            this.imageService.upload(file.path, file.originalname)
          )
        );
        const portfolioUrls = await Promise.all(
          portfolioItems.map((file) =>
            this.imageService.upload(file.path, file.originalname)
          )
        );
        const serviceData = {
          ...req.body,
          userId,
          coverImages: imageUrls,
          portfolioItems: portfolioUrls,
        };
        const service = await this.serviceService.create(serviceData, +userId);
        this.sendResponse(res, service, 201);
      },
      ListingCreateRequestSchema
    );

  public getById = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const service = await this.serviceService.getById(req.params.id);
      if (!service) {
        this.sendResponse(res, { error: 'Service not found' }, 404);
        return;
      }
      this.sendResponse(res, service, 200);
    });

  public getAll = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const {
        page = 1,
        pageSize = 10,
        name,
      } = req.query as unknown as GetAllRequestDto;

      const services = await this.serviceService.getAll({
        page,
        pageSize,
        name,
      });
      this.sendResponse(res, services, 200);
    });

  public update = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: AuthRequest, res: Response) => {
        const userId = req.user?.id as string;
        const serviceId = req.params.id;

        const checkService = await this.serviceService.getById(serviceId);
        if (userId !== checkService?.creatorId.toString()) {
          this.sendResponse(res, { error: 'Update forbidden' }, 403);
          return;
        }
        const { coverImages, portfolioItems } = req.files as {
          [field: string]: Express.Multer.File[];
        };
        const imageUrls = await Promise.all(
          coverImages.map((file) =>
            this.imageService.upload(file.path, file.originalname)
          )
        );
        const portfolioUrls = await Promise.all(
          portfolioItems.map((file) =>
            this.imageService.upload(file.path, file.originalname)
          )
        );
        const serviceData = {
          ...req.body,
          userId,
          coverImages: imageUrls,
          portfolioItems: portfolioUrls,
        };
        const service = await this.serviceService.update(
          serviceId,
          serviceData
        );
        this.sendResponse(res, service, 200);
      }
    );

  public delete = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const service = await this.serviceService.delete(req.params.id);
      if (!service) {
        this.sendResponse(res, { error: 'Service not found' }, 404);
        return;
      }
      this.sendResponse(res, true, 200);
    });
}

export { ServiceController };
