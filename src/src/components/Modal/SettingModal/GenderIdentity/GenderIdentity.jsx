import { useId } from "react";
import { Field } from "formik";
import { useSelector } from "react-redux";
import { selectCurrentUserInfo } from "../../../../redux/user/selectors";

import styles from "../../SettingModal/SettingModal.module.css";
import css from "./GenderIdentity.module.css";

const GenderIdentity = () => {
  const womanRadioId = useId();
  const manRadioId = useId();
  const user = useSelector(selectCurrentUserInfo);

  return (
    <div className={styles["gender-identity-group"]}>
      <h3 className={styles.subtitle}>Your gender identity</h3>
      <div>
        <label className={css.radioLabel}>
          <Field
            id={womanRadioId}
            type="radio"
            name="gender"
            value="woman"
            className={css.radioInput}
            checked={user?.gender === "Woman"} //
          />
          <span className={css.radioMark}></span>
          Woman
        </label>
        <label className={css.radioLabel}>
          <Field
            id={manRadioId}
            type="radio"
            name="gender"
            value="man"
            className={css.radioInput}
            checked={user?.gender === "Man"} //
          />
          <span className={css.radioMark}></span>
          Man
        </label>
      </div>
    </div>
  );
};

export default GenderIdentity;
