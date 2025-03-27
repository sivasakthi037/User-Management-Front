import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Login from './component/Login';
import Signup from './component/Signup';
import AddContact from './component/AddContact';
import ContactList from './component/ContactList';
import EditContact from './component/EditContact';
import api from '../src/api/contacts';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const addContactHandler = async (contact) => {
    const request = { id: Math.floor(Math.random() * 1000000), ...contact };
    const response = await api.post("/contact/create", request, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put("/contact/update", contact, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const updatedContacts = contacts.map((c) =>
      c.id === contact.id ? { ...c, ...contact } : c
    );
    setContacts(updatedContacts);
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contact/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  };

  const retriveContacts = async () => {
    const response = await api.get("/contact/details", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  };

  useEffect(() => {
    if (!token) return;
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, [token]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="container">
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add" element={<AddContact addContactHandler={addContactHandler} />} />
          <Route path="/edit/:id" element={<EditContact updateContactHandler={updateContactHandler} contacts={contacts} />} />
          <Route path="/" element={<ContactList contacts={contacts} getContactId={removeContactHandler} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;