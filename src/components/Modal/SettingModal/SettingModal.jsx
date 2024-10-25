import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../../redux/modal/slice";
import { selectIsSettingModalOpen } from "../../../redux/modal/selectors";
import { selectUser } from "../../../redux/auth/selectors";
import {
  updateUserAvatar,
  updateUserInfo,
} from "../../../redux/user/operations";
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
    email: user.email || "",
    name: user.name || "",
    gender: user.gender,
    avatar: user.avatar || "",
    outdatedPassword: "",
    password: "",
    repeatPassword: "",
  };

  let patchedData = {};

  const userInfoValidationSchema = Yup.object({
    name: Yup.string().max(32, "Too long"),
    email: Yup.string().email("Invalid email address"),
    outdatedPassword: Yup.string()
      .min(8, "Too short")
      .max(64, "Too long")
      .test("outdated-password-filled", "Required", function (value) {
        const { password, repeatPassword } = this.parent;
        if ((password || repeatPassword) && !value) {
          return false;
        }
        return true;
      }),
    password: Yup.string()
      .min(8, "Too short")
      .max(64, "Too long")
      .test("password-filled", "Required", function (value) {
        const { outdatedPassword, repeatPassword } = this.parent;
        if ((outdatedPassword || repeatPassword) && !value) {
          return false;
        }
        return true;
      }),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .test("repeat-password-filled", "Required", function (value) {
        const { outdatedPassword, password } = this.parent;
        if ((outdatedPassword || password) && !value) {
          return false;
        }
        return true;
      }),
  });

  function areEqualWithNull(values, user) {
    for (let key in values) {
      const formValue = values[key];
      const userValue = user[key];
      if (formValue !== (userValue ?? "")) {
        patchedData[key] = formValue;
      }
    }
    return patchedData;
  }

  const onSubmit = (values) => {
    setIsSubmitBlocked(true);
    setTimeout(() => {
      setIsSubmitBlocked(false);
    }, 3000);
    const { password, outdatedPassword, repeatPassword } = values;
    delete values["avatar"];
    patchedData = areEqualWithNull(values, user);

    if (Object.keys(patchedData).length === 0) {
      setMessage({ text: "You have not made any changes.", type: "error" });
    } else {
      if (outdatedPassword !== "" || password !== "" || repeatPassword !== "") {
        if (outdatedPassword === password) {
          setMessage({
            text: "New password cannot be the same as the old password.",
            type: "error",
          });
        } else if (
          outdatedPassword === "" ||
          password === "" ||
          repeatPassword === ""
        ) {
          setMessage({
            text: "Fill in all fields with passwords.",
            type: "error",
          });
        } else {
          const keysForDelete = [
            "outdatedPassword",
            "password",
            "repeatPassword",
          ];
          keysForDelete.forEach((key) => {
            delete patchedData[key];
          });
          dispatch(
            updateUserInfo({
              ...patchedData,
              password: outdatedPassword,
              newPassword: repeatPassword,
            })
          )
            .unwrap()
            .then(() => {
              setMessage({
                text: "Successfully changed information.",
                type: "success",
              });
              dispatch(closeModal());
            })
            .catch((err) => {
              if (err === "Request failed with status code 401") {
                setMessage({
                  text: "Incorrect outdated password",
                  type: "error",
                });
              } else {
                setMessage({ text: "Error, try later!", type: "error" });
              }
            });
        }
      } else {
        dispatch(updateUserInfo(patchedData))
          .unwrap()
          .then(() => {
            setMessage({
              text: "Successfully changed information.",
              type: "success",
            });
            dispatch(closeModal());
          })
          .catch(() =>
            setMessage({ text: "Error, try later!", type: "error" })
          );
      }
    }

    patchedData = {};
  };

  const handleAvatarChange = (e) => {
    setIsSubmitBlocked(true);
    setTimeout(() => {
      setIsSubmitBlocked(false);
    }, 3000);
    const file = e.target.files[0];
    if (file) {
      dispatch(updateUserAvatar({ avatar: file }))
        .unwrap()
        .then(() => {
          setMessage({ text: "Avatar changed!", type: "success" });
        })
        .catch(() => {
          setMessage({ text: "Error, try later!", type: "error" });
        });
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
              avatar={user.avatar}
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
                    isError={
                      touched.outdatedPassword && errors.outdatedPassword
                    }
                  />
                  <NewPassword
                    isHiddenPassword={state.password}
                    toggle={toggle}
                    isError={touched.password && errors.password}
                  />
                  <RepeatPassword
                    isHiddenPassword={state.repeatPassword}
                    toggle={toggle}
                    isError={touched.repeatPassword && errors.repeatPassword}
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

