import { useEffect, useState } from "react";
import "./Profil.css";
import axios from "axios";

const Profil = ({ token }) => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const handleProfil = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/profil/sales`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setSales(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    handleProfil();
  }, [token]);
  return (
    <div className="profil-container">
      <div className="profil-content">
        <div className="sales-container">
          <h4>Mes ventes</h4>
          <div className="sales-infos-container">
            {sales.length < 1
              ? "Aucune Vente"
              : sales.map((sale, index) => {
                  return (
                    <div className="sale-container" key={index}>
                      <span style={{ fontStyle: "italic" }}>
                        {sale.product_name}
                      </span>
                      <span
                        style={{ fontWeight: "bold" }}
                      >{`${sale.product_price} €`}</span>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
