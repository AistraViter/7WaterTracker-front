export default function convertTo24HourFormat(time) {
    // Розділяємо час на частини (години, хвилини та AM/PM)
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
  
    // Перетворюємо години у 24-годинний формат
    if (modifier === 'PM' && hours !== 12) {
      hours += 12; // Додаємо 12 до годин, якщо це PM
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0; // Якщо це AM і години 12, ставимо години 0
    }
  
    // Повертаємо формат з двох цифр
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }
  
//   // Приклад використання
//   const timeIn12HourFormat = '3:15 PM';
//   const timeIn24HourFormat = convertTo24HourFormat(timeIn12HourFormat);
//   console.log(timeIn24HourFormat); // Виведе "15:15"
  