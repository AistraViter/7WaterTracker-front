import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddWaterAmountModal from "../Modal/AddWaterAmountModal/AddWaterAmountModal.jsx";
import { getWaterToday } from '../../redux/water/operations.js';
import { selectWaterPercentage } from "../../redux/water/selectors.js"; // Шлях до вашого waterSlice

import css from "./WaterRatioPanel.module.css";

const WaterRatioPanel = () => {
  const dispatch = useDispatch();
  
  // Отримання percentage з Redux-стану за допомогою селектора
  const waterPercentage = useSelector(selectWaterPercentage);

  // Виконання getWaterToday при монтуванні компонента
  useEffect(() => {
    dispatch(getWaterToday());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddWater = () => {
    setIsModalOpen(true);
  }; 

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getMilestoneStyle = (milestoneValue) => {
    return Math.round(waterPercentage) === milestoneValue
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
  useEffect(() => {
}, [waterPercentage]);

  return (
    <div className={css.waterratiopanel}>
      <h3 className={css.title}>Today</h3>

      <div className={css.container}>
        <div className={css.data}>
          <div className={css.progressBarContainer}>
            <div
              className={css.progressBar}
              style={{ width: `${waterPercentage}%` }}
            ></div>

            <div className={css.milestones}>
              <div className={css.milestone} style={getMilestoneStyle(0)}>
                <span className={css.line}>|</span> 0%
              </div>
              <div className={css.milestone} style={getMilestoneStyle(50)}>
                <span className={css.line} >|</span > {50}%
              </div>
              <div className={css.milestone} style={getMilestoneStyle(100)}>
                <span className={css.line}>|</span> 100%
              </div>
            </div>

            <div
              className={css.circle}
              style={{ left: `${waterPercentage}%` }}
            ></div>
          </div>
        </div>
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
