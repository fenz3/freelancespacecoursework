import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import { AsyncThunkConfig } from '~/common/types/types';

const uploadImage = createAsyncThunk<string, File, AsyncThunkConfig>(
  `${name}/upload`,
  async (file, { extra: { imagesService } }) => {
    return await imagesService.upload(file);
  }
);

export { uploadImage };
