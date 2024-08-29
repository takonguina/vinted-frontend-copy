import { useParams } from "react-router-dom";
import "./Offer.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/offer/${id}`
        );
        setOffer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="page-offer-container">
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="page-offer-content">
          <div className="main-content">
            <img src={offer.product_image.secure_url} alt="" />
          </div>
          <div className="aside-content">
            <div className="offer-infos">
              <p className="price">{offer.product_price} €</p>
              <div className="product-details">
                <p className="infos-details">
                  <span className="type">Marque</span>
                  <span className="info">
                    {offer.product_details[0]["MARQUE"]}
                  </span>
                </p>
                <p className="infos-details">
                  <span className="type">TAILLE</span>
                  <span className="info">
                    {offer.product_details[1]["TAILLE"]}
                  </span>
                </p>
                <p className="infos-details">
                  <span className="type">ÉTAT</span>
                  <span className="info">
                    {offer.product_details[2]["ÉTAT"]}
                  </span>
                </p>
                <p className="infos-details">
                  <span className="type">COULEUR</span>
                  <span className="info">
                    {offer.product_details[3]["COULEUR"]}
                  </span>
                </p>
                <p className="infos-details">
                  <span className="type">EMPLACEMENT</span>
                  <span className="info">
                    {offer.product_details[4]["EMPLACEMENT"]}
                  </span>
                </p>
              </div>
              <div className="offer-line"></div>
              <div className="offer-content">
                <p className="product-name">{offer.product_name}</p>
                <p className="product-description">
                  {offer.product_description}
                </p>
                <div className="user-infos">
                  <div className="avatar"></div>
                  <p>{offer.owner.account.username}</p>
                </div>
                <button className="buy" onClick={() => alert("Stripe soon!")}>
                  Acheter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;
