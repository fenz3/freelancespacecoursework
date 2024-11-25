import { BaseRepository } from '~/libs/core/base-repository';
import { ServiceCreateWithCreatorId, ServiceDto } from './service.model';
import { PrismaClient } from '@prisma/client';

class ServiceRepository extends BaseRepository<
  ServiceDto,
  ServiceCreateWithCreatorId,
  Partial<ServiceCreateWithCreatorId>
> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'user');
  }

  public async find(id: number | string): Promise<ServiceDto | null> {
    return this.prisma.service.findUnique({
      where: { id: Number(id) },
      include: {
        creator: true,
        category: true,
      },
    }) as Promise<ServiceDto | null>;
  }

  public async findAll(filter = {}, skip = 0, limit = 10): Promise<ServiceDto[]> {
    return this.prisma.service.findMany({
      where: filter,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        creator: true,
        category: true,
      },
    }) as Promise<ServiceDto[]>;
  }
}

export { ServiceRepository };
