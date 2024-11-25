import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthenticatedUser, signIn, signUp, signOut } from './actions';
import { UserDto, ValueOf } from '~/common/types/types';
import { DataStatus } from '~/common/enums/enums';
import { notifyError } from '~/utils/notification/notification';
import { removeToken } from '~/utils/auth';

export interface AuthState {
  user: UserDto | null;
  status: ValueOf<typeof DataStatus>;
  error: { code: string | number | null; message: string | null };
}

const initialState: AuthState = {
  user: null,
  status: DataStatus.IDLE,
  error: { code: null, message: null },
};

const { reducer, actions, name } = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthenticatedUser.pending, (state) => {
        state.status = DataStatus.PENDING;
        state.error = { code: null, message: null };
      })
      .addCase(fetchAuthenticatedUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = DataStatus.SUCCESS;
        state.error = { code: null, message: null };
      })
      .addCase(fetchAuthenticatedUser.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code || null,
          message: action.error.message || null,
        };
        notifyError(
          action.error.message || 'Failed to fetch authenticated user.'
        );
      })
      .addCase(signIn.pending, (state) => {
        state.status = DataStatus.PENDING;
        state.error = { code: null, message: null };
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = DataStatus.SUCCESS;
        state.error = { code: null, message: null };
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code || null,
          message: action.error.message || null,
        };
        notifyError(action.error.message || 'Sign in failed.');
      })
      .addCase(signUp.pending, (state) => {
        state.status = DataStatus.PENDING;
        state.error = { code: null, message: null };
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = DataStatus.SUCCESS;
        state.error = { code: null, message: null };
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code || null,
          message: action.error.message || null,
        };
        notifyError(action.error.message || 'Sign up failed.');
      })
      .addCase(signOut, (state) => {
        state.user = null;
        removeToken();
      });
  },
});

export { reducer, name, actions };
