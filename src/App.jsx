import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import NewOffer from "./pages/NewOffer";
import Payment from "./pages/Payment";
import Profil from "./pages/Profil";
import { useState } from "react";
import Cookies from "js-cookie";
import "./App.css";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [titleSearch, setTitleSearch] = useState("");
  const [rangeValues, setRangeValues] = useState([0, 10000]);
  const [sort, setSort] = useState(false);

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 30 });
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  return (
    <Router>
      <Header
        token={token}
        setUser={setUser}
        titleSearch={titleSearch}
        setTitleSearch={setTitleSearch}
        setRangeValues={setRangeValues}
        sort={sort}
        setSort={setSort}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              titleSearch={titleSearch}
              rangeValues={rangeValues}
              sort={sort}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/newOffer" element={<NewOffer token={token} />} />
        <Route path="/payment" element={<Payment token={token} />} />
        <Route path="/profil" element={<Profil token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
