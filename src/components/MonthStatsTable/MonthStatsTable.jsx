import { useState } from "react";
import DaysGeneralStats from "../DaysGeneralStats/DaysGeneralStats.jsx";
import css from "./MonthStatsTable.module.css";

const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

const staticStyles = {
  achieved: css.achieved,
  notAchieved: css.notAchieved,
};

const MonthStatsTable = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  // Масив з назвами місяців
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Отримання днів у місяці
  const daysInMonth = getDaysInMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );

  // Статичні дані для демонстрації
  const monthData = Array.from({ length: daysInMonth }, (_, i) => ({
    date: i + 1,
    progress: Math.floor(Math.random() * 101),
    achieved: Math.random() < 0.5,
  }));

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const getProgressClass = (progress) => {
    return progress === 100 ? staticStyles.achieved : staticStyles.notAchieved;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1)
    );
  };

  return (
    <div className={css.monthstatscontainer}>
      <div className={css.top}>
        <h2 className={css.title}>Month</h2>
        <div className={css.monthheader}>
          <button className={css.navbutton} onClick={handlePrevMonth}>
            P
          </button>
          <h2 className={css.month}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button className={css.navbutton} onClick={handleNextMonth}>
            N
          </button>
        </div>
      </div>

      <ul className={css.monthstatstable}>
        {monthData.map((day, index) => (
          <li
            className={`${css.daycell} ${getProgressClass(day.progress)}`}
            key={index}
            onClick={() => handleDayClick(day)}
          >
            <div className={css.daynumber}>
              <span className={css.number}>{day.date}</span>
            </div>
            <div className={css.progresspercentage}>{day.progress}%</div>
            {selectedDay && selectedDay.date === day.date && (
              <DaysGeneralStats dayData={selectedDay} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthStatsTable;
