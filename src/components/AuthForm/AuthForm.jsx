// цей компонент бути як і на сторінці реєстрації та і на сторінці логіну (немає відокремлення)

import { useDispatch } from "react-redux"
import { signup, signin } from "../../redux/auth/operations.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from './AuthForm.module.css'

export default function AuthForm({ isSignUp, onSuccess }) {
  const initialValues = {
    email: "",
    password: "",
    repeatPassword: isSignUp ? "" : "",
  };

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
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <label htmlFor="email" className={css.labelfirst}>
            Enter your email
          </label>
          <Field
            type="email"
            name="email"
            autoComplete="off"
            className={css.input}
            placeholder="E-mail"
            required
          ></Field>
          <ErrorMessage name="email" component="span" className={css.error} />
          <label htmlFor="password" className={css.labelfirst}>
            Enter your password
          </label>
          <Field
            type="password"
            name="password"
            autoComplete="off"
            className={css.input}
            placeholder="Password"
            required
          ></Field>
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
              <Field
                type="password"
                name="repeatPassword"
                autoComplete="off"
                className={css.input}
                placeholder="Repeat password"
                required
              />
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
      </Formik>
    </div>
  );
}