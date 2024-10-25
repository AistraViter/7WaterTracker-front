import RadioPair from "../RadioChoise/RadioChoise";
import css from "../../SettingModal/SettingModal";

const GenderIdentity = () => {
  return (
    <div className={css["gender-identity-group"]}>
      <h3 className={css.subtitle}>Your gender identity</h3>
      <RadioPair labelLeft="Woman" labelRight="Man" />
    </div>
  );
};

export default GenderIdentity;
