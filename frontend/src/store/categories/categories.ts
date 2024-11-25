import {
  getAll
} from './actions';
import { actions, reducer } from './slice';

const allActions = {
  ...actions,
  getAll
};

export { allActions as actions, reducer };
