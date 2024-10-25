// /home
// Компоненти:
// ✔ DailyNorma
// ✔ WaterRatioPanel
// ✔ TodayWaterList
// ✔ MonthStatsTable
import DocumentTitle from "../../components/DocumentTitle";
// import DailyNorma from "../../components/DailyNorma/DailyNorma.jsx";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel.jsx";
import TodayWaterList from "../../components/TodayWaterList/TodayWaterList.jsx";
import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable.jsx";
import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={css.homepage}>
      <DocumentTitle>Home</DocumentTitle>
      {/* <DailyNorma /> */}
      <WaterRatioPanel />
      <div className={css.stats}>
        <TodayWaterList />
        <MonthStatsTable />
      </div>
    </div>
  );
};

export default HomePage;
// Задісейблила DailyNorma через помилку в консолі:
// GET http://localhost:5176/src/components/DailyNorma/DailyNorma.jsx net::ERR_ABORTED 500 (Internal Server Error)