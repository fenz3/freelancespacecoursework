import { createSlice } from '@reduxjs/toolkit';
import { getAll, getSubcategoriesByCategoryId } from './actions';
import { CategoryDTO, SubcategoryDTO, ValueOf } from '~/common/types/types';
import { DataStatus } from '~/common/enums/enums';
import { notifyError } from '~/utils/notification/notification';

export interface AttributesState {
  categories: CategoryDTO[];
  subcategories: SubcategoryDTO[];
  categoriesStatus: ValueOf<typeof DataStatus>;
  subcategoriesStatus: ValueOf<typeof DataStatus>;
  error: { code: string | number | undefined; message: string | undefined };
}

const initialState: AttributesState = {
  categories: [],
  subcategories: [],
  categoriesStatus: DataStatus.IDLE,
  subcategoriesStatus: DataStatus.IDLE,
  error: { code: undefined, message: undefined },
};

const { reducer, actions, name } = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.categoriesStatus = DataStatus.PENDING;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.categoriesStatus = DataStatus.SUCCESS;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.categoriesStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch categories');
      })
      .addCase(getSubcategoriesByCategoryId.pending, (state) => {
        state.subcategoriesStatus = DataStatus.PENDING;
      })
      .addCase(getSubcategoriesByCategoryId.fulfilled, (state, action) => {
        state.subcategories = action.payload;
        state.subcategoriesStatus = DataStatus.SUCCESS;
      })
      .addCase(getSubcategoriesByCategoryId.rejected, (state, action) => {
        state.subcategoriesStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch subcategories');
      });
  },
});

export { reducer, name, actions };
