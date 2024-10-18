// цей компонент бути як і на сторінці реєстрації та і на сторінці логіну (немає відокремлення)

import { useDispatch } from "react-redux"
import { signup } from "../../redux/auth/operations.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from './AuthForm.module.css'

export default function RegistrationForm() {

    const initialValues = {
        name: '',
        email: '',
        password: '',
      };

      const dispatch = useDispatch()

    const handleSubmit = (values) => {
        console.log("Submitting values:", values);
        dispatch(signup(values))
        .then(response => {
            console.log("Registration successful:", response);
        })
        .catch(error => {
            console.error("Registration failed:", error);
        })
    }

return (
    <div className={css.registrationContainer}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className={css.form}>
                <label htmlFor="name" className={css.labelfirst}>Name</label>
                <Field type="text" name="name" autoComplete="off" className={css.input} required></Field>
                <ErrorMessage name='name' component='span' className={css.error} />
                <label htmlFor="email" className={css.labelfirst}>Email</label>
                <Field type="email" name="email" autoComplete="off" className={css.input} required></Field>
                <ErrorMessage name='email' component='span' className={css.error} />
                <label htmlFor="password" className={css.labelfirst}>Password</label>
                <Field type="password" name="password" autoComplete="off" className={css.input} required></Field>
                <ErrorMessage name='password' component='span' className={css.error} />
                <button type="submit" className={css.addBtn}>Register</button>
            </Form>
        </Formik>
    </div>
)
}