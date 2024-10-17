import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "../Navigation/Navigation.module.css";
const navItem = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

function AuthNav() {
  return (
    <nav className={css.authNav}>
      <NavLink to="/register" className={navItem}>
        Register
      </NavLink>
      <NavLink to="/login" className={navItem}>
        Login
      </NavLink>
    </nav>
  );
}
export default AuthNav;
