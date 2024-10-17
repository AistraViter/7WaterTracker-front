import { useId } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import MaskedInput from "react-text-mask";
import * as Yup from "yup";
import { addContact } from "../../redux/contacts/operations";
import styles from "./ContactForm.module.css";

const contactFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(
      /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
      "Invalid phone number format! Should be like: XXX-XXX-XXXX"
    )
    .required("Required"),
});

const initialValues = {
  name: "",
  number: "",
};

const ContactForm = () => {
  const dispatch = useDispatch();
  const { contactForm } = styles;
  const id = useId();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact({ name: values.name, number: values.number }));
    resetForm();
  };
    return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={contactFormSchema}
    >
      <Form className={contactForm}>
        <div>
          <label htmlFor={`contactFormName${id}`}>Name</label>
          <Field id={`contactFormName${id}`} type="text" name="name" />
          <ErrorMessage name="name" component="span" />
        </div>
        <div>
          <label htmlFor={`contactFormNumber${id}`}>Number</label>
          <Field name="number">
            {({ field }) => (
              <MaskedInput
                {...field}
                mask={[/\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
                placeholder="XXX-XXX-XXXX"
                id={`contactFormNumber${id}`}
                type="tel"
              />
            )}
          </Field>{" "}
          <ErrorMessage name="number" component="span" />
        </div>

        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};
export default ContactForm;




