// для НЕ авторизованого користувача вставляє компоненти Logo та UserAuth(посилання на signupPage)
// для авторизованого користувача вставляє компоненти Logo та UserLogo (має містити компонент
// UserLogoModal -> містить SettingModal, UserLogoutModal)

//можна в Header вставляти окремі компоненти, наприклад з Logo та UserLogo зробити компонент UserMenu

//Header як appBar в попередніх дз

import Logo from "../Logo/Logo";
import UserAuth from "../UserAuth/UserAuth";
import UserLogo from "../UserLogo/UserLogo";
import css from "../Header/Header.module.css";

export default function Header() {
  const isAuthenticated = true;
  const user = {
    name: "Ivan",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s",
    email: "vasya@228gmail.com",
  };
  console.log(isAuthenticated, "isAuthenticated");
  return (
    <header className={css.header}>
      <Logo />
      <nav>{isAuthenticated ? <UserLogo user={user} /> : <UserAuth />}</nav>
    </header>
  );
}
