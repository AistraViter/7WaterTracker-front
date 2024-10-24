// /signup

import { useNavigate, Link } from "react-router-dom";
import DocumentTitle from "../../components/DocumentTitle";
import css from "./SignupPage.module.css";
import { useState } from "react";
import bottleMobile from "./image/bottleMobile.png";
import bottleTablet from "./image/bottleTablet.png";
import bottleDesktop from "./image/bottleDesktop.png";
import bottleMobileRetina from "./image/bottleMobile2x.png";
import bottleTabletRetina from "./image/bottleTablet2x.png";
import bottleDesktopRetina from "./image/bottleDesktop2x.png";
import AuthForm from "../../components/AuthForm/AuthForm";

export default function SignUpPage() {
  const navigate = useNavigate();

  const handleSignupSuccess = () => {
    navigate("/home");
  };

  const imageSrc = useState(bottleMobile);

  return (
    <div className={css.signupContainer}>
      <DocumentTitle>Sign Up</DocumentTitle>

      <div className={css.formWrapper}>
        <h1 className={css.title}>Sign Up</h1>
        <AuthForm isSignUp={true} onSuccess={handleSignupSuccess} />
        <div className={css.navigationLinks}>
          <Link to="/signin" className={css.navLink}>
            Sign In
          </Link>
        </div>
      </div>
      <picture>
        <source
          media="(min-width: 1440px) and (-webkit-min-device-pixel-ratio: 1.5), (min-width: 1440px) and (min-resolution: 1.5dppx)"
          srcSet={bottleDesktopRetina}
        />
        <source media="(min-width: 1440px)" srcSet={bottleDesktop} />
        <source
          media="(min-width: 768px) and (-webkit-min-device-pixel-ratio: 1.5), (min-width: 768px) and (min-resolution: 1.5dppx)"
          srcSet={bottleTabletRetina}
        />
        <source media="(min-width: 768px)" srcSet={bottleTablet} />
        <source
          media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 1.5dppx)"
          srcSet={bottleMobileRetina}
        />
        <source srcSet={bottleMobile} />
        <img src={imageSrc} alt="Bottle Icon" className={css.bottle} />
      </picture>
    </div>
  );
}
