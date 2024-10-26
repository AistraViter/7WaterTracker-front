import { useState } from "react";
import AddWaterAmountModal from "../Modal/AddWaterAmountModal/AddWaterAmountModal.jsx";
import { useSelector } from "react-redux";
import { selectWaterPercentage } from "../../redux/water/selectors.js";

import css from "./WaterRatioPanel.module.css";

const WaterRatioPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const waterPercantage = useSelector(selectWaterPercentage);

  const handleAddWater = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getMilestoneStyle = (milestoneValue) => {
    return Math.round(waterPercantage) === milestoneValue
      ? {
          fontFamily: "Roboto",
          fontSize: "16px",
          fontWeight: "500",
          lineHeight: "20px",
          textAlign: "center",
          color: "#407bff",
        }
      : {
          fontFamily: "Roboto",
          fontSize: "12px",
          fontWeight: "400",
          lineHeight: "16px",
          textAlign: "center",
          color: "#407bff",
        };
  };

  return (
    <div className={css.waterratiopanel}>
      <h3 className={css.title}>Today</h3>

      <div className={css.container}>
        <div className={css.data}>
          <div className={css.progressBarContainer}>
            <div
              className={css.progressBar}
              style={{ width: `${waterPercantage}%` }}
            ></div>

            <div className={css.milestones}>
              <div className={css.milestone} style={getMilestoneStyle(0)}>
                <span className={css.line}>|</span> 0%
              </div>
              <div className={css.milestone} style={getMilestoneStyle(50)}>
                <span className={css.line}>|</span> 50%
              </div>
              <div className={css.milestone} style={getMilestoneStyle(100)}>
                <span className={css.line}>|</span> 100%
              </div>
            </div>

            <div
              className={css.circle}
              style={{ left: `${waterPercantage}%` }}
            ></div>
          </div>
        </div>{" "}
        {/* Закриваючий тег для блоку data */}
        <button onClick={handleAddWater} className={css.btn}>
          <svg width="24" height="24" className={css.plusicon}>
            <use href="/sprite.svg#icon-add" />
          </svg>
          Add Water
        </button>
        <AddWaterAmountModal
          isOpen={isModalOpen}
          onClose={closeModal}
        />
        
      </div>
    </div>
  );
};

export default WaterRatioPanel;
