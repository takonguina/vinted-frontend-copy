import { useState } from "react";
import Cookies from "js-cookie";
import "./SignUp.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleNewsletterChange = (event) => {
    const isCheked = event.target.checked;
    setNewsletter(isCheked);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
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
    <div className="signup-container">
      <div className="signup-content">
        <p className="signup-text">S'inscrie</p>
        <form onSubmit={handleSignUp} action="" className="signup-form">
          <input
            placeholder="Nom d'utilisateur"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
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
          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={handleNewsletterChange}
            />
            <span>S'inscrire à notte newsletter</span>
          </div>
          <p className="major">
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button>S'inscrire</button>
        </form>
        <Link to="/login" className="micro-link">
          Tu as déjà un compte ? Connecte-toi !
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
