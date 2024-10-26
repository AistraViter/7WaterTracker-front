import css from "../TodayWaterList/TodayWaterList.module.css";

const WaterEntry = ({ entry, index, onEdit, onDelete }) => {
  return (
    <li className={css.listitem}>
      <div className={css.con1}>
        <p className={css.glassicon}>
          <svg width="24" height="24" className={css.glassicon}>
            <use href="/sprite.svg#icon-glass" />
          </svg>
        </p>
        <div className={css.numbers}>
          <span className={css.amount}>{entry.amount} ml</span>{" "}
          <span className={css.time}>{entry.time}</span>
        </div>
      </div>
      <div className={css.btns}>
        <button className={css.edit} onClick={() => onEdit(index)}>
          <svg width="16" height="16" className={css.editicon}>
            <use href="/sprite.svg#icon-edit" />
          </svg>
        </button>
        <button className={css.delete} onClick={() => onDelete(index)}>
          <svg width="16" height="16" className={css.deleteicon}>
            <use href="/sprite.svg#icon-delete" />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default WaterEntry;
