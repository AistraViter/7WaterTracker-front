import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import EditWaterAmountForm from "../../EditWaterAmountForm/EditWaterAmountForm.jsx";
import convertTo24HourFormat from "../../../utils/convertTo24HourFormat.js";
import formatDate  from "../../../utils/formatDate.js";
import {
  fetchWaterData,
  getCurrentTime,
} from "../../../utils/editWaterDataUtils.js";
import css from "./EditWaterAmountModal.module.css";
import sprite from "./img/icons/symbol-defs.svg";
import { updateWaterNote } from "../../../redux/water/operations.js";

const EditWaterAmountModal = ({
  isOpen,
  onClose,
  previousAmount,
  previousTime,
  waterId,
}) => {
  const dispatch = useDispatch();
  const [waterData, setWaterData] = useState({
    waterVolume: previousAmount,
    time: previousTime,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  const handleSave = async (waterVolume, time) => {
    const formattedTime = convertTo24HourFormat(time);
    const formattedDate = formatDate(new Date());


    const payload = { _id: waterId, waterVolume, time: formattedTime, date: formattedDate };
    console.log("Payload being sent:", payload);

    try {
      const response = await dispatch(updateWaterNote(payload)).unwrap();
      console.log("WaterNote successfully saved:", response);
      // Інші дії після збереження...
    } catch (error) {
      console.error("Error on saving data:", error);
    }
  };

  // useEffect для отримання даних
  useEffect(() => {
    const getWaterData = async () => {
      if (waterId) {
        try {
          const data = await fetchWaterData(waterId);
          setWaterData({ waterVolume: data.waterVolume, time: data.time });
        } catch (error) {
          console.error("Error fetching water data on mount:", error);
        }
      }
    };
    getWaterData();
  }, [waterId]);

  return (
    isOpen && (
      <div className={css.modalOverlay}>
        <div className={css.modalWindow}>
          <div className={css.headerDiv}>
            <p className={css.headerTitle}>Edit the entered amount of water</p>
            <button className={css.closeButton} onClick={onClose}>
              <svg className={css.closeIcon} aria-label="menu close icon">
                <use href={`${sprite}#icon-x-mark`}></use>
              </svg>
            </button>
          </div>

          <EditWaterAmountForm
            initialValues={{
              waterVolume: waterData.waterVolume || 0,
              time: waterData.time || getCurrentTime(),
            }}
            onSubmit={async (values) => {
              console.log("Submitted values:", values); // Додайте цей лог

              // Передайте значення часу в handleSave
              await handleSave(values.waterVolume, values.time);
              onClose();
            }}
            onClose={onClose}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        </div>
      </div>
    )
  );
};

EditWaterAmountModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  previousAmount: PropTypes.number,
  previousTime: PropTypes.string,
  waterId: PropTypes.string,
};

export default EditWaterAmountModal;
