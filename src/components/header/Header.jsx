import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
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
          <button className="header-button user-button">S'inscrire</button>
          <button className="header-button user-button">Se connecter</button>
          <button className="header-button sell-button">
            Vends tes articles
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
