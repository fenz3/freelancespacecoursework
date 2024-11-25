import { createSlice } from '@reduxjs/toolkit';
import { getAll } from './actions';
import { CategoryDto, ValueOf } from '~/common/types/types';
import { DataStatus } from '~/common/enums/enums';
import { notifyError } from '~/utils/notification/notification';

export interface AttributesState {
  categories: CategoryDto[];
  categoriesStatus: ValueOf<typeof DataStatus>;
  error: { code: string | number | undefined; message: string | undefined };
}

const initialState: AttributesState = {
  categories: [],
  categoriesStatus: DataStatus.IDLE,
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
      });
  },
});

export { reducer, name, actions };
