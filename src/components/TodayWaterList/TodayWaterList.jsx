import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditWaterAmountModal from "../Modal/EditWaterAmountModal/EditWaterAmountModal.jsx";
import AddWaterAmountModal from "../Modal/AddWaterAmountModal/AddWaterAmountModal.jsx";
import WaterEntry from "../WaterEntry/WaterEntry.jsx";
import formatTo12HourTime from "../../utils/formatTo12HourTime.js";
import { getWaterNotes } from "../../redux/water/operations.js";
import css from "./TodayWaterList.module.css";

const TodayWaterList = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Отримання токена з Redux
  const [waterEntries, setWaterEntries] = useState([]); // Порожній масив як початковий стан
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // for EditWaterAmountModal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // for AddWaterAmountModal

  useEffect(() => {
    const fetchWaterNotes = async () => {
      try {
        const data = await dispatch(getWaterNotes(token)).unwrap();
        const todayEntries = data.filter((entry) =>
          new Date(entry.date)
            .toISOString()
            .startsWith(new Date().toISOString().split("T")[0])
        );
        const sortedEntries = todayEntries.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setWaterEntries(sortedEntries);
      } catch (error) {
        console.error("Error fetching water notes:", error); // Логування помилки
      }
    };

    fetchWaterNotes();
  }, [dispatch, token]); // Залежності

  // const handleAddWater = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  const handleDelete = (idToDelete) => {
    setWaterEntries((prevEntries) =>
      prevEntries.filter((waterEntries) => waterEntries._id !== idToDelete)
    );
  };

  // for EditWaterAmountModal
  const openEditWaterModal = () => setIsEditModalOpen(true);
  const closeEditWaterModal = () => setIsEditModalOpen(false);
  // for AddWaterAmountModal
  const openAddWaterModal = () => setIsAddModalOpen(true);
  const closeAddWaterModal = () => setIsAddModalOpen(false);

  return (
    <div className={css.todaywaterlist}>
      <h3 className={css.title}>Today</h3>
      <ul className={css.list}>
        {waterEntries.map((waterEntries) => (
          <WaterEntry
            key={waterEntries._id} // використання унікального id для ключа
            waterVolume={waterEntries.waterVolume} // передаємо значення dailyNorm
            time={formatTo12HourTime(waterEntries.date)} // передаємо значення часу
            onEdit={openEditWaterModal}
            onDelete={() => handleDelete(waterEntries._id)}
          />
        ))}
      </ul>
      <button onClick={openAddWaterModal} className={css.add}>
        {/* instead of handleAddWater */}
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
      {/*{isModalOpen && <TodayListModal closeModal={closeModal} />}*/}
      {isAddModalOpen && (
        <AddWaterAmountModal
          isOpen={isAddModalOpen}
          onClose={closeAddWaterModal}
        />
      )}
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
