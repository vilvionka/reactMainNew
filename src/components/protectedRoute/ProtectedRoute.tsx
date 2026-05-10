import { useAppSelector } from "../../services/hooks";
import { Navigate, useLocation } from "react-router-dom";
import { FC, ReactElement } from 'react';

interface IProtectedRouteProps {
  element: ReactElement;
  anonymous?: boolean
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ element, anonymous = false }) => {
  const user = useAppSelector((store) => store.userStore.user);
  const isAuthChecked = useAppSelector((store) => store.userStore.isAuthchecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <div>Загрузка пользователя...</div>;
  }

  if (user && anonymous) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  if (!user && !anonymous) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
}

export default ProtectedRoute;
