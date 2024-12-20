import {
  getAll,
  getById,
  create,
  deliverTask,
  rejectTask,
  acceptTask,
  createReview,
} from './actions';
import { actions, reducer } from './slice';

const allActions = {
  ...actions,
  getAll,
  getById,
  create,
  deliverTask,
  rejectTask,
  acceptTask,
  createReview,
};

export { allActions as actions, reducer };
