import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import {
  AsyncThunkConfig,
  GetAllRequestDto,
  ServiceCreateRequestDto,
  ServiceDto,
} from '~/common/types/types';

const getAll = createAsyncThunk<
  ServiceDto[],
  GetAllRequestDto,
  AsyncThunkConfig
>(`${name}/fetchAll`, async (query, { extra: { servicesService } }) => {
  return await servicesService.getAll(query);
});

const getById = createAsyncThunk<ServiceDto, string, AsyncThunkConfig>(
  `${name}/fetchById`,
  async (id, { extra: { servicesService } }) => {
    return await servicesService.getById(id);
  }
);

const create = createAsyncThunk<
  ServiceDto,
  ServiceCreateRequestDto,
  AsyncThunkConfig
>(`${name}/create`, async (data, { extra: { servicesService } }) => {
  return await servicesService.create(data);
});

const update = createAsyncThunk<
  ServiceDto,
  { id: string; data: ServiceCreateRequestDto },
  AsyncThunkConfig
>(`${name}/update`, async ({ id, data }, { extra: { servicesService } }) => {
  return await servicesService.update(id, data);
});

const deleteById = createAsyncThunk<void, string, AsyncThunkConfig>(
  `${name}/delete`,
  async (id, { extra: { servicesService } }) => {
    await servicesService.delete(id);
  }
);

export { getAll, getById, create, update, deleteById };
