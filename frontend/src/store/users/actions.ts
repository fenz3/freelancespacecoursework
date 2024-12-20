import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import { AsyncThunkConfig, UserPatchRequestDTO } from '~/common/types/types';
import { actions as authActions } from '~/store/auth/auth';

const update = createAsyncThunk<
  void,
  { id: string; data: UserPatchRequestDTO },
  AsyncThunkConfig
>(
  `${name}/update`,
  async ({ id, data }, { dispatch, extra: { usersService } }) => {
    await usersService.update(id, data);
    await dispatch(authActions.fetchAuthenticatedUser());
  }
);

export { update };
