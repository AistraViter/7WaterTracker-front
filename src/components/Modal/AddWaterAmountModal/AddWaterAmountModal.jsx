import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import convertTo24HourFormat from "../../../utils/convertTo24HourFormat.js";
import formatDate from "../../../utils/formatDate.js";
import { postWaterNote } from "../../../redux/water/operations.js"; // імпорт екшена
import { timeOptions, formatTimeToAMPM, getCurrentTime, handleTimeFocus } from './addWaterDataUtils';
import sprite from './img/icons/symbol-defs.svg';
import css from './AddWaterAmountModal.module.css';

const AddWaterAmountModal = ({ isOpen, onClose }) => {
  const validationSchema = Yup.object().shape({
    waterVolume: Yup.number()
      .min(0, 'Amount of water should be positive')
      .max(15000, 'Amount of water should not exceed 15000 ml')
      .required('Amount of water is required'),
    time: Yup.string().required('Time is required')
  });

  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  const handleTimeSelect = (time, setFieldValue) => {
    setSelectedTime(formatTimeToAMPM(time));
    setIsDropdownOpen(false);
    setFieldValue('time', formatTimeToAMPM(time));
  };

  const handleSave = async (waterVolume, time) => {
    const formattedTime = convertTo24HourFormat(time);
    const formattedDate = formatDate(new Date());
    const payload = { date: formattedDate, waterVolume, time: formattedTime };
    console.log("Payload being sent to Redux action:", payload);
    

    try {
      await dispatch(postWaterNote(payload)); // Виклик Redux-екшена для додавання нотатки
      console.log("Note successfully added:", payload);
    } catch (error) {
      console.error("Error on saving data:", error);
    }
  };

  return (
    isOpen && (
      <div className={css.modalOverlay}>
        <div className={css.modalWindow}>
          <div className={css.headerDiv}>
            <p className={css.headerTitle}>Add water</p>
            <button className={css.closeButton} onClick={onClose}>
              <svg className={css.closeIcon} aria-label="menu close icon">
                <use href={`${sprite}#icon-x-mark`}></use>
              </svg>
            </button>
          </div>
          <Formik
            initialValues={{
              waterVolume: 0,
              time: selectedTime || getCurrentTime(),
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              await handleSave(values.waterVolume, values.time);
              onClose();
            }}
          >
            {({ values, setFieldValue,}) => (
              <Form className={css.customForm}>
                <div className={css.amountControls}>
                  <p className={css.sectionTitle}>Choose a value: </p>
                  <div>
                    <p className={css.fieldTitle}>Amount of water:</p>
                    <div className={css.amountControlsRow}>
                      <button
                        type='button'
                        onClick={() => setFieldValue('waterVolume', Math.max(0, values.waterVolume - 50))}
                        className={css.amountControlsButton}
                      >
                        <svg className={css.amountControlsIcon}>
                          <use href={`${sprite}#icon-minus-small`}></use>
                        </svg>
                      </button>
                      <span className={css.amountControlsValue}>{values.waterVolume} ml</span>
                      <button
                        type='button'
                        onClick={() => setFieldValue('waterVolume', Math.min(15000, values.waterVolume + 50))}
                        className={css.amountControlsButton}
                      >
                        <svg className={css.amountControlsIcon}>
                          <use href={`${sprite}#icon-plus-small`}></use>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className={css.recordingTime}>
                  <label htmlFor='time' className={css.fieldTitle}>Recording time: </label>
                  <div className={css.dropdownContainer}>
                    <Field
                      as='input'
                      type='text'
                      name='time'
                      id='time'
                      className={css.inputField}
                      readOnly
                      autoComplete="off"
                      onFocus={() => handleTimeFocus(setIsDropdownOpen, values)}
                      onBlur={() => setTimeout(() => setIsDropdownOpen(false), 100)}
                      value={selectedTime || formatTimeToAMPM(values.time)}
                    />
                    {isDropdownOpen && (
                      <div className={css.dropdown}>
                        {timeOptions.map((option) => (
                          <div
                            key={option}
                            className={css.dropdownItem}
                            onClick={() => handleTimeSelect(option, setFieldValue)}
                          >
                            {formatTimeToAMPM(option)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className={css.submitButtonSection}>
                  <p className={css.submitButtonAmount}>{values.waterVolume} ml</p>
                  <button type='submit' className={css.saveButton}>
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
  );
};

AddWaterAmountModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddWaterAmountModal;
