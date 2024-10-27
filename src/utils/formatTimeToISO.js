export const formatTimeToISO = (time) => {
  // Перевірка на валідність введення
  if (!time || typeof time !== 'string' || !time.includes(":")) {
      throw new Error("Invalid time format. Please use 'HH:MM' format.");
  }

  const date = new Date(); // Отримуємо поточну дату
  const [hours, minutes] = time.split(":").map(Number); // Розділяємо та перетворюємо в числа

  // Перевірка на дійсні значення
  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      throw new Error("Invalid time value. Hours must be between 0-23 and minutes between 0-59.");
  }

  date.setHours(hours, minutes, 0, 0); // Встановлюємо години та хвилини
  return date.toISOString(); // Повертаємо у форматі ISO
};
