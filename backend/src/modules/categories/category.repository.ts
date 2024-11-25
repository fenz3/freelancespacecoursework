import { PrismaClient } from '@prisma/client';
import { CategoryDto } from './category.model';

class CategoryRepository {
  constructor(
    protected prisma: PrismaClient,
  ) {}

  public async findAll(): Promise<CategoryDto[]> {
    return this.prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
    }) as Promise<CategoryDto[]>;
  }
}

export { CategoryRepository };
