import { useEffect, useRef, useState } from "react";
import { HiCog6Tooth } from "react-icons/hi2";
import { HiOutlineLogout } from "react-icons/hi";
import css from "./UserLogoModal.module.css";
// import UserLogoutModal from "../UserLogoutModal/UserLogoutModal";
import SettingModal from "../SettingModal/SettingModal";

const UserLogoModal = () => {
  const modalRef = useRef(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleSettingsClick = () => {
    setIsSettingsModalOpen(true);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {isDropdownOpen && (
        <div className={css.dropdownMenu} ref={modalRef}>
          <button className={css.settingsBtn} onClick={handleSettingsClick}>
            <HiCog6Tooth className={css.settingsIcon} />
            Settings
          </button>
          <button className={css.logoutBtn} onClick={handleLogoutClick}>
            <HiOutlineLogout className={css.logoutIcon} />
            Log out
          </button>
        </div>
      )}
      {isSettingsModalOpen && <SettingModal />}
      {/* компонент <SettingModal /> пустий. Всередині нього відмалював div для
      перевірки. */}
      {/* {isLogoutModalOpen && <UserLogoutModal />} */}
      {/* в консолі
      помилка Uncaught SyntaxError: The requested module
      '/src/redux/auth/operations.js?t=1729871944280' does not provide an export
      named 'logOut' (at UserLogoutModal.jsx:3:10) */}
    </>
  );
};

export default UserLogoModal;
