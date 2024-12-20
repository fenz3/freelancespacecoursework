import { Request, Response, NextFunction } from 'express';
import { OfferService } from './offer.service';
import { BaseController } from '~/libs/core/base-controller';
import { AuthRequest } from '~/libs/middleware/auth.middleware';
import { OfferCreateRequestDTO } from './offer.model';
import { ImageService } from '../images/image.service';

class OfferController extends BaseController {
  private offerService = new OfferService();
  private imageService = new ImageService();

  public create = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: AuthRequest, res: Response) => {
        const userId = req.user?.id as unknown as number;
        const detailsFiles = req.files as Express.Multer.File[];
        const detailsFilesUrls = await Promise.all(
          detailsFiles.map((file) =>
            this.imageService.upload(file.path, file.originalname)
          )
        );

        const offerData: OfferCreateRequestDTO = {
          ...req.body,
          orderId: +req.body.orderId,
          price: +req.body.price,
          deliveryTime: +req.body.deliveryTime,
          detailsFiles: detailsFilesUrls,
        };

        const createdOffer = await this.offerService.create(offerData, userId);
        this.sendResponse(res, createdOffer, 201);
      }
    );

  public accept = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const { id } = req.params;
      const offer = await this.offerService.findById(+id);
      if (!offer) {
        this.sendResponse(res, { error: 'Offer not found.' }, 404);
        return;
      }

      const updatedOffer = await this.offerService.accept(
        Number(id),
        offer.orderId
      );
      if (!updatedOffer) {
        this.sendResponse(
          res,
          { error: 'Offer not found or not updated.' },
          404
        );
        return;
      }

      this.sendResponse(res, updatedOffer, 200);
    });

  public reject = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const { id } = req.params;
      const offer = await this.offerService.findById(+id);
      if (!offer) {
        this.sendResponse(res, { error: 'Offer not found.' }, 404);
        return;
      }

      const updatedOffer = await this.offerService.reject(
        Number(id),
        offer.orderId
      );
      if (!updatedOffer) {
        this.sendResponse(
          res,
          { error: 'Offer not found or not updated.' },
          404
        );
        return;
      }

      this.sendResponse(res, updatedOffer, 200);
    });

  public findAllByOrderId = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const { orderId } = req.params;

      const offers = await this.offerService.findAllByOrderId(Number(orderId));
      this.sendResponse(res, offers, 200);
    });

  public findLatestByOrderId = (
    req: Request,
    res: Response,
    next: NextFunction
  ) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const { orderId } = req.params;

      const latestOffer = await this.offerService.findLatestByOrderId(
        Number(orderId)
      );
      if (!latestOffer) {
        this.sendResponse(res, { error: 'No offer found' }, 404);
        return;
      }

      this.sendResponse(res, latestOffer, 200);
    });
}

export { OfferController };
