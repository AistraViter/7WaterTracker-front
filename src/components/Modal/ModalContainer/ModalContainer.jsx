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

  const handleOverlayClick = (event) => {
    // Якщо клік відбувся саме на оверлеї (фоні), закриваємо модалку
    if (event.target.classList.contains(css.backdrop)) {
      closeModal();
    }
  };

  const handleModalClick = (event) => {
    event.stopPropagation(); // Блокує подальше поширення події на батьківські елементи
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={false}
      ariaHideApp={false}
      className={css.modal}
      overlayClassName={css.backdrop}
      onClick={handleOverlayClick}
    >
      <div onClick={handleModalClick} className={css.modalContent}>
        {children}
        <button
          className={clsx(
            css["close-button"],
            buttonClassLogout && css["button-class-logout"],
            buttonClassSettings && css["button-class-settings"]
          )}
          onClick={closeModal}
        >
          <svg className={css.closeIcon} viewBox="0 0 32 32">
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeMiterlimit="4"
              strokeWidth="2"
              d="M8 24l16-16M8 8l16 16"
            ></path>
          </svg>
        </button>
      </div>
    </Modal>
  );
};

export default ModalContainer;
