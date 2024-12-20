import { createSlice } from '@reduxjs/toolkit';
import {
  getAllByOrderId,
  getLatestByOrderId,
  create,
  accept,
  reject,
} from './actions';
import { OfferDTO, ValueOf } from '~/common/types/types';
import { DataStatus } from '~/common/enums/enums';
import { notifyError, notifySuccess } from '~/utils/notification/notification';

interface OffersState {
  offers: OfferDTO[];
  latestOffer: OfferDTO | null;
  totalItems: number;
  status: ValueOf<typeof DataStatus>;
  offerCreateStatus: ValueOf<typeof DataStatus>;
  offerUpdateStatus: ValueOf<typeof DataStatus>;
  error: { code: string | number | undefined; message: string | undefined };
}

const initialState: OffersState = {
  offers: [],
  latestOffer: null,
  totalItems: 0,
  status: DataStatus.IDLE,
  offerCreateStatus: DataStatus.IDLE,
  offerUpdateStatus: DataStatus.IDLE,
  error: { code: undefined, message: undefined },
};

const { reducer, actions, name } = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllByOrderId.pending, (state) => {
        state.status = DataStatus.PENDING;
      })
      .addCase(getAllByOrderId.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.totalItems = action.payload.length;
        state.status = DataStatus.SUCCESS;
      })
      .addCase(getAllByOrderId.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch offers');
      })
      .addCase(getLatestByOrderId.pending, (state) => {
        state.status = DataStatus.PENDING;
      })
      .addCase(getLatestByOrderId.fulfilled, (state, action) => {
        state.latestOffer = action.payload;
        state.status = DataStatus.SUCCESS;
      })
      .addCase(getLatestByOrderId.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch latest offer');
      })
      .addCase(create.pending, (state) => {
        state.offerCreateStatus = DataStatus.PENDING;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.offers = [action.payload, ...state.offers];
        state.offerCreateStatus = DataStatus.SUCCESS;
        notifySuccess('Offer created successfully.');
      })
      .addCase(create.rejected, (state, action) => {
        state.offerCreateStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to create offer');
      })
      .addCase(accept.pending, (state) => {
        state.offerUpdateStatus = DataStatus.PENDING;
      })
      .addCase(accept.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        state.offers = state.offers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
        state.offerUpdateStatus = DataStatus.SUCCESS;
        notifySuccess('Offer accepted successfully.');
      })
      .addCase(accept.rejected, (state, action) => {
        state.offerUpdateStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to update offer');
      })
      .addCase(reject.pending, (state) => {
        state.offerUpdateStatus = DataStatus.PENDING;
      })
      .addCase(reject.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        state.offers = state.offers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
        state.offerUpdateStatus = DataStatus.SUCCESS;
        notifySuccess('Offer rejected successfully.');
      })
      .addCase(reject.rejected, (state, action) => {
        state.offerUpdateStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to update offer');
      });
  },
});

export { reducer, name, actions };
