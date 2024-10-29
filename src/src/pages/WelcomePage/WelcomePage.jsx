// /welcome

import DocumentTitle from "../../components/DocumentTitle";
import { WaterConsumptionTracker } from "../../components/WaterСonsumptionTracker/WaterСonsumptionTracker";
import { WhyDrinkWater } from "../../components/WhyDrinkWater/WhyDrinkWater";
import css from "./WelcomePage.module.css";
import BkgMobile from "./images/BkgMobile.png";
import BkgTablet from "./images/BkgTablet.png";
import BkgWeb from "./images/BkgWeb.png";
import BkgMobileRetina from "./images/BkgMobile.png";
import BkgTabletRetina from "./images/BkgTablet.png";
import BkgWebRetina from "./images/BkgWeb.png";

export default function WelcomePage() {
  const imageSrc = BkgMobile;

  return (
    <div className={css.bkgContainer}>
      <DocumentTitle>Welcome</DocumentTitle>

      <div className={css.mainContainer}>
        <WaterConsumptionTracker />
        <WhyDrinkWater />
      </div>
      <picture>
        <source
          media="(min-width: 1440px) and (-webkit-min-device-pixel-ratio: 1.5), (min-width: 1440px) and (min-resolution: 1.5dppx)"
          srcSet={BkgWebRetina}
        />
        <source media="(min-width: 1440px)" srcSet={BkgWeb} />
        <source
          media="(min-width: 768px) and (-webkit-min-device-pixel-ratio: 1.5), (min-width: 768px) and (min-resolution: 1.5dppx)"
          srcSet={BkgTabletRetina}
        />
        <source media="(min-width: 768px)" srcSet={BkgTablet} />
        <source
          media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 1.5dppx)"
          srcSet={BkgMobileRetina}
        />
        <source srcSet={BkgMobile} />
        <img src={imageSrc} alt="Background Image" className={css.bkg} />
      </picture>
    </div>
  );
}
