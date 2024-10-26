import { useState } from "react";
import TodayListModal from "../TodayListModal/TodayListModal.jsx";
import css from "./TodayWaterList.module.css";

import EditWaterAmountModal from '../Modal/EditWaterAmountModal/EditWaterAmountModal.jsx'

const TodayWaterList = () => {
  const [waterEntries, setWaterEntries] = useState([
    { amount: 250, time: "7:00 AM" },
    { amount: 220, time: "11:00 AM" },
    { amount: 200, time: "2:00 PM" },
    { amount: 250, time: "7:00 AM" },
    { amount: 220, time: "11:00 AM" },
    { amount: 200, time: "2:00 PM" },
    { amount: 250, time: "7:00 AM" },
    { amount: 220, time: "11:00 AM" },
    { amount: 200, time: "2:00 PM" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // for EditWaterAmountModal


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
          <li key={index} className={css.listitem}>
            <div className={css.con1}>
              <p className={css.glassicon}>
                <svg width="24" height="24" className={css.glassicon}>
                  <use href="/sprite.svg#icon-glass" />
                </svg>
              </p>
              <div className={css.numbers}>
                <span className={css.amount}>{entry.amount} ml</span>{" "}
                <span className={css.time}>{entry.time}</span>
              </div>
            </div>
            <div className={css.btns}>
              <button className={css.edit} onClick={openEditWaterModal}>
                <svg width="16" height="16" className={css.editicon}>
                  <use href="/sprite.svg#icon-edit" />
                </svg>
              </button>
              <button
                className={css.delete}
                onClick={() => handleDelete(index)}
              >
                <svg width="16" height="16" className={css.deleteicon}>
                  <use href="/sprite.svg#icon-delete" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleAddWater} className={css.add}>
        <svg width="16" height="16" className={css.addicon}>
          <use href="/sprite.svg#icon-smallplus" />
        </svg>
        Add Water
      </button>
      {isModalOpen && <TodayListModal closeModal={closeModal} />}
      {/* Render modal if open */}
      {/* EditWaterAmountModal*/}
      {isEditModalOpen && <EditWaterAmountModal isOpen={isEditModalOpen} onClose={closeEditWaterModal} />}

    </div>
  );
};

export default TodayWaterList;