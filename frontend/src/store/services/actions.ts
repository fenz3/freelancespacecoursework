import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import {
  AsyncThunkConfig,
  GetAllServicesDTO,
  GetAllServicesRequestDTO,
  ServiceCreateRequestDTO,
  ServiceDTO,
} from '~/common/types/types';

const getAll = createAsyncThunk<
  GetAllServicesDTO,
  GetAllServicesRequestDTO,
  AsyncThunkConfig
>(`${name}/fetchAll`, async (query, { extra: { servicesService } }) => {
  return await servicesService.getAll(query);
});

const getById = createAsyncThunk<ServiceDTO, string, AsyncThunkConfig>(
  `${name}/fetchById`,
  async (id, { extra: { servicesService } }) => {
    return await servicesService.getById(id);
  }
);

const create = createAsyncThunk<
  ServiceDTO,
  ServiceCreateRequestDTO,
  AsyncThunkConfig
>(`${name}/create`, async (data, { extra: { servicesService } }) => {
  return await servicesService.create(data);
});

const update = createAsyncThunk<
  ServiceDTO,
  { id: string; data: ServiceCreateRequestDTO },
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
