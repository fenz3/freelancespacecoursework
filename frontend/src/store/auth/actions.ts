import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import {
  AsyncThunkConfig,
  AuthResponseDto,
  SignInRequestDto,
  SignUpRequestDto,
} from '~/common/types/types';

const fetchAuthenticatedUser = createAsyncThunk<
  AuthResponseDto,
  void,
  AsyncThunkConfig
>(`${name}/authenticatedUser`, async (_payload, { extra }) => {
  const { authService } = extra;
  const tasks = await authService.getAuthenticatedUser();

  return tasks;
});

const signIn = createAsyncThunk<
  AuthResponseDto,
  SignInRequestDto,
  AsyncThunkConfig
>(`${name}/signIn`, async (credentials, { extra }) => {
  const { authService } = extra;

  const tasks = await authService.signIn(credentials);

  return tasks;
});

const signUp = createAsyncThunk<
  AuthResponseDto,
  SignUpRequestDto,
  AsyncThunkConfig
>(`${name}/signUp`, async (credentials, { extra }) => {
  const { authService } = extra;

  const tasks = await authService.signUp(credentials);

  return tasks;
});

const signOut = createAction(`${name}/signOut`);

export { fetchAuthenticatedUser, signIn, signUp, signOut };
