//// Operations
import axios from "axios";
import { store } from "../redux/store.js"; // Імпорт store для доступу до токена з Redux

// Основний і запасний бекенд
const primaryBaseURL = "https://sevenwatertracker-back-1.onrender.com";
const backupBaseURL = "http://localhost:54141";

// Створюємо екземпляр Axios
const axiosInstance = axios.create();

// Функція для перевірки доступності сервера
async function checkServerAvailability(url) {
  try {
    await axios.get(`${url}/health-check`);
    return true;
  } catch (error) {
    return false;
  }
}

// Функція для налаштування базового URL та додавання інтерсептора
export async function configureAxios() {
  const isPrimaryAvailable = await checkServerAvailability(primaryBaseURL);
  axiosInstance.defaults.baseURL = isPrimaryAvailable
    ? primaryBaseURL
    : backupBaseURL;

  // Додаємо інтерсептор для автоматичного додавання токена
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Current token додано в Авторизацію:", token); // Додайте це
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

export default axiosInstance;
