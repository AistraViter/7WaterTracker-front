import LoginForm from "../../components/LoginForm/LoginForm"
import css from "./LogInPage.module.css";

function LogInPage() { 
  return (
    <div className={css.logInPage}>
      <h2>Log In to Your Account</h2>
      <LoginForm />
    </div>
  );
}

export default LogInPage;
