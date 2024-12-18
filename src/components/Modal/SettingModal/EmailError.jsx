import { useId } from "react";
import { Field, ErrorMessage } from "formik";
import clsx from "clsx";
import Label from "./Label/Label";
import css from "./SettingModal.module.css";

const EmailError = ({ isError }) => {
  const emailInputId = useId();
  return (
    <div className={css["email-group"]}>
      <Label htmlFor={emailInputId} type="thick">
        E-mail
      </Label>
      <div className={css["input-wrapper"]}>
        <Field
          autoComplete="off"
          className={clsx(css.input, {
            [css["error-input"]]: isError,
          })}
          id={emailInputId}
          type="email"
          name="email"
          placeholder="email"
        />
        <ErrorMessage
          name="email"
          component="div"
          className={css["error-message"]}
        />
      </div>
    </div>
  );
};

export default EmailError;
