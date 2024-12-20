import { NextFunction, Request, Response } from 'express';
import { OrderService } from './order.service';
import { BaseController } from '~/libs/core/base-controller';
import { AuthRequest } from '~/libs/middleware/auth.middleware';
import { OrderCreateRequestDTO } from './order.model';
import { ImageService } from '../images/image.service';
import { OfferService } from '../offers/offer.service';
import { OfferCreateRequestDTO } from '../offers/offer.model';

class OrderController extends BaseController {
  private orderService = new OrderService();
  private imageService = new ImageService();
  private offerService = new OfferService();

  public getAll = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: AuthRequest, res: Response) => {
        const userId = req.user?.id;
        if (!userId) {
          this.sendResponse(res, { error: 'User ID is required' }, 400);
          return;
        }
        const orders = await this.orderService.getAll(+userId);
        this.sendResponse(res, orders, 200);
      }
    );

  public getById = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: AuthRequest, res: Response) => {
        const id = req.params.id;

        const order = await this.orderService.getById(+id);
        if (!order) {
          this.sendResponse(res, { error: 'Order not found' }, 404);
          return;
        }

        this.sendResponse(res, order, 200);
      }
    );

  public create = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: AuthRequest, res: Response) => {
        const userId = req.user?.id as unknown as number;
        const taskDetailsFiles = req.files as Express.Multer.File[];
        const taskDetailsUrls = await Promise.all(
          taskDetailsFiles.map((file) =>
            this.imageService.upload(file.path, file.originalname)
          )
        );

        const orderData: OrderCreateRequestDTO = {
          ...req.body,
          serviceId: +req.body.serviceId,
          freelancerId: +req.body.freelancerId,
          price: +req.body.price,
          deliveryTime: +req.body.deliveryTime,
          taskDetailsFiles: taskDetailsUrls,
        };

        const order = await this.orderService.create(orderData, userId);

        const offerData: OfferCreateRequestDTO = {
          orderId: order.id,
          price: +req.body.price,
          deliveryTime: +req.body.deliveryTime,
          details: req.body.taskDetails,
          detailsFiles: taskDetailsUrls,
        };
        await this.offerService.create(offerData, userId);
        this.sendResponse(res, order, 201);
      }
    );

  public deliverTask = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const { id } = req.params;
      const deliveryResponseFiles = req.files as Express.Multer.File[];
      const deliveryResponseUrls = await Promise.all(
        deliveryResponseFiles.map((file) =>
          this.imageService.upload(file.path, file.originalname)
        )
      );
      const { deliveryResponse } = req.body;

      const deliveredOrder = await this.orderService.deliverTask(
        Number(id),
        deliveryResponse,
        deliveryResponseUrls
      );

      this.sendResponse(res, deliveredOrder, 200);
    });

  public rejectTask = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const { id } = req.params;
      const { rejectNotes } = req.body;

      const updatedOrder = await this.orderService.rejectTask(
        Number(id),
        rejectNotes
      );

      this.sendResponse(res, updatedOrder, 200);
    });

  public acceptTask = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const { id } = req.params;

      const updatedOrder = await this.orderService.acceptTask(Number(id));

      this.sendResponse(res, updatedOrder, 200);
    });

  public createReview = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: AuthRequest, res: Response) => {
        const userId = req.user?.id as unknown as number;
        const { id } = req.params;

        const review = {
          ...req.body,
          rating: +req.body.rating,
        };

        const createdReview = await this.orderService.createReview(
          Number(id),
          userId,
          review
        );

        this.sendResponse(res, createdReview, 201);
      }
    );
}

export { OrderController };
