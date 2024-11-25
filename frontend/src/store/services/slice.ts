import { createSlice } from '@reduxjs/toolkit';
import { getAll, create, update, deleteById, getById } from './actions';
import { ServiceDto, ValueOf } from '~/common/types/types';
import { DataStatus } from '~/common/enums/enums';
import { notifyError } from '~/utils/notification/notification';

export interface ServicesState {
  service: null | ServiceDto;
  services: ServiceDto[];
  status: ValueOf<typeof DataStatus>;
  serviceStatus: ValueOf<typeof DataStatus>;
  serviceCreateStatus: ValueOf<typeof DataStatus>;
  serviceDeleteStatus: ValueOf<typeof DataStatus>;
  serviceUpdateStatus: ValueOf<typeof DataStatus>;
  error: { code: string | number | undefined; message: string | undefined };
}

const initialState: ServicesState = {
  service: null,
  services: [],
  status: DataStatus.IDLE,
  serviceStatus: DataStatus.IDLE,
  serviceCreateStatus: DataStatus.IDLE,
  serviceDeleteStatus: DataStatus.IDLE,
  serviceUpdateStatus: DataStatus.IDLE,
  error: { code: undefined, message: undefined },
};

const { reducer, actions, name } = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.status = DataStatus.PENDING;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.services = action.payload;
        state.status = DataStatus.SUCCESS;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch services');
      })
      .addCase(getById.pending, (state) => {
        state.status = DataStatus.PENDING;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.service = action.payload;
        state.serviceStatus = DataStatus.SUCCESS;
      })
      .addCase(getById.rejected, (state, action) => {
        state.serviceStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch service');
      })
      .addCase(create.pending, (state) => {
        state.serviceCreateStatus = DataStatus.PENDING;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.services = [action.payload, ...state.services];
        state.serviceCreateStatus = DataStatus.SUCCESS;
      })
      .addCase(create.rejected, (state, action) => {
        state.serviceCreateStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to create service');
      })
      .addCase(update.pending, (state) => {
        state.serviceUpdateStatus = DataStatus.PENDING;
      })
      .addCase(update.fulfilled, (state, action) => {
        const updatedService = action.payload;
        state.services = state.services.map((service) =>
          service.id === updatedService.id ? updatedService : service
        );
        state.serviceUpdateStatus = DataStatus.SUCCESS;
      })
      .addCase(update.rejected, (state, action) => {
        state.serviceUpdateStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to update service');
      })
      .addCase(deleteById.pending, (state) => {
        state.serviceDeleteStatus = DataStatus.PENDING;
      })
      .addCase(deleteById.fulfilled, (state, action) => {
        const deletedServiceId = action.meta.arg;
        state.services = state.services.filter(
          (service) => service.id.toString() !== deletedServiceId
        );
        state.serviceUpdateStatus = DataStatus.SUCCESS;
      })
      .addCase(deleteById.rejected, (state, action) => {
        state.serviceDeleteStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to delete service');
      });
  },
});

export { reducer, name, actions };
