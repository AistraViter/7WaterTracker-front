// /welcome

import DocumentTitle from "../../components/DocumentTitle";
import { WaterConsumptionTracker } from "../../components/WaterСonsumptionTracker/WaterСonsumptionTracker";
import { WhyDrinkWater } from "../../components/WhyDrinkWater/WhyDrinkWater";
import css from "./WelcomePage.module.css";

export default function WelcomePage() {
    return (
        <div>
            <DocumentTitle>Welcome</DocumentTitle>
            <div className={css.mainContainer}>
                <WaterConsumptionTracker />
                <WhyDrinkWater />
            </div>
        </div>
    );
}
