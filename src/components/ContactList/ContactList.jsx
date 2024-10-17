import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const { ContactListContainer } = styles;

  // Мемоізація відфільтрованих контактів
  const filteredContacts = useSelector(selectFilteredContacts);
  return (
    <ul className={ContactListContainer}>
      {filteredContacts.map((contact) => (
        <li key={contact.id}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

