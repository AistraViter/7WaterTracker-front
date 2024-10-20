// /signup

import { useNavigate, Link } from "react-router-dom";
import DocumentTitle from "../../components/DocumentTitle";
import css from "./SignupPage.module.css"; 
import bottleMobile from "./image/bottleMobile.png";
import AuthForm from "../../components/AuthForm/AuthForm";

export default function SignUpPage() {
  const navigate = useNavigate();

  const handleSignupSuccess = () => {
    navigate("/home"); 
  };

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
        <img
          src={bottleMobile}
          alt="Bottle Icon"
          className={css.bottle}
        />
    </div>
  );
}
