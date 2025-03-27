import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditContact = ({ updateContactHandler, contacts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({ id: "", name: "", email: "" });

  useEffect(() => {
    const existingContact = contacts.find((c) => c.id === parseInt(id));
    if (existingContact) {
      setContact(existingContact);
    }
  }, [id, contacts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contact.name === "" || contact.email === "") {
      alert("All fields are mandatory!");
      return;
    }
    updateContactHandler(contact);
    navigate("/");
  };

  return (
    <div className="main">
      <h2>Edit Contact</h2>
      <Link to="/">
        <button className="btn-back">Back to ContactList</button>
      </Link>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
        </div>
        <button className="btn-add">Update</button>
      </form>
    </div>
  );
};

export default EditContact;