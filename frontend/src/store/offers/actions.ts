import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import {
  AsyncThunkConfig,
  OfferDTO,
  OfferCreateRequestDTO,
} from '~/common/types/types';

const getAllByOrderId = createAsyncThunk<OfferDTO[], string, AsyncThunkConfig>(
  `${name}/fetchOffersByOrderId`,
  async (orderId, { extra: { offersService } }) => {
    return await offersService.getAllByOrderId(orderId);
  }
);

const getLatestByOrderId = createAsyncThunk<OfferDTO, string, AsyncThunkConfig>(
  `${name}/fetchLatestOfferByOrderId`,
  async (orderId, { extra: { offersService } }) => {
    return await offersService.findLatestByOrderId(orderId);
  }
);

const create = createAsyncThunk<
  OfferDTO,
  OfferCreateRequestDTO,
  AsyncThunkConfig
>(`${name}/createOffer`, async (offerData, { extra: { offersService } }) => {
  return await offersService.create(offerData);
});

const accept = createAsyncThunk<OfferDTO, number, AsyncThunkConfig>(
  `${name}/acceptOffer`,
  async (id, { extra: { offersService } }) => {
    return await offersService.accept(id);
  }
);

const reject = createAsyncThunk<OfferDTO, number, AsyncThunkConfig>(
  `${name}/rejectOffer`,
  async (id, { extra: { offersService } }) => {
    return await offersService.reject(id);
  }
);

export { getAllByOrderId, getLatestByOrderId, create, accept, reject };
