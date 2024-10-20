import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

export const SharedLayout = ({ isAuthenticated, setIsAuthenticated, user }) => {

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div>
      <Header isAuthenticated={isAuthenticated} user={user} handleLogout={handleLogout} />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};