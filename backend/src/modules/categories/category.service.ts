import prisma from '~/libs/prisma/prisma-client';
import { CategoryRepository } from './category.repository';

export class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository(prisma);
  }

  async getAll() {
    return this.categoryRepository.findAll();
  }
}
