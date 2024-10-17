import { useId } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";

const registerFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .required("Required"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
};
function RegistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };
  const id = useId();

  return (
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={registerFormSchema}
      >
        <Form className={css.registerForm}>
          <div>
            <label htmlFor={`registerFormName${id}`}>Name</label>
            <Field id={`registerFormName${id}`} type="text" name="name" />
            <ErrorMessage name="name" component="span" />
          </div>

          <div>
            <label htmlFor={`registerFormEmail${id}`}>Email</label>
            <Field
              id={`registerFormEmail${id}`}
              type="email"
              name="email"
            ></Field>
            <ErrorMessage name="email" component="span" />
          </div>

          <div>
            <label htmlFor={`registerFormPassword${id}`}>Password</label>
            <Field
              id={`registerFormPassword${id}`}
              type="password"
              name="password"
            ></Field>
            <ErrorMessage name="password" component="span" />
          </div>

          <button type="submit">Register</button>
        </Form>
      </Formik>
  );
}
export default RegistrationForm;
