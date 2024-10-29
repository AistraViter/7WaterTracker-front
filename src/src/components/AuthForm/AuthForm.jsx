// цей компонент бути як і на сторінці реєстрації та і на сторінці логіну (немає відокремлення)

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, signin } from "../../redux/auth/operations.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./AuthForm.module.css";
import * as Yup from "yup";
import { notification } from "antd";
import { selectLoading } from "../../redux/auth/selectors";

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
const loading = useSelector(selectLoading);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    repeatPassword: isSignUp
      ? Yup.string()
          .required("Repeat password is required")
          .oneOf([Yup.ref("password")], "Passwords must match")
      : Yup.string().nullable(),
  });

  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const { email, password, repeatPassword } = values;

    if (isSignUp) {
      if (password !== repeatPassword) {
        notification.error({
          message: "Error",
          description: "Passwords do not match",
        });
        return;
      }
      const requestBody = { email, password };
      dispatch(signup(requestBody)).then((response) => {
        if (response.error) {
          if (response.payload?.ignoreError) {
            notification.error({
              message: "Error",
              description: response.payload.message,
            });
          } else {
            console.error(response.error);
            notification.error({
              message: "Error",
              description: response.payload || "Registration failed",
            });
          }
        } else {
          notification.success({
            message: "Success",
            description: "Registration successful",
          });
          if (onSuccess) onSuccess();
        }
      });

    } else {
      const requestBody = { email, password };
      dispatch(signin(requestBody))
        .then((response) => {
          console.log(response);
          notification.success({
            message: "Success",
            description: "Login successful",
          });
          if (onSuccess) onSuccess();
        })
        .catch((error) => {
          console.log(error);
          notification.error({
            message: "Error",
            description: "Login failed",
          });
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
              autoComplete={isSignUp ? "off" : "on"}
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
                {showPassword ? (
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      stroke="#407BFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.574-3.007-9.964-7.178Z"
                    />
                    <path
                      stroke="#407BFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      stroke="#407BFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65A3 3 0 1 0 9.88 9.879m4.242 4.242L9.881 9.88"
                    />
                  </svg>
                )}
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
                    {showRepeatPassword ? (
                      <svg
                        xmlns="https://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          stroke="#407BFF"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.574-3.007-9.964-7.178Z"
                        />
                        <path
                          stroke="#407BFF"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="https://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          stroke="#407BFF"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65A3 3 0 1 0 9.88 9.879m4.242 4.242L9.881 9.88"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                <ErrorMessage
                  name="repeatPassword"
                  component="span"
                  className={css.error}
                />
              </>
            )}

            <button type="submit" className={css.addBtn} disabled={loading}>
              {loading
                ? isSignUp
                  ? "Signing up..."
                  : "Signing in..."
                : isSignUp
                ? "Sign Up"
                : "Sign In"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}