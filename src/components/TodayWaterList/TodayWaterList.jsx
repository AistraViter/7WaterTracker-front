import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditWaterAmountModal from "../Modal/EditWaterAmountModal/EditWaterAmountModal.jsx";
import AddWaterAmountModal from "../Modal/AddWaterAmountModal/AddWaterAmountModal.jsx";
import WaterEntry from "../WaterEntry/WaterEntry.jsx";
import formatTo12HourTime from "../../utils/formatTo12HourTime.js";
import {
  getWaterNotes,
  deleteWaterNote,
  postWaterNote, // Додано для створення нового запису
} from "../../redux/water/operations.js";
import css from "./TodayWaterList.module.css";

const TodayWaterList = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [waterEntries, setWaterEntries] = useState([]); // Порожній масив як початковий стан
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedWaterEntry, setSelectedWaterEntry] = useState(null);
  const [refresh, setRefresh] = useState(false); // Додаємо змінну для контролю оновлення

  const fetchWaterNotes = async () => {
    try {
      const data = await dispatch(getWaterNotes()).unwrap();
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
      console.error("Error fetching water notes:", error);
    }
  };

  useEffect(() => {
    fetchWaterNotes();
  }, [dispatch, token, refresh]); // Додаємо refresh до залежностей useEffect

  const handleDelete = (idToDelete) => {
    setWaterEntries((prevEntries) =>
      prevEntries.filter((waterEntries) => waterEntries._id !== idToDelete)
    );
    try {
      dispatch(deleteWaterNote(idToDelete)).unwrap();
    } catch (error) {
      console.error("Error deleting water note:", error);
    }
  };

  const openEditWaterModal = (waterEntry) => {
    setSelectedWaterEntry(waterEntry);
    setIsEditModalOpen(true);
  };

  const closeEditWaterModal = (updatedEntry) => {
    setIsEditModalOpen(false);
    setSelectedWaterEntry(null);

    if (updatedEntry) {
      setRefresh((prev) => !prev); // Тригеримо оновлення списку після редагування
    }
  };

  const openAddWaterModal = () => setIsAddModalOpen(true);
  const closeAddWaterModal = (newEntry) => {
    setIsAddModalOpen(false);

    if (newEntry) {
      setRefresh((prev) => !prev); // Тригеримо оновлення списку після додавання
    }
  };

  const handleAddWaterEntry = async (waterVolume, time) => {
    try {
      const newEntry = await dispatch(
        postWaterNote({ waterVolume, date: time })
      ).unwrap();
      closeAddWaterModal(newEntry);
    } catch (error) {
      console.error("Error adding new water note:", error);
    }
  };

  return (
    <div className={css.todaywaterlist}>
      <h3 className={css.title}>Today</h3>
      <ul className={css.list}>
        {waterEntries.length > 0 ? (
          waterEntries.map((waterEntry) => (
            <WaterEntry
              key={waterEntry._id}
              waterVolume={waterEntry.waterVolume}
              time={formatTo12HourTime(waterEntry.date)}
              onEdit={() => openEditWaterModal(waterEntry)}
              onDelete={() => handleDelete(waterEntry._id)}
            />
          ))
        ) : (
          <li className={css.noEntries}>No water entries for today.</li>
        )}
      </ul>
      <button onClick={openAddWaterModal} className={css.add}>
        Add Water
      </button>
      {isAddModalOpen && (
        <AddWaterAmountModal
          isOpen={isAddModalOpen}
          onClose={closeAddWaterModal}
          onAddWater={handleAddWaterEntry}
        />
      )}
      {isEditModalOpen && selectedWaterEntry && (
        <EditWaterAmountModal
          isOpen={isEditModalOpen}
          onClose={closeEditWaterModal}
          previousAmount={selectedWaterEntry.waterVolume}
          previousTime={formatTo12HourTime(selectedWaterEntry.date)}
          waterId={selectedWaterEntry._id}
        />
      )}
    </div>
  );
};

export default TodayWaterList;
