// цей компонент бути як і на сторінці реєстрації та і на сторінці логіну (немає відокремлення)

import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup, signin } from "../../redux/auth/operations.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./AuthForm.module.css";
import * as Yup from "yup";

export default function AuthForm({ isSignUp, onSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleRepeatPasswordVisibility = () =>
    setShowRepeatPassword(!showRepeatPassword);

  const initialValues = {
    email: "",
    password: "",
    repeatPassword: isSignUp ? "" : "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    repeatPassword: isSignUp
      ? Yup.string()
          .required("Repeat password is required")
          .oneOf([Yup.ref("password")], "Passwords must match")
      : Yup.string().nullable(),
  });

  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    if (isSignUp) {
      if (values.password !== values.repeatPassword) {
        console.error("Passwords do not match");
        return;
      }
      dispatch(signup(values))
        .then((response) => {
          console.log("Registration successful:", response);
          if (onSuccess) onSuccess();
        })
        .catch((error) => {
          console.error("Registration failed:", error);
        });
    } else {
      dispatch(signin(values))
        .then((response) => {
          console.log("Login successful:", response);
          if (onSuccess) onSuccess();
        })
        .catch((error) => {
          console.error("Login failed:", error);
        });
    }
  };

  return (
    <div className={css.AuthContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form className={css.form} noValidate>
            <label htmlFor="email" className={css.labelfirst}>
              Enter your email
            </label>
            <Field
              type="email"
              name="email"
              autoComplete="off"
              className={`${css.input} ${
                touched.email && errors.email ? css.inputError : ""
              }`}
              placeholder="E-mail"
              required
            />
            <ErrorMessage name="email" component="span" className={css.error} />

            <label htmlFor="password" className={css.labelfirst}>
              Enter your password
            </label>
            <div className={css.passwordWrapper}>
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="off"
                className={`${css.input} ${
                  touched.password && errors.password ? css.inputError : ""
                }`}
                placeholder="Password"
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className={css.passwordToggleIcon}
              >
                {/* Icon code */}
              </span>
            </div>
            <ErrorMessage
              name="password"
              component="span"
              className={css.error}
            />

            {isSignUp && (
              <>
                <label htmlFor="repeatPassword" className={css.labelfirst}>
                  Repeat Password
                </label>
                <div className={css.passwordWrapper}>
                  <Field
                    type={showRepeatPassword ? "text" : "password"}
                    name="repeatPassword"
                    autoComplete="off"
                    className={`${css.input} ${
                      touched.repeatPassword && errors.repeatPassword
                        ? css.inputError
                        : ""
                    }`}
                    placeholder="Repeat password"
                    required
                  />
                  <span
                    onClick={toggleRepeatPasswordVisibility}
                    className={css.passwordToggleIcon}
                  >
                    {/* Icon code */}
                  </span>
                </div>
                <ErrorMessage
                  name="repeatPassword"
                  component="span"
                  className={css.error}
                />
              </>
            )}

            <button type="submit" className={css.addBtn}>
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}