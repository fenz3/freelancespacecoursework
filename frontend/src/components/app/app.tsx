import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useEffect, useState } from 'react';
import { fetchAuthenticatedUser } from '../../store/auth/actions';
import { getToken } from '../../utils/auth';
import { createRoutes } from './components/router-config/router-config';
import { Loader } from '../loader/loader';
import './styles.module.css';
import { DataStatus } from '~/common/enums/enums';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, status: authStatus } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  const isLoading = !authChecked || authStatus === DataStatus.PENDING;

  useEffect(() => {
    const checkAuth = async () => {
      if (getToken()) {
        await dispatch(fetchAuthenticatedUser());
      }
      setAuthChecked(true);
    };
    checkAuth();
  }, [dispatch]);

  const routes = createRoutes({
    user,
    authChecked,
  });

  const router = createBrowserRouter(routes);

  if (isLoading) {
    return <Loader />;
  }

  return <RouterProvider router={router} />;
};

export default App;
