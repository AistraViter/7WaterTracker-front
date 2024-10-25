import { useState } from "react";
import css from "./DailyNorma.module.css";
import DailyNormaModal from "../Modal/DailyNormaModal/DailyNormaModal.jsx";

const DailyNorma = () => {
  const [dailyNorm, setDailyNorm] = useState(1.5); // Default value: 1.5 liters
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true); // Open the modal when the "Edit" button is clicked
  };

  const handleSave = (newNorm) => {
    setDailyNorm(newNorm);
    setIsModalOpen(false); // Close the modal after saving the new value
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal without saving
  };
  return (
    <div className={css.dailynorma}>
      <h3 className={css.title}>My daily norma</h3>
      <div className={css.data}>
        <p className={css.norma}>{dailyNorm} L</p>
        <button onClick={handleEditClick} className={css.btn}>
          Edit
        </button>
        {isModalOpen && (
          <DailyNormaModal
            currentNorm={dailyNorm}
            onSave={handleSave}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default DailyNorma;
