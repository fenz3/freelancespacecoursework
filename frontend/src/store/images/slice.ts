import { createSlice } from '@reduxjs/toolkit';
import { uploadImage } from './actions';
import { ValueOf } from '~/common/types/types';
import { DataStatus } from '~/common/enums/enums';
import { notifyError } from '~/utils/notification/notification';

export interface ImageServiceState {
  uploadUrl: string | null;
  status: ValueOf<typeof DataStatus>;
  error: { code: string | number | null; message: string | null };
}

const initialState: ImageServiceState = {
  uploadUrl: null,
  status: DataStatus.IDLE,
  error: { code: null, message: null },
};

const { reducer, actions, name } = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.status = DataStatus.PENDING;
        state.error = { code: null, message: null };
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.uploadUrl = action.payload;
        state.status = DataStatus.SUCCESS;
        state.error = { code: null, message: null };
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code || null,
          message: action.error.message || null,
        };
        notifyError(action.error.message || 'Failed to upload image.');
      });
  },
});

export { reducer, name, actions };
