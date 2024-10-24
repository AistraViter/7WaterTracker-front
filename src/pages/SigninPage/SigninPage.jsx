import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DocumentTitle from "../../components/DocumentTitle";
import css from "./SigninPage.module.css"; // Импорт стилей для страницы
import icon111 from "./images/icon111.png";


export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Состояние для видимости пароля
  const navigate = useNavigate();

  // Функция для проверки валидности полей формы
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
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };

  // Функция для отправки данных формы
  const handleSignin = async (formData) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.accessToken); // Сохраняем токен
        navigate("/home"); // Перенаправляем на защищенную страницу
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Authorization error");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  // Функция для обработки изменений в полях формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Функция для отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      handleSignin(formData); // Отправляем данные на сервер
    }
  };

  // Функция для переключения видимости пароля
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={css.signinContainer}>
      <DocumentTitle>Sign In</DocumentTitle>

      <div className={css.formWrapper}>
        <h1>Sign In</h1>
        {error && <p className={css.error}>{error}</p>}{" "}
        {/* Сообщение об ошибке */}
        {/* Форма авторизации */}
        <form onSubmit={handleSubmit} className={css.authForm}>
          {/* Поле для ввода email */}
          <div className={css.formGroup}>
            <label className={css.label}>Enter your email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail"
              className={`${css.inputField} ${errors.email ? css.invalid : ""}`} // Добавляем класс ошибки
            />
            {errors.email && <p className={css.error}>{errors.email}</p>}
          </div>

          {/* Поле для ввода пароля с глазком */}
          <div className={css.formGroup}>
            <label className={css.label}>Enter your password</label>
            <div className={css.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"} // Переключение типа поля
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`${css.inputField} ${
                  errors.password ? css.invalid : ""
                }`} // Добавляем класс ошибки
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

          {/* Кнопка для отправки формы */}
          <button type="submit" className={css.submitBtn}>
            Sign In
          </button>
        </form>
        {/* Навигационные ссылки */}
        <div className={css.navigationLinks}>
          {/* Ссылки для навигации */}
          <Link to="/forgot-password" className={css.navLink}>
            Forgot your password?
          </Link>
          <Link to="/signup" className={css.navLink}>
            Sign Up
          </Link>
        </div>
        <img src={icon111} alt="Custom Icon" className="customIcon" />
      </div>
    </div>
  );
}
