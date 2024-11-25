import { configureStore } from '@reduxjs/toolkit';
import { auth as authService } from '../services/services';
import { services as servicesService } from '../services/services';
import { images as imagesService } from '../services/services';
import { categories as categoriesService } from '../services/services';
import { rootReducer } from './root-reducer';
import { listenerMiddleware } from './middleware/401';

const extraArgument = {
  authService,
  servicesService,
  imagesService,
  categoriesService,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    }).prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, extraArgument };
