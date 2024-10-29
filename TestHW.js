import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getWaterNotes } from "./waterOperations";

const MyComponent = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const setAuthHeader = (token) => {
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
    };

    setAuthHeader(token); // Налаштуємо заголовок авторизації
    dispatch(getWaterNotes()); // Викликати операцію
  }, [dispatch, token]); // Залежності

  return <div>Ваш контент</div>;
};

export default MyComponent;

// автоматично налаштувати заголовок авторизації при монтуванні компонента, ви можете використовувати хук useEffect:
// отримати токен з Redux-слайсу у вашому компоненті перед виконанням запиту.
