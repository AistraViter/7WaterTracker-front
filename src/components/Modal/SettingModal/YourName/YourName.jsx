import { useId } from "react";
import clsx from "clsx";
import { Field, ErrorMessage } from "formik";
import Label from "../Label/Label";
import css from "../SettingModal.module.css";

const YourName = ({ isError }) => {
  const nameInputId = useId();

  return (
    <div className={css["name-group"]}>
      <Label htmlFor={nameInputId} type="thick">
        Your name
      </Label>
      <div className={css["input-wrapper"]}>
        <Field
          className={clsx(css.input, {
            [css["error-input"]]: isError,
          })}
          id={nameInputId}
          type="text"
          name="name"
          placeholder="Enter your name"
        />
        <ErrorMessage
          name="name"
          component="div"
          className={css["error-message"]}
        />
      </div>
    </div>
  );
};

export default YourName;
