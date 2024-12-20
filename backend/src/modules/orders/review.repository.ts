import { CreateReviewDTO } from './order.model';
import { PrismaClient } from '@prisma/client';

export class ReviewRepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async create(
    orderId: number,
    serviceId: number,
    creatorId: number,
    data: CreateReviewDTO
  ) {
    return this.prisma.review.create({
      data: {
        orderId,
        serviceId,
        creatorId,
        ...data,
      },
      include: {
        creator: true,
      },
    });
  }
}
