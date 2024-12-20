import { getAll, getSubcategoriesByCategoryId } from './actions';
import { actions, reducer } from './slice';

const allActions = {
  ...actions,
  getAll,
  getSubcategoriesByCategoryId,
};

export { allActions as actions, reducer };
