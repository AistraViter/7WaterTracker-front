import { useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "../AppBar/AppBar.module.css";

function AppBar() {
    const isLoggedIn =useSelector(selectIsLoggedIn);
  return (
    <header className={css.header}>
        <Navigation />
        {isLoggedIn ? <UserMenu />:<AuthNav />}
    </header>
  );
}

export default AppBar;
