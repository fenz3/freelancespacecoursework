import { AuthRequest } from '~/libs/middleware/auth.middleware';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '~/libs/core/base-controller';
import { UserService } from './user.service';
import { signInRequestSchema, signUpRequestSchema } from '~/libs/common/common';

class UserController extends BaseController {
  private userService = new UserService();

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
}

export { UserController };
