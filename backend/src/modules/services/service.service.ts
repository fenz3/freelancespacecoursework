import {
  GetAllServicesRequestDTO,
  GetAllServicesRequestFilter,
} from 'shared/src';
import { ServiceRepository } from './service.repository';
import prisma from '~/libs/prisma/prisma-client';
import {
  ServiceCreateInput,
  ServiceCreateWithCreatorId,
} from './service.model';

export class ServiceService {
  private repository: ServiceRepository;

  constructor() {
    this.repository = new ServiceRepository(prisma);
  }

  async create(servicePayload: ServiceCreateInput, userId: number) {
    const dataToCreate: ServiceCreateWithCreatorId = {
      ...servicePayload,
      creatorId: userId,
    };

    return this.repository.create(dataToCreate);
  }

  async getAll({
    page,
    pageSize,
    name,
    creatorId,
    categoryId,
    subcategoryId,
    deliveryTime,
    minPrice,
    maxPrice,
  }: GetAllServicesRequestDTO) {
    const isFirstPage = +page === 1;
    const isCategoryOrSubcategoryPresent = categoryId || subcategoryId;

    const adjustedPageSize =
      isFirstPage && isCategoryOrSubcategoryPresent ? +pageSize + 1 : pageSize;

    const firstPageSize = isCategoryOrSubcategoryPresent
      ? pageSize + 1
      : pageSize;
    const skip =
      (page - 1) * firstPageSize -
      (isCategoryOrSubcategoryPresent && page > 1 ? 1 : 0);

    const filter: GetAllServicesRequestFilter = {};

    if (name) {
      filter.title = { contains: name, mode: 'insensitive' };
    }
    if (categoryId) {
      filter.categoryId = categoryId;
    }
    if (subcategoryId) {
      filter.subcategoryId = subcategoryId;
    }
    if (deliveryTime) {
      filter.deliveryTime = { lte: deliveryTime };
    }
    if (minPrice || maxPrice) {
      filter.startingPrice = {};
      if (minPrice) filter.startingPrice.gte = minPrice;
      if (maxPrice) filter.startingPrice.lte = maxPrice;
    }
    if (creatorId) {
      filter.creatorId = creatorId;
    }

    return this.repository.findAll(filter, Math.max(0, skip), adjustedPageSize);
  }

  async getById(serviceId: string) {
    return this.repository.find(serviceId);
  }

  async update(serviceId: string, updateData: Partial<ServiceCreateInput>) {
    return this.repository.update(serviceId, updateData);
  }

  async delete(serviceId: string, userId: string) {
    const service = await this.repository.find(serviceId);
    if (!service) {
      throw new Error('Service not found.');
    }

    if (+userId !== service.creatorId) {
      throw new Error(
        'Service cannot be deleted by anyone else than the creator.'
      );
    }

    return this.repository.update(serviceId, { isDeleted: true });
  }

  async addReview(serviceId: number, rating: number) {
    const service = await this.repository.find(serviceId);
    if (!service) {
      throw new Error('Service not found');
    }

    const updatedRatingCount = service.ratingCount + 1;
    const updatedRating =
      (service.rating * service.ratingCount + rating) / updatedRatingCount;

    await this.repository.update(serviceId, {
      rating: updatedRating,
      ratingCount: updatedRatingCount,
    });
  }
}
