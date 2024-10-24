import { useState } from "react";
import {TodayListModal} from "../TodayListModal/TodayListModal.jsx";
import css from "./WaterRatioPanel.module.css";

const WaterRatioPanel = () => {
  const [waterConsumed, setWaterConsumed] = useState(750);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dailyNorm = 1500;
  const ratio = Math.min((waterConsumed / dailyNorm) * 100, 100);

  const handleAddWater = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getMilestoneStyle = (milestoneValue) => {
    return Math.round(ratio) === milestoneValue
      ? {
          fontFamily: "Roboto",
          fontSize: "16px",
          fontWeight: "500",
          lineHeight: "20px",
          textAlign: "center",
          color: "#407bff",
        } // Change to your desired milestone style
      : {
          fontFamily: "Roboto",
          fontSize: "12px",
          fontWeight: "400",
          lineHeight: "16px",
          textAlign: "center",
          color: "#407bff",
        }; // Change to your desired non-milestone style
  };

  return (
    <div className={css.waterratiopanel}>
      <h3 className={css.title}>Today</h3>
      <div className={css.data}>
        {/* Контейнер прогрес-бару */}
        <div className={css.progressBarContainer}>
          {/* Сам прогрес */}
          <div className={css.progressBar} style={{ width: `${ratio}%` }}></div>

          {/* Вертикальні лінії (milestones) */}
          <div className={css.milestones}>
            <div className={css.milestone} style={getMilestoneStyle(0)}>
              | 0%
            </div>
            <div className={css.milestone} style={getMilestoneStyle(50)}>
              | 50%
            </div>
            <div className={css.milestone} style={getMilestoneStyle(100)}>
              | 100%
            </div>
          </div>

          {/* Кружок */}
          <div className={css.circle} style={{ left: `${ratio}%` }}></div>
        </div>
      </div>

      <button onClick={handleAddWater} className={css.btn}>
        Add Water
      </button>
      {isModalOpen && (
        <TodayListModal
          closeModal={closeModal}
          setWaterConsumed={setWaterConsumed}
        />
      )}
    </div>
  );
};

export default WaterRatioPanel;
