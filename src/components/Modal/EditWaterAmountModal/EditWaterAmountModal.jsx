import * as Yup from 'yup';
// eslint-disable-next-line no-unused-vars
import {React, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

import { timeOptions, formatTimeToAMPM, getCurrentTime, fetchWaterData, handleTimeFocus } from './editWaterDataUtils';
import sprite from './img/icons/symbol-defs.svg';
import css from './EditWaterAmountModal.module.css';

const EditWaterAmountModal = ({ isOpen, onClose, previousAmount, previousTime, waterId }) => {

    const validationSchema = Yup.object().shape({
        waterAmount: Yup.number()
            .min(0, 'Amount of water should be positive')
            .max(15000, 'Amount of water should not exceed 15000 ml')
            .required('Amount of water is required'),
        time: Yup.string().required('Time is required')
    });    

    const [waterData, setWaterData] = useState({amount: previousAmount, time: previousTime})
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState('');

    const handleTimeSelect = (time, setFieldValue) => {
      setSelectedTime(formatTimeToAMPM(time));
      setIsDropdownOpen(false); 
      setFieldValue('time', formatTimeToAMPM(time)); 
    };

    const handleSave = async (amount, time) => { 
      try {
        const response = await axios.patch(`/api/water/note/${waterId}`, {
          amount: amount,
          time: time,
        })
        console.log('WaterNote successfully saved:', response.data);
        onClose();
      } catch (error) {
        console.error('Error on saving data:', error)
      }
    };
  
    useEffect (() => {
      console.log('Water ID:', waterId);
      const getWaterData = async () => {
        if (waterId) {
          try {
            const data = await fetchWaterData(waterId);
            setWaterData({ amount: data.amount, time: data.time });
          } catch (error) {
             console.error('Error fetching water data on mount:', error);
          }
        }
      }
      getWaterData();
    }, [waterId])

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
        <Formik
          initialValues = {{
            waterAmount: waterData.amount || 0,
            time: waterData.time ||  getCurrentTime(),
          }}
          validationSchema={validationSchema}
          validateOnBlur={true} 
          validateOnChange={true}
          onSubmit = { async(values) => {
            await handleSave(values.waterAmount, values.time)
          }}
            >
          {({values, setFieldValue, setFieldTouched }) => (
            <Form className={css.customForm}>
              <div className={css.statusLine}>
                <svg className={css.statusLineIcon} >
                  <use href={`${sprite}#icon-group-glass`}></use>
                </svg>
                <p className={css.statusLineP}>
                    <span className={css.statusLineWaterAmount}>{values.waterAmount}ml</span>
                    {formatTimeToAMPM(values.time)}
                </p>
              </div>
              <div className={css.amountControls}>
                <p className={css.sectionTitle}>Correct entered data: </p>
                <div>
                  <p className={css.fieldTitle}>Amount of water:</p>
                  <div className={css.amountControlsRow}>
                    <button 
                      type='button'
                      onClick={() => setFieldValue('waterAmount', Math.max(0, values.waterAmount - 50))}
                      className={css.amountControlsButton}
                    >
                      <svg className={css.amountControlsIcon}>
                        <use href = {`${sprite}#icon-minus-small`}></use>
                      </svg>
                    </button>
                    <span className={css.amountControlsValue}>{values.waterAmount} ml</span>
                    <button
                      type='button'
                      onClick={() => setFieldValue('waterAmount', Math.max(0, values.waterAmount + 50))}
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
                      as = 'input'
                      type = 'text'
                      name = 'time'
                      id = 'time'
                      className = {css.inputField}
                      readOnly
                      autoComplete="off" // для поля, яке не має бути автозаповненим 
                      onFocus={() => handleTimeFocus(setIsDropdownOpen, values)} // Open dropdown on focus
                      onBlur={() => {
                          // timeout before closing to allow time for value selection
                          setTimeout(() => {
                            setIsDropdownOpen(false);
                          }, 100); 
                          setFieldTouched('time', true);
                          
                      }}
                        value={selectedTime || formatTimeToAMPM(values.time)}
                      // commented because of the changing to readOnly 
                      /* onChange={(e) => {   
                           setSelectedTime(e.target.value);
                           setFieldValue('time', e.target.value);
                         }} 
                      */
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
                    className = {css.inputField}
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
              </div>
              <div className={css.submitButtonSection}>
                <p className={css.submitButtonAmount}>{values.waterAmount}ml</p>
                <button type='submit' className={css.saveButton}>Save</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
  )
} 

EditWaterAmountModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  previousAmount: PropTypes.number,
  previousTime: PropTypes.string,
  waterId: PropTypes.string // .isRequired // add after debugging
}

export default EditWaterAmountModal