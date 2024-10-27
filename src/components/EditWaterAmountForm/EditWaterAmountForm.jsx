import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import {
    timeOptions,
    formatTimeToAMPM,
  } from "../../utils/editWaterDataUtils.js";
import css from "../Modal/EditWaterAmountModal/EditWaterAmountModal.module.css";
import sprite from "../Modal/EditWaterAmountModal/img/icons/symbol-defs.svg";

const EditWaterAmountForm = ({
  initialValues,
  onSubmit,
  isDropdownOpen,
  setIsDropdownOpen,
  selectedTime,
  setSelectedTime,
}) => {
  const validationSchema = Yup.object().shape({
    waterVolume: Yup.number()
      .min(0, "Amount of water should be positive")
      .max(15000, "Amount of water should not exceed 15000 ml")
      .required("Amount of water is required"),
    time: Yup.string().required("Time is required"),
  });

  const handleTimeSelect = (time, setFieldValue) => {
    setSelectedTime(formatTimeToAMPM(time));
    setIsDropdownOpen(false);
    setFieldValue("time", formatTimeToAMPM(time));
  };

  return (
          <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur={true}
          validateOnChange={true}
          onSubmit={onSubmit}
              >
            {({ values, setFieldValue, setFieldTouched, errors, touched }) => (
              <Form className={css.customForm}>
                <div className={css.statusLine}>
                  <svg className={css.statusLineIcon}>
                    <use href={`${sprite}#icon-group-glass`}></use>
                  </svg>
                  <p className={css.statusLineP}>
                    <span className={css.statusLineWaterAmount}>
                      {values.waterVolume}ml
                    </span>
                    {formatTimeToAMPM(values.time)}
                  </p>
                </div>
                <div className={css.amountControls}>
                  <p className={css.sectionTitle}>Correct entered data: </p>
                  <div>
                    <p className={css.fieldTitle}>Amount of water:</p>
                    <div className={css.amountControlsRow}>
                      <button
                        type="button"
                        onClick={() =>
                          setFieldValue(
                            "waterVolume",
                            Math.max(0, values.waterVolume - 50)
                          )
                        }
                        className={css.amountControlsButton}
                      >
                        <svg className={css.amountControlsIcon}>
                          <use href={`${sprite}#icon-minus-small`}></use>
                        </svg>
                      </button>
                      <span className={css.amountControlsValue}>
                        {values.waterVolume} ml
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setFieldValue(
                            "waterVolume",
                            Math.max(0, values.waterVolume + 50)
                          )
                        }
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
                  <label htmlFor="time" className={css.fieldTitle}>
                    Recording time:{" "}
                  </label>
                  <div className={css.dropdownContainer}>
                    <Field
                      as="input"
                      type="text"
                      name="time"
                      id="time"
                      className={css.inputField}
                      readOnly
                      autoComplete="off" // для поля, яке не має бути автозаповненим
                      onFocus={() => setIsDropdownOpen(true)} // Open dropdown on focus
                      onBlur={() => {
                        // timeout before closing to allow time for value selection
                        setTimeout(() => {
                          setIsDropdownOpen(false);
                        }, 100);
                        setFieldTouched("time", true);
                      }}
                      value={selectedTime || formatTimeToAMPM(values.time)}
                     onChange={(e) => {   
                           setSelectedTime(e.target.value);
                           setFieldValue('time', e.target.value);
                         }} 
                    />
                    {isDropdownOpen && (
                      <div className={css.dropdown}>
                        {timeOptions.map((option) => (
                          <div
                            key={option}
                            className={css.dropdownItem}
                            data-time={option}
                            onClick={() =>
                              handleTimeSelect(option, setFieldValue)
                            }
                          >
                            {formatTimeToAMPM(option)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className={css.adjustWaterAmount}>
                  <label htmlFor="amount" className={css.sectionTitle}>
                    Enter the value of the water used:{" "}
                  </label>
                  <input
                    type="number"
                    name="waterVolume"
                    id="amount"
                    value={values.waterVolume}
                    className={`${css.inputField} ${touched.waterAmount && errors.waterAmount ? css.inputError : ''}`}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (!isNaN(value)) {
                        setFieldValue("waterVolume", value);
                      } else {
                        setFieldValue("waterVolume", 0);
                      }
                    }}
                    onBlur={() => setFieldTouched("waterVolumewaterVolume", true)}
                  />
                  {errors.waterVolume && touched.waterVolume && (
                    <div className={css.errorText}>{errors.waterVolume}</div>
                  )}
                </div>
                <div className={css.submitButtonSection}>
                  <p className={css.submitButtonAmount}>
                    {values.waterVolume}ml
                  </p>
                  <button type="submit" className={css.saveButton}>
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
    )
};

EditWaterAmountForm.propTypes = {
    initialValues: PropTypes.shape({
      waterVolume: PropTypes.number.isRequired,
        time: PropTypes.string.isRequired,
      }).isRequired,
      onSubmit: PropTypes.func.isRequired,
      onClose: PropTypes.func.isRequired,
      isDropdownOpen: PropTypes.bool.isRequired,
      setIsDropdownOpen: PropTypes.func.isRequired,
      selectedTime: PropTypes.string.isRequired,
      setSelectedTime: PropTypes.func.isRequired,
    };

export default EditWaterAmountForm;
