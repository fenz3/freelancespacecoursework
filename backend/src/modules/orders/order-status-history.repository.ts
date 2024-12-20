import { PrismaClient, OrderStatus } from '@prisma/client';

export class OrderStatusHistoryRepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async create(orderId: number, status: OrderStatus) {
    return this.prisma.orderStatusHistory.create({
      data: {
        orderId,
        status,
      },
    });
  }
}
