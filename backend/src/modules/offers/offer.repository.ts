import { PrismaClient } from '@prisma/client';
import { BaseRepository } from '~/libs/core/base-repository';
import { OfferDTO, OfferStatus } from './offer.model';

export class OfferRepository extends BaseRepository<
  OfferDTO,
  OfferDTO[],
  {
    orderId: number;
    details: string;
    price: number;
    deliveryTime: number;
    detailsFiles?: string[];
  },
  {
    status: OfferStatus;
    details?: string;
    price?: number;
    deliveryTime?: number;
  }
> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'offer');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapPrismaOfferToDTO(prismaOffer: any): OfferDTO {
    return {
      ...prismaOffer,
      status: prismaOffer.status as OfferStatus,
    };
  }

  public async findAllByOrderId(orderId: number): Promise<OfferDTO[]> {
    const prismaOffers = await this.prisma.offer.findMany({
      where: { orderId },
      orderBy: { createdAt: 'desc' },
    });

    return prismaOffers.map(this.mapPrismaOfferToDTO);
  }

  public async findLatestByOrderId(orderId: number): Promise<OfferDTO | null> {
    const prismaOffer = await this.prisma.offer.findFirst({
      where: { orderId },
      orderBy: { createdAt: 'desc' },
    });

    return prismaOffer ? this.mapPrismaOfferToDTO(prismaOffer) : null;
  }
}
