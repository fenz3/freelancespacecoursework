import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppPath } from '~/common/enums/enums';
import { UserDto } from '~/common/types/types';
import { Loader } from '~/components/loader/loader';

interface ProtectedRouteProps {
  element: React.ReactElement;
  user: UserDto | null;
  authChecked: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  user,
  authChecked,
}) => {
  if (!authChecked) {
    return <Loader />;
  }
  return user ? element : <Navigate to={AppPath.SIGN_IN} />;
};
export default ProtectedRoute;
