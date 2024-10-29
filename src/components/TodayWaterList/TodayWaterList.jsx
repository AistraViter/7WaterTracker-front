import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditWaterAmountModal from "../Modal/EditWaterAmountModal/EditWaterAmountModal.jsx";
import AddWaterAmountModal from "../Modal/AddWaterAmountModal/AddWaterAmountModal.jsx";
import DeleteEntryModal from "../Modal/DeleteEntryModal/DeleteEntryModal.jsx";
import WaterEntry from "../WaterEntry/WaterEntry.jsx";
import formatTo12HourTime from "../../utils/formatTo12HourTime.js";
import {
  getWaterNotes,
  deleteWaterNote,
  // postWaterNote,
} from "../../redux/water/operations.js";
import css from "./TodayWaterList.module.css";

const TodayWaterList = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [waterEntries, setWaterEntries] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteEntryModalOpen, setIsDeleteEntryModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedWaterEntry, setSelectedWaterEntry] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const fetchWaterNotes = async () => {
    console.log("fetchWaterNotes invoked")
    try {
      const data = await dispatch(getWaterNotes()).unwrap();
      const todayEntries = data.filter((entry) =>
        new Date(entry.date)
          .toISOString()
          .startsWith(new Date().toISOString().split("T")[0])
      );

      const sortedEntries = todayEntries.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      ).map(entry => ({
        ...entry,
        formattedTime: formatTo12HourTime(entry.date) // add formatted time
      }));
      setWaterEntries(sortedEntries);
    } catch (error) {
      console.error("Error fetching water notes:", error);
    }
  };

  useEffect(() => {
    fetchWaterNotes();
  }, [dispatch, token, refresh]);

  const handleDelete = async (idToDelete) => {
    try {
      await dispatch(deleteWaterNote(idToDelete)).unwrap();
      setWaterEntries((prevEntries) =>
        prevEntries.filter((entry) => entry._id !== idToDelete)
      );
    } catch (error) {
      console.error("Error deleting water note:", error);
    }
  };

const handleAddWaterEntry = (newEntry) => {
    console.log("handleAddWaterEntry called with newEntry:", newEntry);
  setWaterEntries((prevEntries) => [...prevEntries, newEntry]);
};

  const openEditWaterModal = (waterEntry) => {
    setSelectedWaterEntry(waterEntry);
    setIsEditModalOpen(true);
  };

  const openDeleteEntryWaterModal = (waterEntry) => {
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
      
      console.log("Updated entry:", updatedEntry);
    }
    setRefresh((prev) => !prev);
  };

  const closeDeleteEntryWaterModal = () => {
    setIsDeleteEntryModalOpen(false);
    setSelectedWaterEntry(null);
  };

  const openAddWaterModal = () => {
    console.log("Opening Add Water Modal - це працює linkbutton 'Add water' під списком ноутів");
    setIsAddModalOpen(true);
  };

  const closeAddWaterModal = (newEntry) => {
    setIsAddModalOpen(false);
    if (newEntry) {
      setRefresh((prev) => !prev);
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
        <>
          {console.log(" onAddWater prop in TodayWaterList:", handleAddWaterEntry)} 
          <AddWaterAmountModal
            isOpen={isAddModalOpen}
            onClose={closeAddWaterModal}
            onAddWater={handleAddWaterEntry}
          />
        </>
      )}
      {isEditModalOpen && selectedWaterEntry && (
        <EditWaterAmountModal
          isOpen={isEditModalOpen}
          onClose={closeEditWaterModal}
          previousAmount={selectedWaterEntry.waterVolume}
          previousTime={formatTo12HourTime(selectedWaterEntry.date)}
          waterId={selectedWaterEntry._id}
          onUpdate={(updatedEntry) => closeEditWaterModal(updatedEntry)}
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
