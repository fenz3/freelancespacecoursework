import { AuthRequest } from '~/libs/middleware/auth.middleware';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '~/libs/core/base-controller';
import { UserService } from './user.service';
import { signInRequestSchema, signUpRequestSchema } from '~/libs/common/common';
import { ImageService } from '../images/image.service';

class UserController extends BaseController {
  private userService = new UserService();
  private imageService = new ImageService();

  public signUp = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: Request, res: Response) => {
        const userPayload = req.body;
        const { user, jwtToken } = await this.userService.create(userPayload);
        this.sendResponse(res, { user, token: jwtToken }, 201);
      },
      signUpRequestSchema
    );

  public signIn = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const { user, jwtToken } = await this.userService.signIn(
          email,
          password
        );
        this.sendResponse(res, { user, token: jwtToken }, 200);
      },
      signInRequestSchema
    );

  public getAuthenticatedUser = (
    req: Request,
    res: Response,
    next: NextFunction
  ) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: AuthRequest, res: Response) => {
        const userId = req.user?.id as string;
        const user = await this.userService.getById(userId);
        this.sendResponse(res, { user }, 200);
      }
    );

  public patchUser = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: AuthRequest, res: Response) => {
        const userId = req.user?.id as string;
        const updatedUserId = req.params.id;
        const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
        };
        let photoUrl = req.body.photoUrl;
        if (files?.photoUrl) {
          const photoFile = files?.photoUrl[0];
          photoUrl = await this.imageService.upload(
            photoFile.path,
            photoFile.originalname
          );
        }

        let portfolioItemsUrls = req.body.portfolioItems || [];
        if (!Array.isArray(portfolioItemsUrls)) {
          portfolioItemsUrls = [portfolioItemsUrls];
        }
        const portfolioItemsFiles = files?.portfolioItems || [];

        portfolioItemsUrls = [
          ...portfolioItemsUrls,
          ...(await Promise.all(
            portfolioItemsFiles.map((file) =>
              this.imageService.upload(file.path, file.originalname)
            )
          )),
        ];

        const userData = {
          ...req.body,
          photoUrl,
          portfolioItems: [...new Set(portfolioItemsUrls)],
        };

        const updatedUser = this.userService.update(
          userData,
          updatedUserId,
          userId
        );

        this.sendResponse(res, { updatedUser }, 200);
      }
    );
}

export { UserController };
