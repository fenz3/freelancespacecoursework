import { getAll, getById, create, update, deleteById } from './actions';
import { actions, reducer } from './slice';

const allActions = {
  ...actions,
  getAll,
  getById,
  create,
  update,
  deleteById,
};

export { allActions as actions, reducer };
