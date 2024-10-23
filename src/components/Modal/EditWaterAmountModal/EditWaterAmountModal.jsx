import * as Yup from 'yup';
import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

import css from './EditWaterAmountModal.module.css';

const EditWaterAmountModal = ({ isOpen, onClose, previousAmount, previousTime, waterId }) => {
    
    const validationSchema = Yup.object().shape({
        waterAmount: Yup.number()
            .min(0, 'Amount of water should be positive')
            .max(15000, 'Amount of water should not exceed 15000 ml')
            .required('Amount of water is required'),
        time: Yup.string().required('Time is required')
    });

  const timeOptions = Array.from({ length: 288 }, (_, i) => {
    const totalMinutes = i * 5;
        const hour = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
        const minute = String(totalMinutes % 60).padStart(2, '0');
        return `${hour}:${minute}`;
    })

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

    return (
      isOpen && (
    <div className={css.modalOverlay}>
      <div className={css.modalContent}>
        <button className={css.closeButton} onClick={onClose}>
            &times; {/* icon "Х" */}
        </button>
        <h2>Edit the entered amount of water</h2>
        <Formik
          initialValues = {{
            waterAmount: previousAmount || 0,
            time: previousTime ||  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }}
          validationSchema={validationSchema}
          validateOnBlur={true} 
          onSubmit = { async(values) => {
            await handleSave(values.waterAmount, values.time)
          }}
            >
          {({values, setFieldValue, setFieldTouched }) => (
            <Form>
              <div>
                <p>{values.waterAmount}ml {values.time}</p>
              </div>
              <div>
                <p>Correct entered data</p>
              </div>
              <div>
                  <p>Amount of water:</p>
                  <div>
                    <button 
                      type='button'
                      onClick={() => setFieldValue('waterAmount', Math.max(0, values.waterAmount + 50))}
                    >
                      -
                    </button>
                    <span>{values.waterAmount} ml</span>
                    <button
                      type='button'
                      onClick={() => setFieldValue('waterAmount', Math.max(0, values.waterAmount - 50))}
                      >
                        +
                      </button>
                  </div>
              </div>
              <label htmlFor='time'>Recording time: </label> 
              <Field
                as = 'input'
                type = 'time'
                name = 'time'
                id = 'time'
                list = 'time-options'
              />
              <datalist id='time-options'>
                {timeOptions.map((option) => {
                  return <option key={option} value={option}/>
                })}
              </datalist>
              <label htmlFor='amount'>Enter the value of the water used: </label>
              <input
                  type='number'
                  name='waterAmount'
                  id='amount'
                  value={values.waterAmount}
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
              <div>
                <p>{values.waterAmount}ml</p>
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
  // waterId: PropTypes.string.isRequired
}

export default EditWaterAmountModal