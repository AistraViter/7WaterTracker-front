import RegistrationForm from "../../components/RegistrationForm/RegistrationForm"
import css from "./RegistrationPage.module.css";

function RegistrationPage() { 
  return (
    <div className={css.registrationPage}>
      <h2>Create a New Account</h2>
      <RegistrationForm />
    </div>
  );
}

export default RegistrationPage;
