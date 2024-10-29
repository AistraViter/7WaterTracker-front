import { useState } from "react";
import ReactModal from "react-modal";
import { ErrorMessage, Field, Form, Formik } from "formik";

ReactModal.setAppElement("#root");

import css from "./DailyNormaModal.module.css";

import { updateDailyNorma } from "../../../utils/validations/dailyNormSchema";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDailyNorm } from "../../../redux/user/selectors";
import { updateUserDailyNorm } from "../../../redux/user/operations";

export default function DailyNormaModal({ isOpen, onRequestClose }) {
  const userDailyNorma = useSelector(selectUserDailyNorm);

  const [dailyNorma, setDailyNorma] = useState(Number(0).toFixed(1));
  const dispatch = useDispatch();

  const initialValues = {
    gender: "woman",
    weight: 0,
    activeTime: 0,
    drink: 0,
  };

  const calculateDailyNorma = (weight, activeTime, gender) => {
    const parsedWeight = isNaN(Number(weight)) ? 0 : Number(weight);
    const parsedActiveTime = isNaN(Number(activeTime)) ? 0 : Number(activeTime);

    if (gender === "woman") {
      return (parsedWeight * 0.03 + parsedActiveTime * 0.4).toFixed(1);
    }
    if (gender === "man") {
      return (parsedWeight * 0.04 + parsedActiveTime * 0.6).toFixed(1);
    }
    return 0;
  };

  const handleSubmit = async (_, actions) => {
    const convertedDailyNorma = (Number(dailyNorma) * 1000).toFixed(0);
    const payload = { dailyNorm: convertedDailyNorma }; // новий формат для відправки на бекенд
      console.log("dailyNorma being sent in milliliters:", payload);
  
    const response = await dispatch(updateUserDailyNorm(payload));
    console.log("dailyNorma successfully saved:", response);

    actions.resetForm();
    onRequestClose();
  };

  const handleCloseModal = () => {
    setDailyNorma(Number(0).toFixed(1));
    onRequestClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      overlayClassName={{
        base: css.overlay,
        afterOpen: css.overlayAfterOpen,
        beforeClose: css.overlayBeforeClose,
      }}
      className={css.modal}
      closeTimeoutMS={150}
    >
      <h3 className={css.modalTitle}>My daily norma</h3>

      <div className={css.calculates}>
        <p className={css.formula}>
          For girl: <span>V=(M*0,03) + (T*0,4)</span>
        </p>
        <p className={css.formula}>
          For man: <span>V=(M*0,04) + (T*0,6)</span>
        </p>
      </div>

      <p className={css.explanation}>
        <span>*</span> V is the volume of the water norm in liters per day, M is
        your body weight, T is the time of active sports, or another type of
        activity commensurate in terms of loads (in the absence of these, you
        must set 0)
      </p>

      <h4 className={css.formTitle}>Calculate your rate:</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={updateDailyNorma}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <div
              className={css.radioGroup}
              role="group"
              aria-labelledby="my-radio-group"
            >
              <label className={css.label}>
                <Field
                  type="radio"
                  name="gender"
                  value="woman"
                  onChange={(e) => {
                    handleChange(e);
                    const newNorma = calculateDailyNorma(
                      values.weight,
                      values.activeTime,
                      e.target.value
                    );
                    setDailyNorma(newNorma);
                  }}
                />
                For Woman
              </label>
              <label className={css.label}>
                <Field
                  type="radio"
                  name="gender"
                  value="man"
                  onChange={(e) => {
                    handleChange(e);
                    const newNorma = calculateDailyNorma(
                      values.weight,
                      values.activeTime,
                      e.target.value
                    );
                    setDailyNorma(newNorma);
                  }}
                />
                For Man
              </label>
            </div>
            <ErrorMessage component="div" className={css.error} name="gender" />

            <label className={css.label} htmlFor="weight">
              Your weight in kilograms:
            </label>
            <Field
              id="weight"
              name="weight"
              type="text"
              maxLength="4"
              className={css.input}
              onChange={(e) => {
                handleChange(e);
                const newNorma = calculateDailyNorma(
                  e.target.value,
                  values.activeTime,
                  values.gender
                );
                setDailyNorma(newNorma);
              }}
            />
            <ErrorMessage name="weight" className={css.error} component="div" />

            <label className={css.label} htmlFor="activeTime">
              The time of active participation in sports or other activities
              with a high physical. load in hours:
            </label>
            <Field
              id="activeTime"
              name="activeTime"
              type="text"
              maxLength="4"
              className={css.input}
              onChange={(e) => {
                handleChange(e);
                const newNorma = calculateDailyNorma(
                  values.weight,
                  e.target.value,
                  values.gender
                );
                setDailyNorma(newNorma);
              }}
            />
            <ErrorMessage
              name="activeTime"
              className={css.error}
              component="div"
            />

            <div className={css.requiredAmount}>
              <span>The required amount of water in liters per day:</span>
              <span>{dailyNorma !== 0.0 ? dailyNorma : userDailyNorma} L</span>
            </div>

            <label className={css.additional} htmlFor="drink">
              Write down how much water you will drink (in ml):
            </label>
            <Field
              id="drink"
              name="drink"
              type="text"
              maxLength="4"
              className={css.input}
            />

            <button disabled={isSubmitting} type="submit" className={css.btn}>
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </ReactModal>
  );
}
