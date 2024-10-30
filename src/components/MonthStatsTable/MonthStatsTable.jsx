import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWaterMonth } from "../../redux/water/operations.js";
import DaysGeneralStats from "../DaysGeneralStats/DaysGeneralStats.jsx";
import css from "./MonthStatsTable.module.css";

const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

const staticStyles = {
  achieved: css.achieved,
  notAchieved: css.notAchieved,
};

const MonthStatsTable = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  // const [showModal, setShowModal] = useState(false);
  const [monthData, setMonthData] = useState([]);
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

  const daysInMonth = getDaysInMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );

  // Дані з бекенду
  const fetchWaterMonth = async () => {
    try {
      const data = await dispatch(
        getWaterMonth({
          month: currentDate.getMonth() + 1,
          year: currentDate.getFullYear(),
        })
      ).unwrap();
      setMonthData(
        Array.from({ length: daysInMonth }, (_, i) => {
          const dayData = data.find(
            (d) => new Date(d.date).getDate() === i + 1
          );
          return {
            date: i + 1,
            progress: dayData ? dayData.percentage : 0,
            achieved: dayData ? dayData.percentage >= 100 : false,
            dailyNorm: dayData ? dayData.dailyNorm : "2.0 L", // Норматив
            consumptionCount: dayData ? dayData.consumptionCount : 0, // Кількість споживань
          };
        })
      );
    } catch (error) {
      console.error("Error fetching water notes:", error);
    }
  };

  useEffect(() => {
    fetchWaterMonth();
  }, [currentDate, token, dispatch]);

  ///// логіка календаря
  const handleDayClick = (dayData) => {
    setSelectedDay(dayData);
  };

  const getProgressClass = (progress) => {
    return progress.length >= 4
      ? staticStyles.achieved
      : staticStyles.notAchieved;
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

  const handleClose = () => {
    setSelectedDay(null); // Закриваємо панель
  };

  const month = monthNames[currentDate.getMonth()]; // Тут отримуємо назву місяця


  return (
    <div className={css.monthstatscontainer}>
      <div className={css.top}>
        <h2 className={css.title}>Month</h2>
        <div className={css.monthheader}>
          <button className={css.navbutton} onClick={handlePrevMonth}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 32 32"
              fill="#407bff"
              className={css.leftarrow}
            >
              <path
                stroke="#407bff"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.294 16.707c-0.187-0.188-0.292-0.442-0.292-0.707s0.105-0.519 0.292-0.707l10-10c0.092-0.098 0.202-0.177 0.325-0.232s0.255-0.084 0.389-0.086c0.134-0.002 0.268 0.022 0.392 0.073s0.238 0.125 0.333 0.22c0.095 0.095 0.17 0.208 0.22 0.333s0.075 0.258 0.073 0.392c-0.002 0.134-0.032 0.267-0.086 0.389s-0.133 0.233-0.232 0.325l-9.293 9.293 9.293 9.293c0.098 0.092 0.177 0.202 0.232 0.325s0.084 0.255 0.086 0.39c0.002 0.134-0.022 0.268-0.073 0.392s-0.125 0.238-0.22 0.333c-0.095 0.095-0.208 0.17-0.333 0.22s-0.258 0.075-0.392 0.072c-0.134-0.002-0.267-0.032-0.389-0.086s-0.233-0.134-0.325-0.232l-10-10z"
              />
            </svg>
          </button>
          <h2 className={css.month}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button className={css.navbutton} onClick={handleNextMonth}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 32 32"
              fill="#407bff"
              className={css.rightarrow}
            >
              <path
                stroke="#407bff"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.706 16.707c0.187-0.188 0.292-0.442 0.292-0.707s-0.105-0.519-0.292-0.707l-10-10c-0.092-0.098-0.202-0.177-0.325-0.232s-0.255-0.084-0.389-0.086c-0.134-0.002-0.268 0.022-0.392 0.073s-0.238 0.125-0.333 0.22c-0.095 0.095-0.17 0.208-0.22 0.333s-0.075 0.258-0.073 0.392c0.002 0.134 0.032 0.267 0.086 0.389s0.133 0.233 0.232 0.325l9.293 9.293-9.293 9.293c-0.098 0.092-0.177 0.202-0.232 0.325s-0.084 0.255-0.086 0.39c-0.002 0.134 0.022 0.268 0.073 0.392s0.125 0.238 0.22 0.333c0.095 0.095 0.208 0.17 0.333 0.22s0.258 0.075 0.392 0.072c0.134-0.002 0.267-0.032 0.389-0.086s0.233-0.134 0.325-0.232l10-10z"
              />
            </svg>
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
            <div className={css.progresspercentage}>
              {day.progress === 0 ? "0%" : day.progress}
            </div>
            {/* Модалка */}
            {selectedDay && selectedDay.date === day.date && (
              
              <DaysGeneralStats
                dayData={selectedDay}
                dayInfo={{
                  date: selectedDay.date,
                  dailyNorm: day.dailyNorm,
                  progress: day.progress,
                  consumptionCount: day.consumptionCount,
                  month, // Передаємо місяць тут

                }}
                onClose={handleClose}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthStatsTable;
