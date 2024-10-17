import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter} from "../../redux/filters/slice";
import { selectFilter } from "../../redux/filters/selectors";


import styles from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const { searchBox } = styles;
  const id = useId();

  const handleChange = (evt) => {
    dispatch(changeFilter(evt.target.value));
  };

  return (
    <div className={searchBox}>
      <label htmlFor={`searchBoxInput${id}`}>Find contacts by name</label>
      <input
        id={`searchBoxInput${id}`}
        type="text"
        value={filter}
        onChange={handleChange}
      />
    </div>
  );
};
export default SearchBox;
