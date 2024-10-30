import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../../redux/modal/slice";
import { selectIsSettingModalOpen } from "../../../redux/modal/selectors";
import { selectUser } from "../../../redux/auth/selectors";
import { updateUserAvatar, updateUserInfo } from "../../../redux/user/operations";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ModalContainer from "../ModalContainer/ModalContainer";
import NameHeader from "../SettingModal/NameHeader/NameHeader";
import GenderIdentity from "./GenderIdentity/GenderIdentity";
import YourPhoto from "./YourPhoto/YourPhoto";
import YourName from "./YourName/YourName";
import EmailError from "./EmailError";
import OldPassword from "./OldPassword";
import NewPassword from "./NewPassword";
import RepeatPassword from "./RepeatPassword";
import css from "./SettingModal.module.css";
import useToggle from "./useToggle";

const SettingModal = () => {
  const isModalOpen = useSelector(selectIsSettingModalOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);
  const [state, toggle] = useToggle();
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(false);

  const initialValues = {
    email: user ? user.email : "",
    name: user ? user.name : "",
    gender: user ? user.gender : "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  const userInfoValidationSchema = Yup.object({
    name: Yup.string().min(2, "Too short").max(16, "Too long").required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    gender: Yup.string().oneOf(["woman", "man"], "Invalid gender").required("Required"),
    oldPassword: Yup.string().when("password", {
      is: (password) => password && password.length > 0,
      then: Yup.string().required("Old password is required when setting a new password."),
    }),
    password: Yup.string().min(8, "Too short").max(64, "Too long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .when("password", {
        is: (password) => password && password.length > 0,
        then: Yup.string().required("Confirm password is required when setting a new password."),
      }),
  });

  const onSubmit = (values) => {
    setIsSubmitBlocked(true);
    const { name, email, gender, oldPassword, password } = values;

    const hasChanges =
      name !== user.name || email !== user.email || gender !== user.gender || password;

    if (hasChanges) {
      console.log("Values to update:", { name, email, gender, oldPassword, password });

      dispatch(
        updateUserInfo({
          name,
          email,
          gender,
          oldPassword: oldPassword || null,
          newPassword: password || null,
        })
      )
        .unwrap()
        .then(() => {
          setMessage({ text: "Successfully changed information.", type: "success" });
          dispatch(closeModal());
        })
        .catch(() => setMessage({ text: "Error, try later!", type: "error" }))
        .finally(() => setIsSubmitBlocked(false));
    } else {
      setMessage({ text: "You have not made any changes.", type: "error" });
      setIsSubmitBlocked(false);
    }
  };

  const handleAvatarChange = (e) => {
    setIsSubmitBlocked(true);
    const file = e.target.files[0];
    if (file) {
      dispatch(updateUserAvatar({ avatar: file }))
        .unwrap()
        .then(() => setMessage({ text: "Avatar changed!", type: "success" }))
        .catch(() => setMessage({ text: "Error, try later!", type: "error" }))
        .finally(() => setIsSubmitBlocked(false));
    }
  };

  return (
    <ModalContainer
      modalIsOpen={isModalOpen}
      closeModal={() => dispatch(closeModal())}
      buttonClassSettings
    >
      <NameHeader />
      {message && (
        <div className={`${css.message} ${css[message.type]}`}>
          {message.text}
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={userInfoValidationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, handleSubmit }) => (
          <Form
            className={css["form-container"]}
            autoComplete="off"
            noValidate
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          >
            <YourPhoto
              avatar={user?.avatar || ""}
              isSubmitBlocked={isSubmitBlocked}
              handleAvatarChange={handleAvatarChange}
            />
            <div className={css["desktop-flex"]}>
              <div className={css["desktop-left"]}>
                <GenderIdentity />
                <YourName isError={errors.name && touched.name} />
                <EmailError isError={errors.email && touched.email} />
              </div>
              <div className={css["desktop-right"]}>
                <h3 className={css.subtitle}>Password</h3>
                <div className={css["password-group"]}>
                  <OldPassword
                    isHiddenPassword={state.oldPassword}
                    toggle={toggle}
                    isError={touched.oldPassword && errors.oldPassword}
                  />
                  <NewPassword
                    isHiddenPassword={state.password}
                    toggle={toggle}
                    isError={touched.password && errors.password}
                  />
                  <RepeatPassword
                    isHiddenPassword={state.repeatPassword}
                    toggle={toggle}
                    isError={touched.confirmPassword && errors.confirmPassword}
                  />
                </div>
              </div>
            </div>
            <div className={css["button-container"]}>
              <button
                className={css["submit-button"]}
                type="submit"
                disabled={isSubmitBlocked}
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </ModalContainer>
  );
};

export default SettingModal;
