import css from "./DaysGeneralStats.module.css";
import { useSelector } from "react-redux";
import { selectWaterTodayPanel, selectWaterPercentage } from "../../redux/water/selectors";

export default function DaysGeneralStats({ day }) {
  const waterItems = useSelector(selectWaterTodayPanel); // масив із записами на сьогодні
  const percentage = useSelector(selectWaterPercentage); // відсоток виконання норми

  const dayData = waterItems.find((data) => data.date === day); // шукаємо дані за вибрану дату

  return (
    <div className={css.dayStatusWrapper}>
      <ul className={css.dayStatus}>
        <li className={css.dayStatusDate}>{day}</li>
        <li className={css.dayStatusItem}>
          Daily norma: <span className={css.textColorAccent}>1.5 L</span>
        </li>
        <li className={css.dayStatusItem}>
          Fulfillment of the daily norm:{" "}
          <span className={css.textColorAccent}>
            {dayData ? `${percentage}%` : "0%"}
          </span>
        </li>
        <li className={css.dayStatusItem}>
          How many servings of water:{" "}
          <span className={css.textColorAccent}>
            {dayData ? dayData.servings : "0"}
          </span>
        </li>
      </ul>
    </div>
  );
}
