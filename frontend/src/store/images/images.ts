import { uploadImage } from './actions';
import { actions, reducer } from './slice';

const allActions = {
  ...actions,
  uploadImage,
};

export { allActions as actions, reducer };
