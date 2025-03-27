import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  const deleteContactHandler = async (id) => {
    try {
      await props.getContactId(id);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHander={deleteContactHandler}
        key={contact.id}
      />
    );
  });

  return (
    <div className="main">
      <h2>
        ContactList
        <Link to="/add">
          <button className="btn-add">Add Contact</button>
        </Link>
      </h2>
      <div className="list">{renderContactList}</div>
    </div>
  );
};

export default ContactList;