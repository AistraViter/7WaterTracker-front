import { useState } from "react";
import TodayListModal from "../TodayListModal/TodayListModal.jsx";
import css from "./TodayWaterList.module.css";

const TodayWaterList = () => {
  const waterEntries = [
    { amount: 250, time: "7:00 AM" },
    { amount: 220, time: "11:00 AM" },
    { amount: 200, time: "2:00 PM" },
    { amount: 250, time: "7:00 AM" },
    { amount: 220, time: "11:00 AM" },
    { amount: 200, time: "2:00 PM" },
    { amount: 250, time: "7:00 AM" },
    { amount: 220, time: "11:00 AM" },
    { amount: 200, time: "2:00 PM" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleAddWater = () => {
    setIsModalOpen(true); // Open modal on button click
  };

  const closeModal = () => {
    setIsModalOpen(false); // Function to close modal
  };

  return (
    <div className={css.todaywaterlist}>
      <h3 className={css.title}>Today</h3>
      <ul className={css.list}>
        {waterEntries.map((entry, index) => (
          <li key={index} className={css.listitem}>
            <div className={css.con1}>
              <p className={css.glassicon}>
                <svg width="24" height="24" className={css.glassicon}>
                  <use href="/public/sprite.svg#icon-glass" />
                </svg>
              </p>
              <div className={css.numbers}>
                <span className={css.amount}>{entry.amount} ml</span>{" "}
                <span className={css.time}>{entry.time}</span>
              </div>
            </div>
            <div className={css.btns}>
              <button className={css.edit}>
                <svg width="16" height="16" className={css.editicon}>
                  <use href="/public/sprite.svg#icon-edit" />
                </svg>
              </button>
              <button className={css.delete}>
                <svg width="16" height="16" className={css.deleteicon}>
                  <use href="/public/sprite.svg#icon-delete" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleAddWater} className={css.add}>
        <svg width="16" height="16" className={css.addicon}>
          <use href="/public/sprite.svg#icon-smallplus" />
        </svg>
        Add Water
      </button>
      {isModalOpen && <TodayListModal closeModal={closeModal} />}{" "}
      {/* Render modal if open */}
    </div>
  );
};

export default TodayWaterList;
