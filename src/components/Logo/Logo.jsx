import { Link } from 'react-router-dom';
import css from "../Logo/Logo.module.css"

export default function Logo() {
    return (
        <div className={css.logo}>
            <Link to="/">
                <img src="http://www.w3.org/2000/svg" alt="Tracker of Water Logo" />
            </Link>
        </div>
    );
}