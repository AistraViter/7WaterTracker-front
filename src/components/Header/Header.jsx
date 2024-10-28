import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Logo from "../Logo/Logo";
import UserAuth from "../UserAuth/UserAuth";
import UserLogo from "../UserLogo/UserLogo";
import css from "../Header/Header.module.css";

export default function Header() {
  const isAuthenticated = useSelector(selectIsLoggedIn);

  return (
    <header>
      <div className={css.container}>
        <Logo />
        <nav className={css.nav}>
          {isAuthenticated ? <UserLogo /> : <UserAuth />}
        </nav>
      </div>
    </header>
  );
}
