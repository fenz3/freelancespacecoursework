import { reducer as authReducer } from './auth/auth';
import { reducer as servicesReducer } from './services/services';
import { reducer as imagesReducer } from './images/images';
import { reducer as categoriesReducer } from './categories/categories';
import { reducer as usersReducer } from './users/users';
import { reducer as ordersReducer } from './orders/orders';
import { reducer as offersReducer } from './offers/offers';

const rootReducer = {
  auth: authReducer,
  services: servicesReducer,
  images: imagesReducer,
  categories: categoriesReducer,
  users: usersReducer,
  orders: ordersReducer,
  offers: offersReducer,
};

export { rootReducer };
