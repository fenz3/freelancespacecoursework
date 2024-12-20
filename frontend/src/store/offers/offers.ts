import {
  getAllByOrderId,
  getLatestByOrderId,
  create,
  accept,
  reject,
} from './actions';
import { actions, reducer } from './slice';

const allActions = {
  ...actions,
  getAllByOrderId,
  getLatestByOrderId,
  create,
  accept,
  reject,
};

export { allActions as actions, reducer };
