import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "../style.css";

const Login = ({ closeModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const Navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      closeModal();
      Swal.fire({
        title: "Logged In!",
        text: "Welcome to your account.",
        icon: "success",
        confirmButtonText: "OK",
      });
      Navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="login-page">
      <h1>AUTHOR LOGIN</h1>
      <form onSubmit={handleLogin}>
        <div className="field">
          <label>Username: </label>
          <input
            type="text"
            placeholder="Enter Your Username Here..."
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="field">
          <label>Password: </label>
          <input
            type="password"
            placeholder="Enter Your Password Here..."
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {/* Render error message if it exists */}
      {errorMessage && (
        <p
          className="error-message"
          style={{ color: "red", fontSize: "15px", marginTop: "10px" }}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Login;
