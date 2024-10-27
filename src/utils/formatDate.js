export default function formatDate(date) {
    const year = date.getFullYear(); // Отримати рік
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Отримати місяць (додаємо 1, оскільки місяці від 0 до 11)
    const day = String(date.getDate()).padStart(2, '0'); // Отримати день
  
    return `${year}-${month}-${day}`; // Форматування дати
  }
  
//   const currentDate = new Date();
//   const formattedDate = formatDate(currentDate);
//   console.log(formattedDate); // Виведе дату у форматі YYYY-MM-DD
  