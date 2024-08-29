import { useEffect, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);

  const handleDisconnect = () => {
    Cookies.remove("token");
    setIsConnected(false);
    navigate("/");
  };

  const handleNewOffer = () => {
    if (isConnected) {
      navigate("/newOffer");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (Cookies.get("token")) {
      setIsConnected(true);
    }
  });

  return (
    <header>
      <div className="header-content">
        <div className="header-search">
          <Link to="/">
            <img src="/logo.png" alt="vinted-logo" />
          </Link>
          <input type="text" placeholder="Recherche des articles" />
        </div>
        <div className="header-buttons">
          {!isConnected ? (
            <div className="disconnected-buttons">
              <button
                className="header-button user-button"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                S'inscrire
              </button>
              <button
                className="header-button user-button"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Se connecter
              </button>
            </div>
          ) : (
            <button
              className="header-button connected"
              onClick={handleDisconnect}
            >
              Se déconnecter
            </button>
          )}

          <button
            onClick={handleNewOffer}
            className="header-button sell-button"
          >
            Vends tes articles
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
