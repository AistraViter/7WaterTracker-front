// для НЕ авторизованого користувача вставляє компоненти Logo та UserAuth(посилання на signupPage)
// для авторизованого користувача вставляє компоненти Logo та UserLogo (має містити компонент 
// UserLogoModal -> містить SettingModal, UserLogoutModal)

//можна в Header вставляти окремі компоненти, наприклад з Logo та UserLogo зробити компонент UserMenu

//Header як appBar в попередніх дз

import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from './authSlice';
import Logo from "../Logo/Logo";
import UserAuth from "../UserAuth/UserAuth";
import UserLogo from "../UserLogo/UserLogo";

export default function Header() {
    const isAuthenticated = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);

    return (
        <header className="header">
            <Logo />
            <nav>
                {isAuthenticated ? (
                    <UserLogo user={user} />
                ) : (
                    <UserAuth />
                )}
            </nav>
        </header>
    );
} 