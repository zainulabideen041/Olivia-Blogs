import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../style.css";

const Login = ({ closeModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Logging in...");

    try {
      const response = await axios.post(
        "https://backend-umber-chi-47.vercel.app/user/login",
        {
          username,
          password,
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);

      closeModal();

      // Update the loading toast to a success message
      toast.update(loadingToast, {
        render: "Login successful! Welcome to your account.",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      Navigate("/dashboard");
    } catch (error) {

      // Update the loading toast to an error message
      toast.update(loadingToast, {
        render:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <h1>AUTHOR LOGIN</h1>
      <form onSubmit={handleLogin}>
        <div className="field">
          <label>Username: </label>
          <input
            type="text"
            placeholder="Enter Your Username Here..."
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
        </div>
        <div className="field">
          <label>Password: </label>
          <input
            type="password"
            placeholder="Enter Your Password Here..."
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
