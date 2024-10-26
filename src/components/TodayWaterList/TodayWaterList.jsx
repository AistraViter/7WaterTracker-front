import { useState } from "react";
import TodayListModal from "../TodayListModal/TodayListModal.jsx";
import EditWaterAmountModal from '../Modal/EditWaterAmountModal/EditWaterAmountModal.jsx';
import WaterEntry from '../WaterEntry/WaterEntry.jsx';
import css from "./TodayWaterList.module.css";

const TodayWaterList = () => {
  const [waterEntries, setWaterEntries] = useState([
    { amount: 250, time: "7:00 AM" },
    { amount: 220, time: "11:00 AM" },
    { amount: 200, time: "2:00 PM" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAddWater = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (indexToDelete) => {
    setWaterEntries((prevEntries) =>
      prevEntries.filter((_, index) => index !== indexToDelete)
    );
  };

  const openEditWaterModal = () => setIsEditModalOpen(true);
  const closeEditWaterModal = () => setIsEditModalOpen(false);

  return (
    <div className={css.todaywaterlist}>
      <h3 className={css.title}>Today</h3>
      <ul className={css.list}>
        {waterEntries.map((entry, index) => (
          <WaterEntry 
            key={index} 
            entry={entry} 
            index={index} 
            onEdit={openEditWaterModal} 
            onDelete={handleDelete} 
          />
        ))}
      </ul>
      <button onClick={handleAddWater} className={css.add}>
        <svg width="16" height="16" className={css.addicon}>
          <use href="/sprite.svg#icon-smallplus" />
        </svg>
        Add Water
      </button>
      {isModalOpen && <TodayListModal closeModal={closeModal} />}
      {isEditModalOpen && <EditWaterAmountModal isOpen={isEditModalOpen} onClose={closeEditWaterModal} />}
    </div>
  );
};

export default TodayWaterList;
