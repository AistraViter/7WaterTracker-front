import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./Navigation.module.css";
const navItem = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={css.navigation}>
      <NavLink to="/" className={navItem}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/contacts" className={navItem}>
          Contacts
        </NavLink>
      )}
    </nav>
  );
}

export default Navigation;
