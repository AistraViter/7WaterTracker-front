import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector((state) => state.auth.token);

  // Очистка токена від зайвих лапок
  const cleanedToken = token ? token.replace(/"/g, '') : null;

  // Виводимо токен у консоль
  console.log("Токен PrivateRoute:", cleanedToken);


  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};