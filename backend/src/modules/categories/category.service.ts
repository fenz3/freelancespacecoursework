import prisma from '~/libs/prisma/prisma-client';
import {
  CategoryRepository,
  SubcategoryRepository,
} from './category.repository';

export class CategoryService {
  private categoryRepository: CategoryRepository;
  private subcategoryRepository: SubcategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository(prisma);
    this.subcategoryRepository = new SubcategoryRepository(prisma);
  }

  async getAllCategories() {
    return this.categoryRepository.findAll();
  }

  async getSubcategoriesByCategoryId(categoryId: string) {
    return this.subcategoryRepository.findByCategoryId(categoryId);
  }
}
