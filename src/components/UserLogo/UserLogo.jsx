import { useMemo, useState } from "react";
import UserLogoModal from "../Modal/UserLogoModal/UserLogoModal";
import { HiOutlineChevronDown } from "react-icons/hi2";
import css from "./UserLogo.module.css";

export default function UserLogo({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);

  const initials = useMemo(
    () =>
      user?.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase(),
    [user.name, user.email]
  );

  return (
    <>
      <div className={css.userLogo} onClick={toggleModal}>
        <span className={css.userName}>{user.name || user.email}</span>
        <div className={css.avatarWrapper}>
          {user?.avatar ? (
            <img className={css.userAvatar} src={user.avatar} alt={initials} />
          ) : (
            <span className={css.initials}>{initials}</span>
          )}
        </div>
        <HiOutlineChevronDown className={css.dropdownIcon} />
      </div>
      {isModalOpen && <UserLogoModal closeModal={closeModal} />}
    </>
  );
}
