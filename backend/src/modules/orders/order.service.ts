import { ServiceService } from './../services/service.service';
import { OrderRepository } from './order.repository';
import prisma from '~/libs/prisma/prisma-client';
import {
  OrderDTO,
  OrderCreateRequestDTO,
  OrderStatus,
  ReviewDTO,
  CreateReviewDTO,
} from './order.model';
import { OrderStatusHistoryRepository } from './order-status-history.repository';
import { ReviewRepository } from './review.repository';

export class OrderService {
  private repository: OrderRepository;
  private statusHistoryRepository: OrderStatusHistoryRepository;
  private reviewRepository: ReviewRepository;
  private serviceService: ServiceService;

  constructor() {
    this.repository = new OrderRepository(prisma);
    this.statusHistoryRepository = new OrderStatusHistoryRepository(prisma);
    this.reviewRepository = new ReviewRepository(prisma);
    this.serviceService = new ServiceService();
  }

  async create(
    orderPayload: OrderCreateRequestDTO,
    userId: number
  ): Promise<OrderDTO> {
    const existingService = await this.serviceService.getById(
      String(orderPayload.serviceId)
    );

    if (!existingService) {
      throw new Error(`Service with ID ${orderPayload.serviceId} not found.`);
    }

    const newOrder = { ...orderPayload, clientId: userId };
    return this.repository.create(newOrder);
  }

  async getAll(userId: number): Promise<OrderDTO[]> {
    const filter = {
      OR: [{ clientId: userId }, { freelancerId: userId }],
    };
    return this.repository.findAll(filter);
  }

  async getById(orderId: number): Promise<OrderDTO | null> {
    return this.repository.find(orderId);
  }

  async updateStatus(
    orderId: number,
    newStatus: OrderStatus
  ): Promise<OrderDTO | null> {
    const existingOrder = await this.repository.find(orderId);

    if (!existingOrder) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }

    const updatedOrder = this.repository.update(orderId, { status: newStatus });
    await this.statusHistoryRepository.create(orderId, newStatus);
    return updatedOrder;
  }

  async deliverTask(
    orderId: number,
    deliveryResponse: string,
    deliveryResponseFiles: string[]
  ): Promise<OrderDTO | null> {
    const existingOrder = await this.repository.find(orderId);

    if (!existingOrder) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }

    if (
      existingOrder.status !== OrderStatus.OFFER_ACCEPTED &&
      existingOrder.status !== OrderStatus.RESULTS_REJECTED
    ) {
      throw new Error(
        `Order with ID ${orderId} cannot be delivered as it is not in an accepted state.`
      );
    }

    const updatedOrder = this.repository.update(orderId, {
      deliveryResponse,
      deliveryResponseFiles,
      status: OrderStatus.RESULTS_SUBMITTED,
    });
    await this.statusHistoryRepository.create(
      orderId,
      OrderStatus.RESULTS_SUBMITTED
    );
    return updatedOrder;
  }

  async rejectTask(
    orderId: number,
    rejectNotes: string
  ): Promise<OrderDTO | null> {
    const existingOrder = await this.repository.find(orderId);

    if (!existingOrder) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }

    if (existingOrder.status !== OrderStatus.RESULTS_SUBMITTED) {
      throw new Error(
        `Delivery response for Order with ID ${orderId} cannot be rejected as it is not in a results submitted state.`
      );
    }

    const updatedOrder = this.repository.update(orderId, {
      rejectNotes,
      status: OrderStatus.RESULTS_REJECTED,
    });
    await this.statusHistoryRepository.create(
      orderId,
      OrderStatus.RESULTS_REJECTED
    );
    return updatedOrder;
  }

  async acceptTask(orderId: number): Promise<OrderDTO | null> {
    const existingOrder = await this.repository.find(orderId);

    if (!existingOrder) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }

    if (existingOrder.status !== OrderStatus.RESULTS_SUBMITTED) {
      throw new Error(
        `Order with ID ${orderId} cannot be completed as results are not in a submitted state.`
      );
    }

    const updatedOrder = this.repository.update(orderId, {
      status: OrderStatus.COMPLETED,
    });
    await this.statusHistoryRepository.create(orderId, OrderStatus.COMPLETED);
    return updatedOrder;
  }

  async createReview(
    orderId: number,
    creatorId: number,
    review: CreateReviewDTO
  ): Promise<ReviewDTO | null> {
    const existingOrder = await this.repository.find(orderId);

    if (!existingOrder) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }

    if (existingOrder.status !== OrderStatus.COMPLETED) {
      throw new Error(
        `Order with ID ${orderId} cannot be reviewed as it is not in completed state.`
      );
    }

    const createdReview = this.reviewRepository.create(
      orderId,
      existingOrder.serviceId,
      creatorId,
      review
    );

    this.serviceService.addReview(existingOrder.serviceId, review.rating);

    return createdReview;
  }
}
