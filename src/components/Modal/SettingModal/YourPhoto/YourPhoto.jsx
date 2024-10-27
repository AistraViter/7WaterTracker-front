import clsx from "clsx";
import { useId } from "react";
import css from "./YourPhoto.module.css";
import defaultImage from "./image/profile.png"

const YourPhoto = ({ avatar, isSubmitBlocked, handleAvatarChange }) => {
  const fileInputId = useId();


  return (
    <div className={css.photoGroup}>
      <h3 className={css.subtitle}>Your photo</h3>
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
                viewBox="0 0 32 32"
                className={clsx(
                  css["upload-icon"],
                  isSubmitBlocked && css["blocked-upload"]
                )}
              >
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeMiterlimit="4"
                  strokeWidth="2"
                  d="M4 22v3c0 0.796 0.316 1.559 0.879 2.121s1.326 0.879 2.121 0.879h18c0.796 0 1.559-0.316 2.121-0.879s0.879-1.326 0.879-2.121v-3M10 10l6-6M16 4l6 6M16 4v18"
                ></path>
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
