import { OfferRepository } from './offer.repository';
import prisma from '~/libs/prisma/prisma-client';
import { OfferDTO, OfferCreateRequestDTO, OfferStatus } from './offer.model';
import { OrderService } from '../orders/order.service';
import { OrderStatus } from 'shared/src';

export class OfferService {
  private repository: OfferRepository;
  private orderService: OrderService;

  constructor() {
    this.repository = new OfferRepository(prisma);
    this.orderService = new OrderService();
  }

  async create(
    offerPayload: OfferCreateRequestDTO,
    creatorId: number
  ): Promise<OfferDTO> {
    const newOffer = { ...offerPayload, creatorId };
    await this.orderService.updateStatus(
      offerPayload.orderId,
      OrderStatus.OFFER_SUBMITTED
    );
    return this.repository.create(newOffer);
  }

  async accept(offerId: number, orderId: number): Promise<OfferDTO | null> {
    await this.orderService.updateStatus(orderId, OrderStatus.OFFER_ACCEPTED);
    return this.repository.update(offerId, { status: OfferStatus.ACCEPTED });
  }

  async reject(offerId: number, orderId: number): Promise<OfferDTO | null> {
    await this.orderService.updateStatus(orderId, OrderStatus.REJECTED);
    return this.repository.update(offerId, { status: OfferStatus.REJECTED });
  }

  async findAllByOrderId(orderId: number): Promise<OfferDTO[]> {
    return this.repository.findAllByOrderId(orderId);
  }

  async findLatestByOrderId(orderId: number): Promise<OfferDTO | null> {
    return this.repository.findLatestByOrderId(orderId);
  }

  async findById(id: number): Promise<OfferDTO | null> {
    return this.repository.find(id);
  }
}
