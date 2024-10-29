export default function formatTo12HourTime(isoDate) {
    const date = new Date(isoDate);
  
    let hours = date.getUTCHours(); // Отримуємо години у форматі UTC
    const minutes = date.getUTCMinutes(); // Отримуємо хвилини у форматі UTC
    const ampm = hours >= 12 ? "PM" : "AM"; // Визначаємо, чи AM, чи PM
  
    hours = hours % 12 || 12; // Перетворюємо на 12-годинний формат, замінюємо 0 на 12
  
    // Форматуємо хвилини до двох цифр, якщо вони менші за 10
    const formattedMinutes = minutes.toString().padStart(2, "0");
  
    return `${hours}:${formattedMinutes} ${ampm}`; // Повертаємо час у форматі "7:00 AM"
  }
  

  // Приклад використання
//   const formattedTime = formatTo12HourTime("2024-10-26T17:00:00.000Z");
//   console.log(formattedTime); // "7:00 AM"
  