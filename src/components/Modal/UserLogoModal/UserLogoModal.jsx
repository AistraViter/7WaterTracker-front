import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiCog6Tooth } from "react-icons/hi2";
import { HiOutlineLogout } from "react-icons/hi";
import css from "./UserLogoModal.module.css";
// import UserLogoutModal from "../UserLogoutModal/UserLogoutModal";

const UserLogoModal = () => {
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navigateToPath = (path) => {
    navigate(`/${path}`);
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true); // Открываем модальное окно для подтверждения логаута
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsLogoutModalOpen(false); // Закрываем модальное окно, если клик вне его (опционально)
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
          onClick={() => navigateToPath("settings")}
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
        <div>
          Коли модалка логаута буде працювати - замінити на UserLogoutModal
        </div>
      )}
    </>
  );
};

export default UserLogoModal;
