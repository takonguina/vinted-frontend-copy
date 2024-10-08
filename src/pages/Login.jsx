import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = ({ setUser }) => {
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
        setUser(response.data.token);
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
        <Link to="/signup" className="micro-link">
          Pas encore de compte ? Inscris toi
        </Link>
      </div>
    </div>
  );
};

export default Login;
