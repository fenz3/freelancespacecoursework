import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import {
  AsyncThunkConfig,
  CategoryDTO,
  SubcategoryDTO,
} from '~/common/types/types';

const getAll = createAsyncThunk<CategoryDTO[], void, AsyncThunkConfig>(
  `${name}/fetchAllCategories`,
  async (_, { extra: { categoriesService } }) => {
    return await categoriesService.getAll();
  }
);

const getSubcategoriesByCategoryId = createAsyncThunk<
  SubcategoryDTO[],
  string,
  AsyncThunkConfig
>(
  `${name}/fetchSubcategoriesByCategoryId`,
  async (categoryId, { extra: { categoriesService } }) => {
    return await categoriesService.getSubcategoriesByCategoryId(categoryId);
  }
);

export { getAll, getSubcategoriesByCategoryId };
