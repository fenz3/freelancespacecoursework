import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import { AsyncThunkConfig, CategoryDto } from '~/common/types/types';

const getAll = createAsyncThunk<
  CategoryDto[],
  void,
  AsyncThunkConfig
>(`${name}/fetchAllCategories`, async (_, { extra: { categoriesService } }) => {
  return await categoriesService.getAll();
});

export { getAll };
