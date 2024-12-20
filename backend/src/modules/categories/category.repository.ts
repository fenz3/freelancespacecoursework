import { PrismaClient } from '@prisma/client';
import { CategoryDTO, SubcategoryDTO } from './category.model';

class CategoryRepository {
  constructor(protected prisma: PrismaClient) {}

  public async findAll(): Promise<CategoryDTO[]> {
    return this.prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
    }) as Promise<CategoryDTO[]>;
  }
}

class SubcategoryRepository {
  constructor(protected prisma: PrismaClient) {}

  public async findByCategoryId(categoryId: string): Promise<SubcategoryDTO[]> {
    return this.prisma.subcategory.findMany({
      where: { categoryId: Number(categoryId) },
      orderBy: { createdAt: 'desc' },
    }) as Promise<SubcategoryDTO[]>;
  }
}

export { CategoryRepository, SubcategoryRepository };
