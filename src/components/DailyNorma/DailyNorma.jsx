import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserDailyNorm } from "../../redux/user/selectors.js";
import DailyNormaModal from "../Modal/DailyNormaModal/DailyNormaModal.jsx";

import css from "./DailyNorma.module.css";


const DailyNorma = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dailyNorm = useSelector(selectUserDailyNorm);

  const handleEditClick = () => {
    setIsModalOpen(true); // Open the modal when the "Edit" button is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal without saving
  };
  return (
    <div className={css.dailynorma}>
      <h3 className={css.title}>My daily norma</h3>
      <div className={css.data}>
        <p className={css.norma}>{(dailyNorm / 1000).toFixed(1)} L</p>
        <button onClick={handleEditClick} className={css.btn}>
          Edit
        </button>

        <DailyNormaModal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default DailyNorma;
