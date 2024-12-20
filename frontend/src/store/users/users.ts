import { update } from './actions';
import { actions, reducer } from './slice';

const allActions = {
  ...actions,
  update,
};

export { allActions as actions, reducer };
