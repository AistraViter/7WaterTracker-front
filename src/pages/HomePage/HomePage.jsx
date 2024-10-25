// /home
// Компоненти:
// ✔ DailyNorma
// ✔ WaterRatioPanel
// ✔ TodayWaterList
// ✔ MonthStatsTable
import DocumentTitle from "../../components/DocumentTitle";

import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel.jsx";
import TodayWaterList from "../../components/TodayWaterList/TodayWaterList.jsx";
import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable.jsx";
import DailyNorma from "../../components/DailyNorma/DailyNorma.jsx";
import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={css.homepage}>
      <DocumentTitle>Home</DocumentTitle>

      <DailyNorma />
      {/* <div className={css.bottleimg}></div> */}
      <WaterRatioPanel />
      <div className={css.stats}>
        <TodayWaterList />
        <MonthStatsTable />
      </div>
    </div>
  );
};

export default HomePage;
