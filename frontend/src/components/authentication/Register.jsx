import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style.css";

const Register = ({ closeModal }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Registering Your Account...");

    try {
      const response = await axios.post(
        "https://backend-umber-chi-47.vercel.app/user/register",
        {
          username,
          password,
          email,
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      closeModal();

      // Update the loading toast to a success message
      toast.update(loadingToast, {
        render: "Registration successful! Welcome to your account.",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      // Update the loading toast to an error message
      toast.update(loadingToast, {
        render:
          error.response?.data?.message ||
          "An error occurred during registration. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <h1>AUTHOR REGISTRATION</h1>
      <form onSubmit={handleSubmit}>
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
          <label>Email: </label>
          <input
            type="email"
            placeholder="Enter Your Email Here..."
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
