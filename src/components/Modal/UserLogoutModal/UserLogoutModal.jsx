import ModalContainer from "../ModalContainer/ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/auth/operations";
import css from "./UserLogoutModal.module.css";
import { selectLogOutModal } from "../../../redux/modal/selectors";
import { closeModal } from "../../../redux/modal/slice";

export default function UserLogoutModal() {
  const dispatch = useDispatch();
  const modalIsOpen = useSelector(selectLogOutModal);
  console.log("Modal is open:", modalIsOpen);

  return (
    <ModalContainer
      modalIsOpen={modalIsOpen}
      closeModal={() => dispatch(closeModal())}
      buttonClassLogout={true}
      className={css.modalContent}
    >
    {modalIsOpen && ( 
      <div className={css.modalUserLogout}>
        <div className={css.textBlock}>
          <h2 className={css.title}>Log out</h2>
          <h3 className={css.text}>Do you really want to leave?</h3>
        </div>
        <div className={css.modalButtons}>
          <button
            className={css.buttonCancel}
            onClick={() => dispatch(closeModal())}
          >
            Cancel
          </button>
          <button
            className={css.buttonLogout}
            onClick={() => {
              dispatch(logout());
              dispatch(closeModal());
            }}
          >
            Log out
          </button>
        </div>
      </div>
    )}
    </ModalContainer>
  );
}
