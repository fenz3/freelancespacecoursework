import { RouteObject, Navigate } from 'react-router-dom';
import { AppPath } from '../../../../common/enums/enums';
import Layout from '../layout/layout';
import ProtectedRoute from '../protected-route/protected-route';
import { NotFound } from '~/pages/not-found/not-found';
import { UserDTO } from '~/common/types/types';
import { Auth } from '~/pages/auth/auth';
import { Main } from '~/pages/main/main';
import { MyServices } from '~/pages/my-services/my-services';
import { Service } from '~/pages/service/service';
import { UserRoles } from '~/common/enums/app/app';
import { Profile } from '~/pages/profile/profile';
import { BrowseServices } from '~/pages/browse-services/browse-services';
import { MyOrders } from '~/pages/my-orders/my-orders';

interface RouterConfigProps {
  user: UserDTO | null;
  authChecked: boolean;
}

export const createRoutes = ({
  user,
  authChecked,
}: RouterConfigProps): RouteObject[] => [
  {
    path: AppPath.ROOT,
    element: <Layout />,
    children: [
      {
        path: AppPath.SIGN_IN,
        element: user ? <Navigate to="/" /> : <Auth />,
      },
      {
        path: AppPath.SIGN_UP,
        element: user ? <Navigate to="/" /> : <Auth />,
      },
      {
        index: true,
        element: (
          <ProtectedRoute
            user={user}
            authChecked={authChecked}
            element={<Main />}
          />
        ),
      },
      {
        path: AppPath.ROOT,
        element: (
          <ProtectedRoute
            user={user}
            authChecked={authChecked}
            element={<Main />}
          />
        ),
      },
      {
        path: AppPath.MY_SERVICES,
        element: (
          <ProtectedRoute
            user={user}
            authChecked={authChecked}
            restrictedRoles={[UserRoles.CLIENT]}
            element={<MyServices />}
          />
        ),
      },
      {
        path: AppPath.SERVICES,
        element: (
          <ProtectedRoute
            user={user}
            authChecked={authChecked}
            element={<BrowseServices />}
          />
        ),
      },
      {
        path: AppPath.SERVICE,
        element: (
          <ProtectedRoute
            user={user}
            authChecked={authChecked}
            element={<Service />}
          />
        ),
      },
      {
        path: AppPath.PROFILE,
        element: (
          <ProtectedRoute
            user={user}
            authChecked={authChecked}
            element={<Profile />}
          />
        ),
      },
      {
        path: AppPath.MY_ORDERS,
        element: (
          <ProtectedRoute
            user={user}
            authChecked={authChecked}
            element={<MyOrders />}
          />
        ),
      },
      {
        path: AppPath.ANY,
        element: <NotFound />,
      },
    ],
  },
];
