import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import css from "../Navigation/Navigation.module.css";
import { logOut } from "../../redux/auth/operations";

function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <ul className={css.userMenu}>
      <li>
        {user?.name ? <p> Welcome, {user.name}! </p> : <p> Welcome, Guest! </p>}
      </li>
      <li>
        <button type="button" onClick={() => dispatch(logOut())}>
          Logout
        </button>
      </li>
    </ul>
  );
}

export default UserMenu;
