import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const selectIsLoggedIn = (state) => state.auth.isLoggedIn

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};