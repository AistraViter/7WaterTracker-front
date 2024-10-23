import Modal from "react-modal";
import css from "./ModalContainer.module.css";
import clsx from "clsx";
import { useEffect } from "react";

Modal.setAppElement(document.getElementById("root"));

const ModalContainer = ({
  modalIsOpen,
  closeModal,
  buttonClassLogout = false,
  buttonClassSettings = false,
  children,
}) => {
  useEffect(() => {
    if (modalIsOpen) {
      document.body.classList.add(css["no-scroll"]);
    } else {
      document.body.classList.remove(css["no-scroll"]);
    }
    return () => {
      document.body.classList.remove(css["no-scroll"]);
    };
  }, [modalIsOpen]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      className={css.modal}
      overlayClassName={css.backdrop}
    >
      {children}
      <button
        className={clsx(
          css["close-button"],
          buttonClassLogout && css["button-class-logout"],
          buttonClassSettings && css["button-class-settings"]
        )}
        onClick={closeModal}
      >
        <svg className={css["close-icon"]}>
          <use href="/public/icon.svg#icon-outline"></use>
        </svg>
      </button>
    </Modal>
  );
};

export default ModalContainer;
