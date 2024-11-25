import { reducer as authReducer } from './auth/auth';
import { reducer as servicesReducer } from './services/services';
import { reducer as imagesReducer } from './images/images';
import { reducer as categoriesReducer } from './categories/categories';

const rootReducer = {
  auth: authReducer,
  services: servicesReducer,
  images: imagesReducer,
  categories: categoriesReducer,
};

export { rootReducer };
