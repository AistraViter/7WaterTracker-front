import { Link } from 'react-router-dom';
import css from "../UserAuth/UserAuth.module.css";


export default function UserAuth() {
    return (
        <div className={css.userAuth}>
            <Link to="/signin" className={css.link}>
                <p className={css.signup}>Sign in</p>
                <svg className={css.icon} width="28" height="28">
                    <use href="/user-logo.svg#icon-outline"></use>
                </svg>
            </Link>
        </div>
    )
}

// Задісейблила частину коду через помилку в консолі
// Суть помилки, що а не може бути вкладений в а. Твій а вкладається вище в а на Хедері

// Warning: validateDOMNesting(...): <a> cannot appear as a descendant of <a>.
//     at a
//     at a
//     at LinkWithRef (http://localhost:5176/node_modules/.vite/deps/react-router-dom.js?v=dd133fda:5263:5)
//     at div
//     at UserAuth
//     at nav
//     at header
//     at Header (http://localhost:5176/src/components/Header/Header.jsx:26:27)