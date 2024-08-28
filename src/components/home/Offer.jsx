import "./Offer.css";
import { Link } from "react-router-dom";

const Offer = ({ offer }) => {
  const {
    _id,
    owner,
    product_name,
    product_description,
    product_price,
    product_image,
  } = offer;
  return (
    <Link
      to={`/offer/${_id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className="home-card-container">
        <div className="card-user-container">
          <div className="img-user"></div>
          <span>{owner.account.username}</span>
        </div>
        <div>
          <img className="product-img" src={product_image.secure_url} alt="" />
        </div>
        <div className="card-details">
          <p>{product_price} €</p>
          <span>{product_name}</span>
          <span>{product_description}</span>
        </div>
      </div>
    </Link>
  );
};

export default Offer;
