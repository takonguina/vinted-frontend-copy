import "./Header.css";
import { IoIosArrowUp } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";
import { getTrackBackground, Range } from "react-range";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const MIN = 0;
const MAX = 500;
const Header = ({
  token,
  setUser,
  setTitleSearch,
  setRangeValues,
  sort,
  setSort,
}) => {
  const [rangeValuesFinal, setRangeValuesFinal] = useState([0, 500]);

  const navigate = useNavigate();

  const handleNewOffer = () => {
    if (token) {
      navigate("/newOffer");
    } else {
      navigate("/login");
    }
  };

  const handleSetTitleSearch = (event) => {
    const value = event.target.value;
    setTitleSearch(value);
  };

  return (
    <header>
      <div className="header-content">
        <div className="header-search">
          <Link to="/">
            <img src="/logo.png" alt="vinted-logo" />
          </Link>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              className="search-item"
              type="text"
              placeholder="Recherche des articles"
              onChange={handleSetTitleSearch}
            />

            <div className="filters">
              <div
                className="sort"
                onClick={() => {
                  setSort(!sort);
                }}
              >
                <span className="sort-price">
                  <IoIosArrowUp className={`arrow ${sort ? "up" : "down"}`} />
                  {sort ? "Prix croissants" : "Prix décroissants"}
                </span>
              </div>
              <div className="range">
                <Range
                  label="Select your value"
                  step={5}
                  min={MIN}
                  max={MAX}
                  values={rangeValuesFinal}
                  onChange={(values) => setRangeValuesFinal(values)}
                  onFinalChange={(values) => {
                    setRangeValues(values);
                  }}
                  renderTrack={({ props, children }) => (
                    <div
                      style={{
                        ...props.style,
                        height: "6px",
                        width: "100%",
                        backgroundColor: "#ccc",
                      }}
                    >
                      <div
                        ref={props.ref}
                        style={{
                          height: "5px",
                          width: "100%",
                          borderRadius: "4px",
                          background: getTrackBackground({
                            values: rangeValuesFinal,
                            colors: ["#ccc", " #2cb1ba", "#ccc"],
                            min: MIN,
                            max: MAX,
                          }),
                          alignSelf: "center",
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  )}
                  renderThumb={({ props, index }) => (
                    <div
                      {...props}
                      key={props.key}
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        cursor: "grab",
                        userSelect: "none",
                        touchAction: "none",
                        height: "15px",
                        width: "15px",
                        borderRadius: "50%",
                        backgroundColor: "#2BAEB7",
                        outline: "none",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid white",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-28px",
                          color: "#fff",
                          fontSize: "12px",
                          padding: "4px",
                          borderRadius: "4px",
                          backgroundColor: "#2cb1ba",
                        }}
                      >
                        {rangeValuesFinal[index]}€
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="header-buttons">
          {!token ? (
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
              onClick={() => {
                setUser(null);
              }}
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
