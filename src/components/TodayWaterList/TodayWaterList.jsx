import { useState, useEffect } from "react";
import TodayListModal from "../TodayListModal/TodayListModal.jsx";
import EditWaterAmountModal from "../Modal/EditWaterAmountModal/EditWaterAmountModal.jsx";
import WaterEntry from "../WaterEntry/WaterEntry.jsx";
import formatTo12HourTime from "../../utils/formatTo12HourTime.js"
import filterTodayEntries from "../../utils/filterTodayEntries.js"
import css from "./TodayWaterList.module.css";

const TodayWaterList = () => {
  const [waterEntries, setWaterEntries] = useState([
    { id: "15", dailyNorm: 250, date: "2024-10-26T10:59:33.361Z" },
    { id: "17", dailyNorm: 220, date: "2024-10-26T20:59:33.361Z" },
    { id: "25", dailyNorm: 200, date: "2024-10-25T00:59:33.361Z" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Виконуємо фільтрацію і сортування при завантаженні компонента
    useEffect(() => {
      const todayEntries = filterTodayEntries(waterEntries);
      const sortedEntries = todayEntries.sort((a, b) => new Date(a.date) - new Date(b.date));
      setWaterEntries(sortedEntries);
    }, []);
  

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
        {waterEntries.map((waterEntries) => (
          <WaterEntry
            key={waterEntries.id} // використання унікального id для ключа
            dailyNorm={waterEntries.dailyNorm} // передаємо значення dailyNorm
            time={formatTo12HourTime(waterEntries.date)} // передаємо значення часу
            onEdit={openEditWaterModal}
            onDelete={() => handleDelete(waterEntries.id)}
          />
        ))}
      </ul>
      <button onClick={handleAddWater} className={css.add}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 32 32"
          fill="none"
          className={css.addicon}
        >
          <path
            stroke="#407bff"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6V18M18 12H6"
            className={css.addicon}
          />
        </svg>
        Add Water
      </button>
      {isModalOpen && <TodayListModal closeModal={closeModal} />}
      {isEditModalOpen && (
        <EditWaterAmountModal
          isOpen={isEditModalOpen}
          onClose={closeEditWaterModal}
        />
      )}
    </div>
  );
};

export default TodayWaterList;
