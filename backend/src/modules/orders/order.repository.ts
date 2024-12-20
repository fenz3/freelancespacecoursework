import { PrismaClient } from '@prisma/client';
import { OrderDTO, OrderStatus } from './order.model';
import { BaseRepository } from '~/libs/core/base-repository';

export class OrderRepository extends BaseRepository<
  OrderDTO,
  OrderDTO[],
  {
    serviceId: number;
    clientId: number;
    freelancerId: number;
    price: number;
    deliveryTime: number;
    taskDetails?: string;
    taskDetailsFiles?: string[];
  },
  {
    status: OrderStatus;
    taskDetails?: string;
    taskDetailsFiles?: string[];
    deliveryResponse?: string;
    deliveryResponseFiles?: string[];
    price?: number;
    deliveryTime?: number;
    rejectNotes?: string;
  }
> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'order');
  }

  public async findAll(
    filter = {},
    skip = 0,
    limit = 100
  ): Promise<OrderDTO[]> {
    const orderDelegate = this.prisma[this.model] as PrismaClient['order'];
    return orderDelegate.findMany({
      where: filter,
      skip,
      take: limit,
      include: {
        client: true,
        freelancer: true,
        offers: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        service: {
          include: {
            category: true,
            subcategory: true,
          },
        },
        statusHistory: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        review: true,
      },
      orderBy: { createdAt: 'desc' },
    }) as Promise<OrderDTO[]>;
  }
}
