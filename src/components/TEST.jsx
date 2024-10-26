import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWaterNotes } from "../../redux/water/operations.js"; // Імпортуйте операцію для отримання даних
import { selectWaterTodayPanel } from "../../redux/water/selectors.js"; // Імпортуйте селектор
import TodayListModal from "../TodayListModal/TodayListModal.jsx";
import EditWaterAmountModal from "../Modal/EditWaterAmountModal/EditWaterAmountModal.jsx";
import css from "./TodayWaterList.module.css";

const TodayWaterList = () => {
  const dispatch = useDispatch();
  const waterEntries = useSelector(selectWaterTodayPanel); // Отримуйте записи води з Redux
  console.log("Water entries from Redux:", waterEntries);

  const [isModalOpen, setIsModalOpen] = useState(false); // State для контролю видимості модалей
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // для EditWaterAmountModal

  // Викликати getWaterNotes, коли компонент монтується
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500)); // невелика затримка
      dispatch(getWaterNotes());
    };
    fetchData();
  }, [dispatch]);

  // Отримання сьогоднішньої дати у форматі YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  // Фільтруємо записи, щоб залишити лише ті, що мають сьогоднішню дату
  const todayNotes = waterEntries
    .filter(note => new Date(note.date).toISOString().split('T')[0] === today) // Порівнюємо дати
    .map(note => ({
      // Форматування часу у вигляді HH:MM
      date: new Date(note.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      waterVolume: note.waterVolume,
    }));

  const handleAddWater = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditWaterModal = () => setIsEditModalOpen(true);
  const closeEditWaterModal = () => setIsEditModalOpen(false);

  return ( 
    <div className={css.todaywaterlist}>
      <h3 className={css.title}>Today</h3>
      <ul className={css.list}>
        {todayNotes.map((entry, index) => (
          <li key={index} className={css.listitem}>
            <div className={css.con1}>
              <p className={css.glassicon}>
                <svg width="24" height="24" className={css.glassicon}>
                  <use href="/sprite.svg#icon-glass" />
                </svg>
              </p>
              <div className={css.numbers}>
                <span className={css.amount}>{entry.waterVolume} ml</span>{" "}
                <span className={css.time}>{entry.date}</span>
              </div>
            </div>
            <div className={css.btns}>
              <button className={css.edit} onClick={openEditWaterModal}>
                <svg width="16" height="16" className={css.editicon}>
                  <use href="/sprite.svg#icon-edit" />
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



