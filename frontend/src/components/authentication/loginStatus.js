import axios from "axios";

const LoginStatus = async () => {
  try {
    const response = await axios.post("http://localhost:5000/user", null, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return {
      loggedIn: true,
      user: response.data,
    };
  } catch (error) {
    return {
      loggedIn: false,
      user: null,
    };
  }
};

export default LoginStatus;
