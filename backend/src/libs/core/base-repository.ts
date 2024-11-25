import { PrismaClient } from '@prisma/client';

export abstract class BaseRepository<T, CreateInput, UpdateInput> {
  constructor(protected prisma: PrismaClient, protected model: keyof PrismaClient) {}

  public async create(item: CreateInput): Promise<T> {
    return this.prisma[this.model].create({
      data: item,
    }) as Promise<T>;
  }

  public async find(id: number | string): Promise<T | null> {
    return this.prisma[this.model].findUnique({
      where: { id: Number(id) },
    }) as Promise<T | null>;
  }

  public async findAll(filter = {}, skip = 0, limit = 10): Promise<T[]> {
    return this.prisma[this.model].findMany({
      where: filter,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }) as Promise<T[]>;
  }

  public async update(id: number | string, item: UpdateInput): Promise<T | null> {
    return this.prisma[this.model].update({
      where: { id: Number(id) },
      data: item,
    }) as Promise<T | null>;
  }

  public async delete(id: number | string): Promise<T | null> {
    return this.prisma[this.model].delete({
      where: { id: Number(id) },
    }) as Promise<T | null>;
  }
}
