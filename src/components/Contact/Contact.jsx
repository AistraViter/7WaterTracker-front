import { FaUser, FaPhone } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import styles from "./Contact.module.css";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const { contactContainer, iconUser, iconPhone } = styles;

  return (
    <div className={contactContainer}>
      <ul>
        <li>
          <p>
            <FaUser className={iconUser} /> {contact.name}
          </p>
        </li>
        <li>
          <p>
            <FaPhone className={iconPhone} />
            {contact.number}
          </p>
        </li>
      </ul>
      <button onClick={() => dispatch(deleteContact(contact.id))}>
        Delete
      </button>
    </div>
  );
};
export default Contact;
