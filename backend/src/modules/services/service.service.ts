import { GetAllRequestDto } from 'shared/src';
import { ServiceRepository } from './service.repository';
import prisma from '~/libs/prisma/prisma-client';
import { ServiceCreateInput, ServiceCreateWithCreatorId } from './service.model';

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

  async getAll({ page, pageSize, name }: GetAllRequestDto) {
    const skip = (page - 1) * pageSize;
    const filter = name ? { name: { $regex: name, $options: 'i' } } : {};

    return this.repository.findAll(filter, skip, pageSize);
  }

  async getById(serviceId: string) {
    return this.repository.find(serviceId);
  }

  async update(serviceId: string, updateData: Partial<ServiceCreateInput>) {
    return this.repository.update(serviceId, updateData);
  }

  async delete(serviceId: string) {
    return this.repository.delete(serviceId);
  }
}
