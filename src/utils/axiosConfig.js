import axios from "axios";

// Основний і запасний бекенд
const primaryBaseURL = "https://sevenwatertracker-back-1.onrender.com";
const backupBaseURL = "http://localhost:54141";

// Створюємо екземпляр Axios
export const axiosInstance = axios.create({ withCredentials: true });

// Функція для перевірки доступності сервера
async function checkServerAvailability(url) {
  try {
    await axios.get(`${url}/health-check`);
    return true;
  } catch (error) {
    return false;
  }
}

// Функція для налаштування базового URL
export async function configureAxios() {
  const isPrimaryAvailable = await checkServerAvailability(primaryBaseURL);
  axiosInstance.defaults.baseURL = isPrimaryAvailable
    ? primaryBaseURL
    : backupBaseURL;
}

export default axiosInstance;
