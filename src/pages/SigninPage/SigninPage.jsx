import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import DocumentTitle from "../../components/DocumentTitle";
import bottleMobile from "./image/bottleMobile.png";
import bottleTablet from "./image/bottleTablet.png";
import bottleDesktop from "./image/bottleDesktop.png";
import bottleMobileRetina from "./image/bottleMobile2x.png";
import bottleTabletRetina from "./image/bottleTablet2x.png";
import bottleDesktopRetina from "./image/bottleDesktop2x.png";
import css from "./SigninPage.module.css"; 
import AuthForm from "../../components/AuthForm/AuthForm";

export default function SignInPage() {

  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    navigate("/home");
  }

const handleSigninSuccess = () => {
  navigate("/home");
};
  //const handleChange = (e) => {    const { name, value } = e.target;    setFormData((prevData) => ({ ...prevData, [name]: value }));  };

  return (
    <div className={css.signinContainer}>
      <DocumentTitle>Sign In</DocumentTitle>

      <div className={css.formWrapper}>
        <h1>Sign In</h1>
        <AuthForm isSignUp={false} onSuccess={handleSigninSuccess} />

        <div className={css.navigationLinks}>
          <Link to="/signup" className={css.navLink}>
            Sign Up
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
        <img src={bottleMobile} alt="Bottle Icon" className={css.bottle} />
      </picture>
    </div>
  );
}
