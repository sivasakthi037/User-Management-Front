import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/contacts";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await api.post("/auth/generate-token", { username, password });
    const token = response.data;
    setToken(token);
    localStorage.setItem("token", token);
    navigate("/");
  } catch (error) {
    console.error("Login failed:", error);
    alert("Invalid credentials");
  }
};

  return (
    <div className="main">
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
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
        <button className="btn-add">Login</button>
      </form>
    </div>
  );
};

export default Login;