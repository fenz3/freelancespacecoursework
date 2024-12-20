import { createSlice } from '@reduxjs/toolkit';
import {
  getAll,
  getById,
  create,
  deliverTask,
  rejectTask,
  acceptTask,
  createReview,
} from './actions';
import { OrderDTO, ValueOf } from '~/common/types/types';
import { DataStatus } from '~/common/enums/enums';
import { notifyError, notifySuccess } from '~/utils/notification/notification';

interface OrdersState {
  order: null | OrderDTO;
  orders: OrderDTO[];
  totalItems: number;
  status: ValueOf<typeof DataStatus>;
  orderStatus: ValueOf<typeof DataStatus>;
  orderCreateStatus: ValueOf<typeof DataStatus>;
  orderDeliveryStatus: ValueOf<typeof DataStatus>;
  reviewCreateStatus: ValueOf<typeof DataStatus>;
  error: { code: string | number | undefined; message: string | undefined };
}

const initialState: OrdersState = {
  order: null,
  orders: [],
  totalItems: 0,
  status: DataStatus.IDLE,
  orderStatus: DataStatus.IDLE,
  orderCreateStatus: DataStatus.IDLE,
  orderDeliveryStatus: DataStatus.IDLE,
  reviewCreateStatus: DataStatus.IDLE,
  error: { code: undefined, message: undefined },
};

const { reducer, actions, name } = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.status = DataStatus.PENDING;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.totalItems = action.payload.length;
        state.status = DataStatus.SUCCESS;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch orders');
      })
      .addCase(getById.pending, (state) => {
        state.orderStatus = DataStatus.PENDING;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.order = action.payload;
        state.orderStatus = DataStatus.SUCCESS;
      })
      .addCase(getById.rejected, (state, action) => {
        state.orderStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch order');
      })
      .addCase(create.pending, (state) => {
        state.orderCreateStatus = DataStatus.PENDING;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.orders = [action.payload, ...state.orders];
        state.orderCreateStatus = DataStatus.SUCCESS;
        notifySuccess('Order created successfully.');
      })
      .addCase(create.rejected, (state, action) => {
        state.orderCreateStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to create order');
      })
      .addCase(deliverTask.pending, (state) => {
        state.orderDeliveryStatus = DataStatus.PENDING;
      })
      .addCase(deliverTask.fulfilled, (state, action) => {
        const deliveredOrder = action.payload;
        state.orders = state.orders.map((order) =>
          order.id === deliveredOrder.id ? deliveredOrder : order
        );
        state.orderDeliveryStatus = DataStatus.SUCCESS;
        notifySuccess('Task results delivered successfully.');
      })
      .addCase(deliverTask.rejected, (state, action) => {
        state.orderDeliveryStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to deliver order');
      })
      .addCase(rejectTask.pending, (state) => {
        state.orderDeliveryStatus = DataStatus.PENDING;
      })
      .addCase(rejectTask.fulfilled, (state, action) => {
        const deliveredOrder = action.payload;
        state.orders = state.orders.map((order) =>
          order.id === deliveredOrder.id ? deliveredOrder : order
        );
        state.orderDeliveryStatus = DataStatus.SUCCESS;
        notifySuccess('Task results rejected successfully.');
      })
      .addCase(rejectTask.rejected, (state, action) => {
        state.orderDeliveryStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to reject task');
      })
      .addCase(acceptTask.pending, (state) => {
        state.orderDeliveryStatus = DataStatus.PENDING;
      })
      .addCase(acceptTask.fulfilled, (state, action) => {
        const deliveredOrder = action.payload;
        state.orders = state.orders.map((order) =>
          order.id === deliveredOrder.id ? deliveredOrder : order
        );
        state.orderDeliveryStatus = DataStatus.SUCCESS;
        notifySuccess('Task results accepted successfully.');
      })
      .addCase(acceptTask.rejected, (state, action) => {
        state.orderDeliveryStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to accept task');
      })
      .addCase(createReview.pending, (state) => {
        state.reviewCreateStatus = DataStatus.PENDING;
      })
      .addCase(createReview.fulfilled, (state) => {
        state.reviewCreateStatus = DataStatus.SUCCESS;
        notifySuccess('Review created successfully.');
      })
      .addCase(createReview.rejected, (state, action) => {
        state.reviewCreateStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to accept task');
      });
  },
});

export { reducer, name, actions };
