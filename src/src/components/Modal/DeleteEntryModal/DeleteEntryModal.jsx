import css from './DeleteEntryModal.module.css';
import sprite from "./img/icons/symbol-defs.svg";

const DeleteEntryModal = ({ isOpen, onClose, handleDelete }) => {

    const handleDeleteAndClose = () => {
        handleDelete();
        onClose();
    }

    return (
        isOpen && 
        <div className={css.modalOverlay}>
            <div className={css.modalWindow}>
                <div className={css.headerDiv}>
                    <p className={css.headerTitle}>Delete entry</p>
                    <button className={css.closeButton} onClick={onClose}>
                    <svg className={css.closeIcon} aria-label="menu close icon">
                        <use href={`${sprite}#icon-x-mark`}></use>
                    </svg>
                    </button>
                </div>
                <p className={css.questApprove}>Are you sure you want to delete the entry?</p>
                <div className={css.buttons}>
                    <button onClick={handleDeleteAndClose} className={css.deleteButton}>Delete</button>
                    <button onClick={onClose} className={css.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>
    )
 }

export default DeleteEntryModal;