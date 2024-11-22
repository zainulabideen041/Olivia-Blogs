import React, { useState } from "react";
import axios from "axios";
import "../style.css";

const Register = ({ closeModal }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://backend-umber-chi-47.vercel.app/user/create", {
        username,
        password,
        email,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      closeModal();
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <h1>AUTHOR REGISTRATION</h1>
      <form>
        <div className="field">
          <label>Username: </label>
          <input
            type="text"
            placeholder="Enter Your Username Here..."
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Email: </label>
          <input
            type="email"
            placeholder="Enter Your Email Here..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Password: </label>
          <input
            type="text"
            placeholder="Enter Your Password Here..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>Register</button>
      </form>
    </div>
  );
};

export default Register;
