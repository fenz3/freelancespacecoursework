import { fetchAuthenticatedUser, signIn, signUp, signOut } from './actions';
import { actions, reducer } from './slice';

const allActions = {
  ...actions,
  fetchAuthenticatedUser,
  signIn,
  signUp,
  signOut,
};

export { allActions as actions, reducer };
