import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/slice";

export const SharedLayout = () => {
  const isAuthenticated = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return (
    <div>
      <Header isAuthenticated={isAuthenticated} user={user} />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};