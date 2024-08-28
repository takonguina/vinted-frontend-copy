import Offer from "./Offer";
import { useEffect, useState } from "react";
import axios from "axios";
import "./HomeWrapper.css";

const HomeWrapper = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/offer`
        );
        setOffers(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchOffers();
  }, []);
  return (
    <div className="home-wrapper">
      {loading ? (
        "Loading..."
      ) : (
        <div className="home-cards-container">
          {offers.offers.map((offer, index) => {
            return <Offer offer={offer} key={index} />;
          })}
        </div>
      )}
    </div>
  );
};

export default HomeWrapper;
