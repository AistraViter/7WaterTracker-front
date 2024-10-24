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
              <p className={css.glassicon}>T</p>
              <div className={css.numbers}>
                <span className={css.amount}>{entry.amount} ml</span>{" "}
                <span className={css.time}>{entry.time}</span>
              </div>
            </div>
            <div className={css.btns}>
              <button className={css.edit}>E</button>
              <button className={css.delete}>D</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleAddWater} className={css.add}>
        <span className={css.addicon}>+</span>
        Add Water
      </button>
      {isModalOpen && <TodayListModal closeModal={closeModal} />}{" "}
      {/* Render modal if open */}
    </div>
  );
};

export default TodayWaterList;
