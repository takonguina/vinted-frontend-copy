import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          email: email,
          password: password,
        }
      );
      if (response.status === 200) {
        Cookies.set("token", response.data.token, { expires: 30 });
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <p className="login-text">Se connecter</p>
        <form onSubmit={handleLogin} action="" className="login-form">
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            placeholder="Mot de passe"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />

          <button>Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
