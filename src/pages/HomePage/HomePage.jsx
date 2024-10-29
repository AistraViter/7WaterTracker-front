// /home
// Компоненти:
// ✔ DailyNorma
// ✔ WaterRatioPanel
// ✔ TodayWaterList
// ✔ MonthStatsTable
import DocumentTitle from "../../components/DocumentTitle";
import bottleMob from "./image/mobile/bottle.png";
import bottleTab from "./image/tablet/bottle.png";
import bottleDesc from "./image/desktop/bottle.png";
import bottleMobRetina from "./image/mobile/bottleRetina.png";
import bottleTabRetina from "./image/tablet/bottleRetina.png";
import bottleDescRetina from "./image/desktop/bottleRetina.png";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel.jsx";
import TodayWaterList from "../../components/TodayWaterList/TodayWaterList.jsx";
import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable.jsx";
import DailyNorma from "../../components/DailyNorma/DailyNorma.jsx";
import css from "./HomePage.module.css";

const HomePage = () => {
  const imageSrc = bottleMob;
  
  
  return (
    <div className={css.homepage}>
      <DocumentTitle>Home</DocumentTitle>
      <div className={css.topAligned}>
        <DailyNorma />
      </div>
      <div className={css.centeredContent}>
        <div className={css.btlPan}>
          <picture className={css.picture}>
            <source
              media="(min-width: 1440px) and (-webkit-min-device-pixel-ratio: 1.5), (min-width: 1440px) and (min-resolution: 1.5dppx)"
              srcSet={bottleDescRetina}
            />
            <source media="(min-width: 1440px)" srcSet={bottleDesc} />
            <source
              media="(min-width: 768px) and (-webkit-min-device-pixel-ratio: 1.5), (min-width: 768px) and (min-resolution: 1.5dppx)"
              srcSet={bottleTabRetina}
            />
            <source media="(min-width: 768px)" srcSet={bottleTab} />
            <source
              media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 1.5dppx)"
              srcSet={bottleMobRetina}
            />
            <source srcSet={bottleMob} />
            <img src={imageSrc} alt="Bottle Icon" className={css.bottle} />
          </picture>
          <WaterRatioPanel />
        </div>
        <div className={css.stats}>
          <TodayWaterList />
          <MonthStatsTable />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
