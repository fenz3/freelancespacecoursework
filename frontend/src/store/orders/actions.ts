import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import {
  AsyncThunkConfig,
  OrderDTO,
  OrderCreateRequestDTO,
  DeliverTaskRequestDTO,
  RejectTaskRequestDTO,
  CreateReviewDTO,
  ReviewDTO,
} from '~/common/types/types';

const getAll = createAsyncThunk<OrderDTO[], void, AsyncThunkConfig>(
  `${name}/fetchAllOrders`,
  async (_, { extra: { ordersService } }) => {
    return await ordersService.getAll();
  }
);

const getById = createAsyncThunk<OrderDTO, string, AsyncThunkConfig>(
  `${name}/fetchOrderById`,
  async (id, { extra: { ordersService } }) => {
    return await ordersService.getById(id);
  }
);

const create = createAsyncThunk<
  OrderDTO,
  OrderCreateRequestDTO,
  AsyncThunkConfig
>(`${name}/createOrder`, async (orderData, { extra: { ordersService } }) => {
  return await ordersService.create(orderData);
});

const deliverTask = createAsyncThunk<
  OrderDTO,
  { id: number; data: DeliverTaskRequestDTO },
  AsyncThunkConfig
>(
  `${name}/deliverOrderTaskResults`,
  async ({ id, data }, { extra: { ordersService } }) => {
    return await ordersService.deliverTask(id, data);
  }
);

const rejectTask = createAsyncThunk<
  OrderDTO,
  { id: number; data: RejectTaskRequestDTO },
  AsyncThunkConfig
>(
  `${name}/rejectOrderTaskResults`,
  async ({ id, data }, { extra: { ordersService } }) => {
    return await ordersService.rejectTask(id, data);
  }
);

const acceptTask = createAsyncThunk<OrderDTO, { id: number }, AsyncThunkConfig>(
  `${name}/acceptOrderTaskResults`,
  async ({ id }, { extra: { ordersService } }) => {
    return await ordersService.acceptTask(id);
  }
);

const createReview = createAsyncThunk<
  ReviewDTO,
  { orderId: number; data: CreateReviewDTO },
  AsyncThunkConfig
>(
  `${name}/createReview`,
  async ({ orderId, data }, { extra: { ordersService } }) => {
    return await ordersService.createReview(orderId, data);
  }
);

export {
  getAll,
  getById,
  create,
  deliverTask,
  rejectTask,
  acceptTask,
  createReview,
};
