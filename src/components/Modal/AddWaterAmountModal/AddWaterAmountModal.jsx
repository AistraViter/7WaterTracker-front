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

const AddWaterAmountModal = ({ isOpen, onClose, onAddWater }) => {
  console.log("onAddWater in modal:", onAddWater);
  
  const validationSchema = Yup.object().shape({
    waterAmount: Yup.number()
      .min(1, 'The amount of water must exceed 0')
      .max(15000, 'Amount of water should not exceed 15000 ml')
      .required('Amount of water is required'),
    time: Yup.string().required('Time is required')
  });

  const dispatch = useDispatch();
  // const [waterData, setWaterData] = useState({amount: previousAmount, time: previousTime})
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  const handleTimeSelect = (time, setFieldValue) => {
    setSelectedTime(formatTimeToAMPM(time));
    setIsDropdownOpen(false);
    setFieldValue('time', formatTimeToAMPM(time));
  };

  const handleSave = async (waterVolume, time) => {
    if (typeof onAddWater === 'function') {
      onAddWater(waterVolume, formattedDate);
    } else {
      console.error("onAddWater is not a function");
    }
    const formattedTime = convertTo24HourFormat(time);
    const formattedDate = formatDate(new Date());
    const payload = { date: formattedDate, waterVolume, time: formattedTime };
    console.log("Payload being sent to Redux action:", payload);
    

    try {
      console.log("Calling onAddWater with:", waterVolume, formattedDate);
      await dispatch(postWaterNote(payload)); // Виклик Redux-екшена для додавання нотатки
      console.log("Note successfully added:", payload);
      console.log("Calling onAddWater 2nd time with:", waterVolume, formattedDate);
      onAddWater(waterVolume, formattedDate); 
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
              waterAmount: 0,
              time: selectedTime || getCurrentTime(),
            }}
            validationSchema={validationSchema}
            validateOnBlur={true} 
            validateOnChange={true}
            onSubmit={async (values) => {
              await handleSave(values.waterAmount, values.time);
              onClose();
            }}
          >
            {({ values, setFieldValue, setFieldTouched, errors, touched }) => (
              <Form className={css.customForm}>
                <div className={css.amountControls}>
                  <p className={css.sectionTitle}>Choose a value: </p>
                  <div>
                    <p className={css.fieldTitle}>Amount of water:</p>
                    <div className={css.amountControlsRow}>
                      <button
                        type='button'
                        onClick={() => setFieldValue('waterAmount', Math.max(0, values.waterAmount - 50))}
                        className={css.amountControlsButton}
                      >
                        <svg className={css.amountControlsIcon}>
                          <use href={`${sprite}#icon-minus-small`}></use>
                        </svg>
                      </button>
                      <span className={css.amountControlsValue}>{values.waterAmount} ml</span>
                      <button
                        type='button'
                        onClick={() => setFieldValue('waterAmount', Math.min(15000, values.waterAmount + 50))}
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
                      onBlur={() => {
                          // timeout before closing to allow time for value selection
                          setTimeout(() => {
                            setIsDropdownOpen(false);
                          }, 100); 
                          setFieldTouched('time', true);
                          
                      }}
                      value={selectedTime || formatTimeToAMPM(values.time)}
                    />
                    {isDropdownOpen && (
                      <div className={css.dropdown}>
                        {timeOptions.map((option) => (
                          <div
                            key={option}
                            className={css.dropdownItem}
                            data-time={option}
                            onClick={() => handleTimeSelect(option, setFieldValue)}
                          >
                            {formatTimeToAMPM(option)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className={css.adjustWaterAmount}>
                <label htmlFor='amount' className={css.sectionTitle}>Enter the value of the water used: </label>
                <input
                    type='number'
                    name='waterAmount'
                    id='amount'
                    value={values.waterAmount}
                    className = {`${css.inputField} ${touched.waterAmount && errors.waterAmount ? css.inputError : ''}`}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (!isNaN(value)) {
                        setFieldValue('waterAmount', value);
                      } else {
                        setFieldValue('waterAmount', 0); 
                      }
                    }}
                    onBlur={() => setFieldTouched('waterAmount', true)}
                    />
                    {touched.waterAmount && errors.waterAmount && (
                      <div className={css.errorText}>{errors.waterAmount}</div>
                    )}
              </div>
                <div className={css.submitButtonSection}>
                  <p className={css.submitButtonAmount}>{values.waterAmount} ml</p>
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
  onClose: PropTypes.func.isRequired,
};

export default AddWaterAmountModal;
