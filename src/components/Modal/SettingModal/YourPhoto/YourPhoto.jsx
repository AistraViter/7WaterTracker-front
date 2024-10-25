import clsx from "clsx";
import { useId } from "react";
import css from "./YourPhoto.module.css";
import myCustomStyles from "../SettingModal.module.css";

const YourPhoto = ({ avatar, isSubmitBlocked, handleAvatarChange }) => {
  const fileInputId = useId();
  const defaultImage = "../../../../../public/image/defaultUser.png";

  return (
    <div className={myCustomStyles["photo-group"]}>
      <h3 className={myCustomStyles.subtitle}>Your photo</h3>
      <div className={css["photo-flex"]}>
        <div className={css["avatar-container"]}>
          <img
            className={css.avatar}
            src={avatar || defaultImage}
            alt="avatar"
          />
        </div>
        <div>
          <div className={css["upload-button"]} type="button">
            <label
              htmlFor={fileInputId}
              className={clsx(
                css["file-upload-label"],
                isSubmitBlocked && css["blocked-upload"]
              )}
            >
              <svg
                className={clsx(
                  css["upload-icon"],
                  isSubmitBlocked && css["blocked-upload"]
                )}
              >
                <use href="../../../../../public/icon.svg#icon-up" />
              </svg>
              Upload a photo
            </label>
            <input
              disabled={isSubmitBlocked}
              id={fileInputId}
              type="file"
              className={css["file-input"]}
              accept=".jpg,.jpeg,.png,.gif"
              onChange={handleAvatarChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourPhoto;
