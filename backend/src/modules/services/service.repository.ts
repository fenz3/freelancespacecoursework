import { BaseRepository } from '~/libs/core/base-repository';
import {
  GetAllServicesDTO,
  ServiceCreateWithCreatorId,
  ServiceDTO,
} from './service.model';
import { PrismaClient } from '@prisma/client';

class ServiceRepository extends BaseRepository<
  ServiceDTO,
  GetAllServicesDTO,
  ServiceCreateWithCreatorId,
  Partial<ServiceDTO>
> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'service');
  }

  public async create(item: ServiceCreateWithCreatorId): Promise<ServiceDTO> {
    return this.prisma.service.create({
      data: item,
      include: {
        creator: true,
        category: true,
        subcategory: true,
      },
    }) as Promise<ServiceDTO>;
  }

  public async find(id: number | string): Promise<ServiceDTO | null> {
    return this.prisma.service.findUnique({
      where: { id: Number(id), isDeleted: false },
      include: {
        creator: {
          select: { id: true, firstName: true, lastName: true, photoUrl: true },
        },
        category: true,
        subcategory: true,
        reviews: {
          include: {
            creator: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                photoUrl: true,
              },
            },
          },
        },
      },
    }) as Promise<ServiceDTO | null>;
  }

  public async findAll(
    filter = {},
    skip = 0,
    limit = 10
  ): Promise<GetAllServicesDTO> {
    const total = await this.prisma.service.count({
      where: {
        ...filter,
        isDeleted: false,
      },
    });

    const serviceDelegate = this.prisma[this.model] as PrismaClient['service'];

    const services = await serviceDelegate.findMany({
      where: {
        ...filter,
        isDeleted: false,
      },
      skip,
      take: +limit,
      include: {
        category: true,
        subcategory: true,
        orders: {
          select: { status: true },
        },
        creator: {
          select: { id: true, firstName: true, lastName: true, photoUrl: true },
        },
      },
      orderBy: [
        {
          orders: {
            _count: 'desc',
          },
        },
        {
          rating: 'desc',
        },
      ],
    });

    return { totalCount: total, services: services as unknown as ServiceDTO[] };
  }
}

export { ServiceRepository };
