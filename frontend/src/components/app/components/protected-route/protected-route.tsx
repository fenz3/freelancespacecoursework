import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppPath } from '~/common/enums/enums';
import { UserDTO } from '~/common/types/types';
import { Loader } from '~/components/loader/loader';

interface ProtectedRouteProps {
  element: React.ReactElement;
  user: UserDTO | null;
  authChecked: boolean;
  restrictedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  user,
  authChecked,
  restrictedRoles = [],
}) => {
  if (!authChecked) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to={AppPath.SIGN_IN} />;
  }

  if (!user.role || restrictedRoles.includes(user.role)) {
    return <Navigate to={AppPath.NOT_FOUND} />;
  }

  return element;
};

export default ProtectedRoute;
