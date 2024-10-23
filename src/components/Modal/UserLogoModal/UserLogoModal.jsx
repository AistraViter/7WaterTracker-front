import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiCog6Tooth } from "react-icons/hi2";
import { HiOutlineLogout } from "react-icons/hi";
import css from "./UserLogoModal.module.css";

const UserLogoModal = ({ closeModal }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const navigateToPath = (path) => {
    navigate(`/${path}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigateToPath("signin");
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeModal();
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
    <div className={css.dropdownMenu} ref={modalRef}>
      <button
        className={css.settingsBtn}
        onClick={() => navigateToPath("settings")}
      >
        <HiCog6Tooth className={css.settingsIcon} />
        Settings
      </button>
      <button className={css.logoutBtn} onClick={handleLogout}>
        <HiOutlineLogout className={css.logoutIcon} />
        Log out
      </button>
    </div>
  );
};

export default UserLogoModal;
