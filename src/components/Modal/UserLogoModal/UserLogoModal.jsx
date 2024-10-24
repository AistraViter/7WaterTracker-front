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

  const onClose = () => {
    setIsSettingsModalOpen(false);
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsLogoutModalOpen(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsLogoutModalOpen(false);
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
      <div className={css.dropdownMenu} ref={modalRef}>
        <button
          className={css.settingsBtn}
          onClick={() => setIsSettingsModalOpen(true)}
        >
          <HiCog6Tooth className={css.settingsIcon} />
          Settings
        </button>
        <button className={css.logoutBtn} onClick={handleLogoutClick}>
          <HiOutlineLogout className={css.logoutIcon} />
          Log out
        </button>
      </div>
      {isLogoutModalOpen && (
        <>
          {/* Коли модалка логаута буде працювати - вставити UserLogoutModal */}
        </>
      )}
      {isSettingsModalOpen && <SettingModal onCloseModal={() => onClose()} />}
    </>
  );
};

export default UserLogoModal;
