import css from "./DaysGeneralStats.module.css";
import { useEffect, useRef, useState } from "react";

// import { useSelector } from "react-redux";
// import {
//   selectWaterTodayPanel,
//   selectWaterPercentage,
// } from "../../redux/water/selectors";

export default function DaysGeneralStats({  dayInfo, onClose }) {
  const [alignRight, setAlignRight] = useState(false); // Стан вирівнювання
  const wrapperRef = useRef(null);
  // const waterItems = useSelector(selectWaterTodayPanel); // масив із записами на сьогодні
  // const percentage = useSelector(selectWaterPercentage); // відсоток виконання норми
  // const dayData = waterItems.find((data) => data.date === day); // шукаємо дані за вибрану дату

  // Перевіряємо, чи елемент виходить за межі екрана
  useEffect(() => {
    const handlePosition = () => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        const isOverflowingLeft = rect.left < 0;
        const isOverflowingRight = rect.right > window.innerWidth;

        // Вирівнюємо залежно від того, чи виходить компонент за межі
        if (isOverflowingLeft) {
          setAlignRight(true); // Вирівняти вправо
        } else if (isOverflowingRight) {
          setAlignRight(false); // Вирівняти вліво
        }
      }
    };

    handlePosition(); // Викликаємо відразу після рендеру
    window.addEventListener("resize", handlePosition); // Перевірка при зміні розміру вікна

    return () => {
      window.removeEventListener("resize", handlePosition); // Очищення слухача подій
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClose(); // Викликаємо функцію закриття
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Витягуємо необхідні дані з пропсів
  const { date, dailyNorm, progress, consumptionCount, month } = dayInfo;
  
  
  return (
    <div
      className={`${css.dayStatusWrapper} ${alignRight ? css.alignRight : ""}`}
      ref={wrapperRef}
    >
      <ul className={css.dayStatus}>
        <li className={css.dayStatusDate}>{date}{", "}{month}</li>
        <li className={css.dayStatusItem}>
          Daily norma: <span className={css.textColorAccent}>{dailyNorm}</span>
        </li>
        <li className={css.dayStatusItem}>
          Fulfillment of the daily norm:{" "}
          <span className={css.textColorAccent}>{progress}</span>
        </li>
        <li className={css.dayStatusItem}>
          How many servings of water:{" "}
          <span className={css.textColorAccent}>{consumptionCount}</span>
        </li>
      </ul>
    </div>
  );
}
