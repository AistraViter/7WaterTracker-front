import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import css from "./NotFoundPage.module.css";


function NotFoundPage() {
  return (
    <div className={css.notFoundPage}>
      <Link to="/" className={css.goBack}>
        <FaArrowLeftLong /> Go to home page
      </Link>
      <h2>Sorry, this page is not found</h2>
    </div>
  );
}

export default NotFoundPage;
