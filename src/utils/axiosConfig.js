import axios from "axios";
// Основний і запасний бекенд
const primaryBaseURL = "https://sevenwatertracker-back-1.onrender.com";
const backupBaseURL = "http://localhost:3000";

async function checkServerAvailability(url) {
  try {
    // Виконуємо тестовий запит для перевірки доступності
    await axios.get(`${url}/health-check`);
    return true;
  } catch (error) {
    return false;
  }
}

// Налаштування базового URL динамічно
async function setBaseURL() {
  const isPrimaryAvailable = await checkServerAvailability(primaryBaseURL);
  axios.defaults.baseURL = isPrimaryAvailable ? primaryBaseURL : backupBaseURL;
}

// Викликаємо цю функцію один раз перед основними запитами
await setBaseURL();

export default axios;


