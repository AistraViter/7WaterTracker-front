// Крок 0 доававання імпортів для встановлення токена
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
//
import EditWaterAmountModal from "../Modal/EditWaterAmountModal/EditWaterAmountModal.jsx";
import AddWaterAmountModal from "../Modal/AddWaterAmountModal/AddWaterAmountModal.jsx";
import DeleteEntryModal from "../Modal/DeleteEntryModal/DeleteEntryModal.jsx";
import WaterEntry from "../WaterEntry/WaterEntry.jsx";
import formatTo12HourTime from "../../utils/formatTo12HourTime.js";
import {
  getWaterNotes,
  deleteWaterNote,
  postWaterNote,
} from "../../redux/water/operations.js";
import css from "./TodayWaterList.module.css";

const TodayWaterList = () => {
  // Крок 1 доававання конастнт для використання токена вкомпоненті
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  
  const setAuthHeader = (token) => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      console.log("Заголовок авторизації встановлено:", `Bearer ${token}`);
    } else {
      delete axios.defaults.headers.common.Authorization;
      console.log("Токена немає");
    }
  };
  
  useEffect(() => {
    setAuthHeader(token);
    if (token) {
      console.log("Токен отримано:", token);
    }
  }, [token]);
  
  const [waterEntries, setWaterEntries] = useState([]); // Порожній масив як початковий стан
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteEntryModalOpen, setIsDeleteEntryModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedWaterEntry, setSelectedWaterEntry] = useState(null);
  const [refresh, setRefresh] = useState(false); // Додаємо змінну для контролю оновлення

  const fetchWaterNotes = async () => {
    setAuthHeader(token); // Крок 3 Встановлюємо заголовок перед запитом
    console.log ("Заголовок авторизації перед запитом:" )

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
  }, [dispatch, refresh]); // Додаємо refresh до залежностей useEffect

  const handleDelete = async (idToDelete) => {
    console.log("Trying to delete water note with ID:", idToDelete);
    try {
      await dispatch(deleteWaterNote(idToDelete)).unwrap();
      setWaterEntries((prevEntries) =>
        prevEntries.filter((waterEntries) => waterEntries._id !== idToDelete)
      );
    } catch (error) {
      console.error("Error deleting water note:", error);
    }
  };

  const openEditWaterModal = (waterEntry) => {
    setSelectedWaterEntry(waterEntry);
    setIsEditModalOpen(true);
  };

  const openDeleteEntryWaterModal = (waterEntry) => {
    console.log("Selected water entry:", waterEntry);
    setSelectedWaterEntry(waterEntry);
    setIsDeleteEntryModalOpen(true);
  };

  const closeEditWaterModal = (updatedEntry) => {
    setIsEditModalOpen(false);
    setSelectedWaterEntry(null);

    if (updatedEntry) {
      setWaterEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry._id === updatedEntry._id ? updatedEntry : entry
        )
      );
    }
    setRefresh((prev) => !prev); // Тригеримо оновлення списку після редагування
  };

  const closeDeleteEntryWaterModal = () => {
    setIsDeleteEntryModalOpen(false);
    setSelectedWaterEntry(null);
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
              onDelete={() => openDeleteEntryWaterModal(waterEntry)}
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
          onUpdate={(updatedEntry) => closeEditWaterModal(updatedEntry)} // update water entries
        />
      )}
      {isDeleteEntryModalOpen && selectedWaterEntry && (
        <DeleteEntryModal
          isOpen={isDeleteEntryModalOpen}
          onClose={closeDeleteEntryWaterModal}
          handleDelete={() => handleDelete(selectedWaterEntry._id)}
        />
      )}
    </div>
  );
};

export default TodayWaterList;
