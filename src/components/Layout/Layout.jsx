import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import "normalize.css";
import AppBar from "../AppBar/AppBar";

function Layout() {
  return (
    <div>
      <AppBar />
      <Suspense fallback={null}>
      <Outlet />
      </Suspense>
    </div>
  );
}

export default Layout;
