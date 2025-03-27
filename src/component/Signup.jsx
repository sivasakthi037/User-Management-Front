import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/contacts";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("All fields are mandatory!");
      return;
    }
    try {
      const response = await api.post("/user/create", {
        id: Math.floor(Math.random() * 1000000),
        name,
        email,
        password
      });
      console.log("User created:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed");
    }
  };

  return (
    <div className="main">
      <h2>Sign Up</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button className="btn-add">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;