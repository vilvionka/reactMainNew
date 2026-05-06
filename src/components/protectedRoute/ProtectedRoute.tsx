import { useAppSelector } from "../../services/hooks";
import { Navigate } from "react-router-dom";
import { FC, ReactElement } from 'react';

interface IProtectedRouteProps {
  element: ReactElement;
  anonymous?: boolean
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ element, anonymous = false }) => {
  const user = useAppSelector((store) => store.userStore.user);
  const isAuthChecked = useAppSelector((store) => store.userStore.isAuthchecked);

  if (!isAuthChecked) {
    return <div>Загрузка пользователя...</div>;
  }

  if (user && anonymous) {
    return <Navigate to="/" />;
  }

  if (!user && !anonymous) {
    return <Navigate to="/login" />;
  }

  return element;
}

export default ProtectedRoute;
