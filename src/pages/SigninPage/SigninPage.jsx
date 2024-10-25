import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../redux/auth/operations";
import { selectIsLoggedIn, selectLoading, selectError } from "../../redux/auth/selectors";
import DocumentTitle from "../../components/DocumentTitle";
import bottleMobile from "./image/bottleMobile.png";
import bottleTablet from "./image/bottleTablet.png";
import bottleDesktop from "./image/bottleDesktop.png";
import bottleMobileRetina from "./image/bottleMobile2x.png";
import bottleTabletRetina from "./image/bottleTablet2x.png";
import bottleDesktopRetina from "./image/bottleDesktop2x.png";
import css from "./SigninPage.module.css"; 

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  if (isLoggedIn) {
    navigate("/home");
  }


  if (isLoggedIn) {
    navigate("/home");
  }


  const validateForm = (data) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      errors.email = "Invalid email format";
    }
 if (!data.password) {
   errors.password = "Password is required";
 }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      dispatch(signin(formData)); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={css.signinContainer}>
      <DocumentTitle>Sign In</DocumentTitle>

      <div className={css.formWrapper}>
        <h1>Sign In</h1>
        {error && <p className={css.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={css.authForm}>
          <div className={css.formGroup}>
            <label className={css.label}>Enter your email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail"
              className={`${css.inputField} ${
                errors.email ? css.inputError : ""
              }`}

            />
            {errors.email && <p className={css.error}>{errors.email}</p>}
          </div>

          <div className={css.formGroup}>
            <label className={css.label}>Enter your password</label>
            <div className={css.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`${css.inputField} ${
                  errors.password ? css.inputError : ""
                }`}

              />
               <span
                onClick={togglePasswordVisibility}
                className={css.passwordToggleIcon}
              >
                {/* Показываем иконку в зависимости от состояния showPassword */}
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
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
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      stroke="#2F2F2F"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65A3 3 0 1 0 9.88 9.879m4.242 4.242L9.881 9.88"
                    />
                  </svg>
                )}
              </span>
            </div>
            {errors.password && <p className={css.error}>{errors.password}</p>}
          </div>

          <button type="submit" className={css.submitBtn} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className={css.navigationLinks}>

      
          <Link to="/signup" className={css.navLink}>
            Sign Up
          </Link>
        </div>
      </div>

      <picture>
        <source
          media="(min-width: 1440px) and (-webkit-min-device-pixel-ratio: 1.5), (min-width: 1440px) and (min-resolution: 1.5dppx)"
          srcSet={bottleDesktopRetina}
        />
        <source media="(min-width: 1440px)" srcSet={bottleDesktop} />
        <source
          media="(min-width: 768px) and (-webkit-min-device-pixel-ratio: 1.5), (min-width: 768px) and (min-resolution: 1.5dppx)"
          srcSet={bottleTabletRetina}
        />
        <source media="(min-width: 768px)" srcSet={bottleTablet} />
        <source
          media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 1.5dppx)"
          srcSet={bottleMobileRetina}
        />
        <source srcSet={bottleMobile} />
        <img src={bottleMobile} alt="Bottle Icon" className={css.bottle} />
      </picture>
    </div>
  );
}
